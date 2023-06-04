class BrandDto {
   id;
   name;
   userId;

   constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.userId = data.userId;
   }
}

module.exports = BrandDto;
