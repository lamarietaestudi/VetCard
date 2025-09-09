const addDate = (date) => {
  if (!date) return new Date();
  return new Date(date);
};

module.exports = addDate;
