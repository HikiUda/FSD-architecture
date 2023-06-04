class PurchesDto {
   purchesId;
   deviceInfo;
   deviceId;
   userId;

   constructor(data) {
      this.purchesId = data.id;
      this.deviceId = data.deviceId;
      this.userId = data.userId;
      this.deviceInfo = JSON.parse(data.deviceInfo);
   }
}

module.exports = { PurchesDto };
