const oneDevice = {
   //id: 2,
   name: 'Fifso',
   description: 'This is awesome device!',
   //rating: 4,
   //img: 'qwerty.png',
   price: 123456,
   //countOfPurches: 0,
   quantity: 8,
   onSale: true,
   //userId: 15,
   typeId: 2,
   brandId: 1,
   info: [
      {
         title: 'color',
         id: 1,
         description: [
            {
               description: 'Red',
               selected: false,
               id: 1,
            },
            {
               description: 'Blue',
               selected: false,
               id: 2,
            },
         ],
      },
      {
         title: 'camera',
         id: 13,
         description: [
            {
               description: '20',
               selected: false,
               id: 25,
            },
            {
               description: '50',
               selected: false,
               id: 27,
            },
            {
               description: '30',
               selected: false,
               id: 32,
            },
            {
               description: '40',
               selected: false,
               id: 33,
            },
         ],
      },
   ],
};

module.exports = { oneDevice };
