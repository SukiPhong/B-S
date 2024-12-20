const { Op } = require("sequelize");

const handleRangeFilter = (value) => {
  if (!value) return undefined;
  const isBetweenFilter = value.every((el) => !isNaN(el));
  if (isBetweenFilter) return { [Op.between]: value };

  const number = value.find((el) => !isNaN(el));
  const operator = value.find((el) => isNaN(el)); // gte hoặc lte
  return { [Op[operator]]: number };
};

module.exports = { handleRangeFilter };