export const handleSaveError = (error, data, next) => {
  //  error.status = 400;
  const { code, name } = error;
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next();
};

export const setUpdateSettings = function (next) {
  this.getOptions.runValidators = true;
  this.getOptions.new = true;
  next();
};
