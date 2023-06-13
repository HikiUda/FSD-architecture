const uuid = require('uuid');
const path = require('path');

const saveImage = async (img) => {
   try {
      const imgId = uuid.v4() + '.png';
      await img.mv(path.resolve(__dirname, '../..', 'static', imgId));
      return imgId;
   } catch (e) {
      throw e;
   }
};

module.exports = { saveImage };
