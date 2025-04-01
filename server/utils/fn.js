const { Op } = require("sequelize");

const handleRangeFilter = (value) => {
  if (!value) return undefined;
  const isBetweenFilter = value?.every((el) => !isNaN(el));
  if (isBetweenFilter) return { [Op.between]: value };

  const number = value?.find((el) => !isNaN(el));
  const operator = value?.find((el) => isNaN(el)); // gte hoặc lte
  return { [Op[operator]]: number };
};
const getDailyPostLimit=(pricingTier) =>{
  switch (pricingTier.toLowerCase()) {
    case 'thường': return 1;
    case 'đồng': return 5;
    case 'bạc': return 5;
    case 'vàng': return 7
    case 'kim cương': return 8;
    default: return 1;
  }
}

module.exports = { handleRangeFilter,getDailyPostLimit };