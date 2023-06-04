const sequelize = require('./../db');
const { DataTypes } = require('sequelize');

const Device = sequelize.define('device', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
   description: { type: DataTypes.TEXT, allowNull: false },
   rating: { type: DataTypes.REAL, defaultValue: 0 },
   img: { type: DataTypes.STRING, allowNull: false },
   price: { type: DataTypes.INTEGER, allowNull: false },
   countOfPurches: { type: DataTypes.INTEGER, defaultValue: 0 },
   quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
   onSale: { type: DataTypes.BOOLEAN, defaultValue: true },
});

const DeviceInfo = sequelize.define('device_info', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   title: { type: DataTypes.STRING, allowNull: false },
});
const DeviceInfoDescription = sequelize.define('device_info_description', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   description: { type: DataTypes.STRING, allowNull: false },
   selected: { type: DataTypes.BOOLEAN, defaultValue: false },
});
const DeviceComments = sequelize.define('device_comments', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   content: { type: DataTypes.TEXT, allowNull: false },
});
const Rating = sequelize.define('rating', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   rate: { type: DataTypes.INTEGER, allowNull: false },
});

const PurchesDevice = sequelize.define('purches_device', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   deviceInfo: { type: DataTypes.TEXT, allowNull: false },
});
// const PurchesDeviceInfo = sequelize.define('purches_device_info', {
//    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//    title: { type: DataTypes.STRING, allowNull: false },
//    description: { type: DataTypes.STRING, allowNull: false },
// });
const Type = sequelize.define('type', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, allowNull: false, unique: true },
});
const Brand = sequelize.define('brand', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, allowNull: false, unique: true },
});
const TypeBrand = sequelize.define('type_brand', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Device.hasMany(DeviceInfo, { as: 'info' });
DeviceInfo.belongsTo(Device);

DeviceInfo.hasMany(DeviceInfoDescription, { as: 'description' });
DeviceInfoDescription.belongsTo(DeviceInfo);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(DeviceComments);
DeviceComments.belongsTo(Device);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(PurchesDevice);
PurchesDevice.belongsTo(Device);

// PurchesDevice.hasMany(PurchesDeviceInfo);
// PurchesDeviceInfo.belongsTo(PurchesDevice);

module.exports = {
   Device,
   DeviceComments,
   DeviceInfo,
   DeviceInfoDescription,
   Type,
   Brand,
   Rating,
   PurchesDevice,
   TypeBrand,
};
