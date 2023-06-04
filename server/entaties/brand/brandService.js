const AuthError = require('../../exceptions/AuthError');
const BrandDto = require('./brandModal');
const brandRepository = require('./brandRepository');

class brandService {
   async create(name, userId) {
      try {
         const data = await brandRepository.create(name, userId);
         return data;
      } catch (e) {
         throw e;
      }
   }
   async update(name, brandId, userId) {
      try {
         const haveRights = await brandRepository.getOne(brandId);
         if (userId !== haveRights.userId) {
            throw AuthError.noRights();
         }
         const data = await brandRepository.update(name, brandId);
         return data;
      } catch (e) {
         throw e;
      }
   }
   async getOne(brandId) {
      try {
         const brand = await brandRepository.getOne(brandId);

         const brandDto = new BrandDto(brand);

         return { ...brandDto };
      } catch (e) {
         throw e;
      }
   }
   async getSome(search) {
      try {
         search = search ? `%${search}%` : '%';
         const brands = await brandRepository.getSome(search);

         const brandsDto = brands.map((brand) => {
            const brandDto = new BrandDto(brand);
            return { ...brandDto };
         });

         return brandsDto;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new brandService();
