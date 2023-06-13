require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const sequelize = require('./db');
const path = require('path');
const models = require('./models');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const chatController = require('./entaties/chat/chatController');

const PORT = process.env.PORT || 5000;

const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();

app.use(express.json());

app.use(
   cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
   }),
);

app.use(cookieParser());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

app.ws('/chat', (ws, req) => {
   chatController.handleWSRequest(ws, req, aWss);
});

app.use(errorHandlerMiddleware);

const start = async () => {
   try {
      await sequelize.authenticate();
      await sequelize.sync();

      app.listen(PORT, () => {
         console.log(`Server started on PORT ${PORT}`);
      });
   } catch (e) {
      console.log(e);
   }
};

start();
