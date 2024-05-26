const request = require('supertest');
const app = require('../../app');
describe('Test GET /launches' , () => {
   test('It should respond with 200 success' , async() => {
      const response = await request(app)
      .get('/launches')
      .expect('Content-Type' , /json/)
      .expect(200);
   });
});






describe('Test POST /launches' , () =>{

   const completeLaunchData = {
      mission : 'USS Enter',
      rocket : 'NCC 1701-D',
      target : 'Kepler-186 f',
      launchDate : 'January 4 , 2028',
   };
   const launchDateWithoutDate = {
      mission : 'USS Enter',
      rocket : 'NCC 1701-D',
      target : 'Kepler-186 f',
   };


// our test
 test('It should respond with 201 created' , async() => {
   const response = await request(app)
   .post('/v1/launches')
   .send(completeLaunchData)
   .expect('Content-Type' , /json/)
   .expect(201);



const requestDate = new Date(completeLaunchData.launchDate).valueOf();
const responseDate = new Date (response.body.launchDate).valueOf();
expect(responseDate).toBe(requestDate);
    
   // .toMatchObject is for Jest that is realated to expect document
   expect(response.body).toMatchObject(launchDateWithoutDate);
 });



 test('It should catch missing required properties' , async ()=>{
   const response = await request(app)
   .post('/launches')
   .send(launchDateWithoutDate)
   .expect('Content-Type' , /json/)
   .expect(400);

   expect(response.body).toStrictEqual({
      error : 'Missing required launch property',
   });
 });
}); 