const StatementError = require('../../exceptions/StatementError');
const { StatementsStates } = require('../../helpers/statementsConst');
const statementsService = require('./statementsService');

class StatementsController {
   async createRoleStatement(req, res, next) {
      try {
         const { id: userId } = req.user;
         const { description = '', appNumber } = req.body;
         if (appNumber != 1 && appNumber != 2) {
            throw StatementError.IncorrectError();
         }
         const data = await statementsService.createRoleStatement(userId, appNumber, description);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async createDeviceStatement(req, res, next) {
      try {
         const { id: userId } = req.user;
         const { deviceInfo, description = '', appNumber } = req.body;
         const { img } = req.files;
         if (appNumber != 3) {
            throw StatementError.IncorrectError();
         }

         const data = await statementsService.createDeviceStatement(
            userId,
            description,
            appNumber,
            deviceInfo,
            img,
         );
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async createBrandOrTypeStatement(req, res, next) {
      try {
         const { id: userId } = req.user;
         const { name, description = '', appNumber } = req.body;

         if (appNumber != 4 && appNumber != 5) {
            throw StatementError.IncorrectError();
         }

         const data = await statementsService.createBrandOrTypeStatement(
            userId,
            description,
            appNumber,
            name,
         );
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async addAdminComment(req, res, next) {
      try {
         const { content = '' } = req.body;
         const { id } = req.params;
         const data = await statementsService.addAdminComment(content, id);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async changeState(req, res, next) {
      try {
         const { state } = req.body;
         if (!StatementsStates[state]) {
            throw StatementError.IncorrectError();
         }
         const { id } = req.params;
         const data = await statementsService.changeState(state, id);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getOne(req, res, next) {
      try {
         const { id } = req.params;
         const data = await statementsService.getOne(id);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getSome(req, res, next) {
      try {
         const {
            limit = 10,
            page = 1,
            date = 0,
            state = null,
            appNumber = null,
            userId = null,
         } = req.query;
         const data = await statementsService.getSome(limit, page, {
            date,
            state,
            appNumber,
            userId,
         });
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new StatementsController();
