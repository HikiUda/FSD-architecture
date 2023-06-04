const userModel = require('./userModel');
const deviceModel = require('./deviceModel');
const basketModel = require('./basketModel');

userModel.User.hasMany(deviceModel.DeviceComments);
deviceModel.DeviceComments.belongsTo(userModel.User);

userModel.User.hasMany(deviceModel.Rating);
deviceModel.Rating.belongsTo(userModel.User);

userModel.User.hasMany(deviceModel.PurchesDevice);
deviceModel.PurchesDevice.belongsTo(userModel.User);

userModel.User.hasMany(deviceModel.Device);
deviceModel.Device.belongsTo(userModel.User);

userModel.User.hasOne(basketModel.Basket);
basketModel.Basket.belongsTo(userModel.User);

userModel.User.hasOne(basketModel.Liked);
basketModel.Liked.belongsTo(userModel.User);

deviceModel.Device.hasMany(basketModel.LikedDevice);
basketModel.LikedDevice.belongsTo(deviceModel.Device);

deviceModel.Device.hasMany(basketModel.BasketDevice);
basketModel.BasketDevice.belongsTo(deviceModel.Device);

userModel.User.hasMany(deviceModel.Type);
deviceModel.Type.belongsTo(userModel.User);

userModel.User.hasMany(deviceModel.Brand);
deviceModel.Brand.belongsTo(userModel.User);

module.exports = {
   ...userModel,
   ...deviceModel,
   ...basketModel,
};
