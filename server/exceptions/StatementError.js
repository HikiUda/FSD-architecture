module.exports = class StatementError extends Error {
   status;
   errors;

   constructor(status, message, errors = []) {
      super(message);
      this.status = status;
      this.errors = errors;
   }
   static IncorrectError() {
      return new StatementError(400, 'Заявление заполненно неправильно!');
   }
};
