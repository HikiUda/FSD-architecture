class OneDeviceDto {
   id;
   name;
   description;
   rating;
   img;
   price;
   countOfPurches;
   quantity;
   onSale;
   userId;
   typeId;
   brandId;
   typeName;
   brandName;
   info;

   constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.rating = data.rating;
      this.img = data.img;
      this.price = data.price;
      this.countOfPurches = data.countOfPurches;
      this.quantity = data.quantity;
      this.onSale = data.onSale;
      this.userId = data.userId;
      this.typeId = data.typeId;
      this.brandId = data.brandId;
      this.typeName = data.type.name;
      this.brandName = data.brand.name;
      this.info = this.handleInfo(data.info);
   }

   handleInfo(info) {
      if (!info) {
         return null;
      }
      const clearInfo = info.map((item) => {
         const description = item.description.map((desc) => {
            return { description: desc.description, selected: desc.selected, id: desc.id };
         });
         return { title: item.title, id: item.id, description };
      });
      return clearInfo;
   }
}

module.exports = { OneDeviceDto };
