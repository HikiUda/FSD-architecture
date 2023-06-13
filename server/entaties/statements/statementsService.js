const { AppNumbers } = require('../../helpers/statementsConst');
const statementsRepository = require('./statementsRepository');

const { OneStatementDto, OneShortStatementDto } = require('./statementsModal');
const { Op } = require('sequelize');
const { saveImage } = require('../../helpers/function/saveImage');

class StatementsService {
   async createRoleStatement(userId, appNumber, description) {
      try {
         const params = { userId, description, appNumber, title: AppNumbers[appNumber].title };
         const data = await statementsRepository.createStatement(params);
         return data;
      } catch (e) {
         throw e;
      }
   }
   async createDeviceStatement(userId, description, appNumber, deviceInfo, img) {
      try {
         const imgId = await saveImage(img);
         deviceInfo = JSON.parse(deviceInfo);
         deviceInfo = { ...deviceInfo, userId, img: imgId };

         const deviceInfoJSON = JSON.stringify(deviceInfo);

         const params = {
            userId,
            description,
            appNumber,
            title: AppNumbers[appNumber].title,
            info: deviceInfoJSON,
         };
         const data = await statementsRepository.createStatement(params);
         return data;
      } catch (e) {
         throw e;
      }
   }
   async createBrandOrTypeStatement(userId, description, appNumber, name) {
      try {
         const info = JSON.stringify({ name, userId });

         const params = {
            userId,
            description,
            appNumber,
            title: AppNumbers[appNumber].title,
            info,
         };
         const data = await statementsRepository.createStatement(params);
         return data;
      } catch (e) {
         throw e;
      }
   }
   async addAdminComment(adminComment, id) {
      try {
         const data = await statementsRepository.addAdminComment(adminComment, id);
         return data;
      } catch (e) {
         throw e;
      }
   }
   async changeState(state, id) {
      try {
         const data = await statementsRepository.changeState(state, id);
         return data;
      } catch (e) {
         throw e;
      }
   }
   async getOne(id) {
      try {
         const statement = await statementsRepository.getOne(id);
         const statementDto = new OneStatementDto(statement);

         return { ...statementDto };
      } catch (e) {
         throw e;
      }
   }
   async getSome(limit, page, queryParams) {
      try {
         const { date, state, appNumber, userId } = queryParams;

         const offset = limit * page - limit;

         const params = {};

         // if (date) {
         //    params.createdAt = { [Op.eq]: new Date(date) };
         // }
         if (state) {
            params.state = { [Op.like]: state };
         }
         if (appNumber) {
            params.appNumber = { [Op.eq]: appNumber };
         }
         if (userId) {
            params.userId = { [Op.eq]: userId };
         }

         const statements = await statementsRepository.getSome(limit, offset, params);
         const statementsDto = statements.rows.map((statement) => {
            const statementDto = new OneShortStatementDto(statement);
            return { ...statementDto };
         });
         return { count: statements.count, statements: statementsDto };
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new StatementsService();
