const { StatementsStates } = require('../helpers/statementsConst');
const sequelize = require('./../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   email: { type: DataTypes.STRING, unique: true, allowNull: false },
   password: { type: DataTypes.STRING, allowNull: false },
});

const Role = sequelize.define('role', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
const UserRole = sequelize.define('user_role', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Token = sequelize.define('token', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   refreshToken: { type: DataTypes.STRING },
});
const Statements = sequelize.define('statements', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   title: { type: DataTypes.STRING, allowNull: false },
   description: { type: DataTypes.TEXT },
   info: { type: DataTypes.TEXT },
   state: { type: DataTypes.STRING, defaultValue: StatementsStates.pending },
   adminComment: { type: DataTypes.TEXT, defaultValue: '' },
   appNumber: { type: DataTypes.INTEGER, allowNull: false },
});
const ChatContent = sequelize.define('chat_content', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   text: { type: DataTypes.TEXT, allowNull: false },
   isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
});
const Chat = sequelize.define('chat', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   withAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
   name: { type: DataTypes.STRING, allowNull: false, unique: true },
});
const UserChat = sequelize.define('user_chat', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

User.hasOne(Token);
Token.belongsTo(User);

User.hasMany(Statements);
Statements.belongsTo(User);

User.belongsToMany(Chat, { through: UserChat });
Chat.belongsToMany(User, { through: UserChat });

Chat.hasMany(ChatContent);
ChatContent.belongsTo(Chat);

User.hasMany(ChatContent);
ChatContent.belongsTo(User);

module.exports = {
   User,
   Role,
   UserRole,
   Token,
   Statements,
   Chat,
   ChatContent,
   UserChat,
};
