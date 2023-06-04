const AuthError = require('../exceptions/AuthError');

module.exports = function (roles) {
   return function (req, res, next) {
      const userRoles = req.user.roles;

      let isRight = false;

      roles.forEach((role) => {
         if (userRoles.includes(role)) {
            isRight = true;
         }
      });
      isRight ? next() : next(AuthError.noRights());
      return;
   };
};
