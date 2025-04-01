const redisClient = require("../configs/redis.config");
const { getDailyPostLimit } = require("../utils/fn");
const asyncHandler = require("express-async-handler");
const RESET_HOUR = parseInt(process.env.RATE_LIMIT_RESET_HOUR || "10", 10);
const RESET_MINUTE = parseInt(process.env.RATE_LIMIT_RESET_MINUTE || "00", 10);

const rateLimiter = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Người dùng chưa được xác thực",
    });
  }

  const clientId = req.user.userId;

  const currentTime = new Date();
  const key = `ratelimit-${clientId}`;

  const resetTime = new Date(currentTime);
  resetTime.setHours(RESET_HOUR, RESET_MINUTE, 0, 0);

  if (currentTime > resetTime) {
    resetTime.setDate(resetTime.getDate() + 1);
    // resetTime.setDate(resetTime.getDate());
  }

  let limitInfo = await redisClient.hGetAll(key);
  if (
    Object.keys(limitInfo).length === 0 ||
    new Date(parseInt(limitInfo.lastReset)) < resetTime
  ) {
    limitInfo = {
      count: "0",
      lastReset: resetTime.getTime().toString(),
    };
  }

  const pricingTier = req.user.pricingTier || "thường";
  const dailyLimit = getDailyPostLimit(pricingTier);
  const currentCount = parseInt(limitInfo.count);

  if (currentCount >= dailyLimit) {
    return res.status(429).json({
      success: false,
      message: `Bạn đã đạt giới hạn đăng bài hôm nay (${dailyLimit} bài/ngày). Giới hạn sẽ được reset vào lúc ${RESET_HOUR}:${RESET_MINUTE} sáng ngày mai.`,
      dailyLimit,
      currentCount,
      nextReset: new Date(
        resetTime.getTime() + 24 * 60 * 60 * 1000
      ).toISOString(),
    });
  }

  // Update the HSET command
  const newCount = currentCount + 1;
  await redisClient.hSet(key, "count", newCount.toString());
  await redisClient.hSet(key, "lastReset", limitInfo.lastReset);

  const nextResetTime = new Date(resetTime);
  nextResetTime.setDate(nextResetTime.getDate() + 1);
  const ttl = Math.max(0, resetTime.getTime() - currentTime.getTime()) / 1000;
  await redisClient.expire(key, Math.ceil(ttl));

  req.postLimitInfo = {
    dailyLimit,
    currentCount: newCount,
    remaining: dailyLimit - newCount,
    nextReset: nextResetTime.toISOString(),
  };

  return next();
});

module.exports = rateLimiter;
