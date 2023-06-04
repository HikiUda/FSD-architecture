const { oneDevice } = require('./helpers/template');
const { default: axios } = require('axios');
const { test, describe, expect } = require('@jest/globals');
describe('Test', () => {
   describe('DeviceController testing...', () => {
      test('Get device', async () => {
         const { data } = await axios.get('http://localhost:5000/api/device/2');
         expect(data).toEqual(oneDevice);
      });
   });
});
