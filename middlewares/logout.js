const logout = (req, res, next) => {
  res.clearCookie('authorization').status(200).send({ message: 'Куки удаленны' });
  next();
};

module.exports = logout;
