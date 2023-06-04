const AuthError = require('../../exceptions/AuthError');
const TypeDto = require('./typeModal');
const typeRepository = require('./typeRepository');

class TypeService {
   async create(name, userId) {
      try {
         const data = await typeRepository.create(name, userId);
         return data;
      } catch (e) {
         throw e;
      }
   }
   async update(name, typeId, userId) {
      try {
         const haveRights = await typeRepository.getOne(typeId);
         if (userId !== haveRights.userId) {
            throw AuthError.noRights();
         }
         const data = await typeRepository.update(name, typeId);
         return data;
      } catch (e) {
         throw e;
      }
   }
   async getOne(typeId) {
      try {
         const type = await typeRepository.getOne(typeId);

         const typeDto = new TypeDto(type);

         return { ...typeDto };
      } catch (e) {
         throw e;
      }
   }
   async getSome(search) {
      try {
         search = search ? `%${search}%` : '%';
         const types = await typeRepository.getSome(search);

         const typesDto = types.map((type) => {
            const typeDto = new TypeDto(type);
            return { ...typeDto };
         });

         return typesDto;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new TypeService();
