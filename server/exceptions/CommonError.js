module.exports = class CommonError extends Error {
   status;
   errors;

   constructor(status, message, errors = []) {
      super(message);
      this.status = status;
      this.errors = errors;
   }

   static BadRequest(message, errors = []) {
      return new CommonError(400, message, errors);
   }
};
