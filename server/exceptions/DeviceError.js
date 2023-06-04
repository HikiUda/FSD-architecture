module.exports = class DeviceError extends Error {
   status;
   errors;

   constructor(status, message, errors = []) {
      super(message);
      this.status = status;
      this.errors = errors;
   }
   static IncorectData(errors = []) {
      return new DeviceError(400, 'Некоректные данные', errors);
   }

   static BadRequest(message, errors = []) {
      return new DeviceError(400, message, errors);
   }
};
