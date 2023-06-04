const AuthError = require('../exceptions/AuthError');
const CommonError = require('../exceptions/CommonError');
const DeviceError = require('../exceptions/DeviceError');
const StatementError = require('../exceptions/StatementError');

module.exports = function (err, req, res, next) {
   console.log(err);
   if (err instanceof AuthError) {
      return res.status(err.status).json({ message: err.message, errors: err.errors });
   }
   if (err instanceof DeviceError) {
      return res.status(err.status).json({ message: err.message, errors: err.errors });
   }
   if (err instanceof StatementError) {
      return res.status(err.status).json({ message: err.message, errors: err.errors });
   }
   if (err instanceof CommonError) {
      return res.status(err.status).json({ message: err.message, errors: err.errors });
   }
   return res.status(500).json({ message: 'Непредвиденная ошибка' });
};
