const sequelize = require('./../db');
const { DataTypes } = require('sequelize');

const Basket = sequelize.define('basket', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const Liked = sequelize.define('liked', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const BasketDevice = sequelize.define('basket_device', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   deviceInfo: { type: DataTypes.TEXT, allowNull: false },
});
const LikedDevice = sequelize.define('liked_device', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
// const BasketDeviceInfo = sequelize.define('basket_device_info', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    title: { type: DataTypes.STRING, allowNull: false },
// });
// const BasketDeviceInfoDescription = sequelize.define('basket_device_info_description', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    description: { type: DataTypes.STRING, allowNull: false },
//    selected: { type: DataTypes.BOOLEAN, defaultValue: false },
// });

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Liked.hasMany(LikedDevice);
LikedDevice.belongsTo(Liked);

// BasketDevice.hasMany(BasketDeviceInfo);
// BasketDeviceInfo.belongsTo(BasketDevice);

// BasketDeviceInfo.hasMany(BasketDeviceInfoDescription);
// BasketDeviceInfoDescription.belongsTo(BasketDeviceInfo);

module.exports = {
   Basket,
   Liked,
   BasketDevice,

   LikedDevice,
};
