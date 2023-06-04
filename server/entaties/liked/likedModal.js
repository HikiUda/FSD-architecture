const { OneDeviceDto } = require('../device/deviceModal');

class LikedDeviceDto {
   id;
   device;

   constructor(data) {
      this.id = data.id;
      this.device = this.clearDevice(data.device);
   }

   clearDevice(device) {
      const deviceDto = new OneDeviceDto(device);
      return { ...deviceDto };
   }
}

module.exports = LikedDeviceDto;
