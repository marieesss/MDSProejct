const request = require('supertest');
require("dotenv").config(); // Pour charger les variables d'environnement depuis un fichier .env
const MAIL = process.env.MAIL_ADMIN; 
const MDP = process.env.MDP_ADMIN; 

describe('Order', () => {

  let OrderId;
  let UserId;
  let token;

    test("Login pour la suite", async () => { 
        const response = await request("http://141.94.244.226:5000") 
          .post("/api/auth/login")
          .send({email : MAIL, password: MDP})
          UserId= response.body._id
          token= response.body.accessToken
      });


    test("get All Orders", async () => { 
        const response = await request("http://141.94.244.226:5000") 
          .get("/api/order/")
          .set('token', `Bearer ${token}`)
          
          expect(response.statusCode).toBe(200); // Définit le code de retour attendu
      });


      test("Add Order", async () => { 
        const order = {
            userId:"333",
        products:
            [{
            productId:"63de3ffa4d6c019732cdd206",
            quantity:1},
               {
            productId:"63f88ebc1ee207f1bc68fa91",
            quantity:1} 
            ],
            amount:6,
            mail: "bruno@bruno.com",
            hubId: "1234506543",
            Status:"En attente de paiement"}
        

        
        const response = await request("http://141.94.244.226:5000") 
          .post("/api/order")
          .send(order)
          .set('token', `Bearer ${token}`)
          .set('userId', `Bearer ${UserId}`);
          expect(response.statusCode).toBe(200); // Définit le code de retour attendu
          expect(response.body.userId).toBe(UserId);
          OrderId = response.body._id;

      });

      test("getOneOrder", async () => { 
        const response = await request("http://141.94.244.226:5000") 
          .get(`/api/order/find/${OrderId}`)
          .set('token', `Bearer ${token}`)
          .set('userId', `Bearer ${UserId}`);
        expect(response.statusCode).toBe(200); 
      });

      test("getLastOrderOfUser", async () => { 
        const response = await request("http://141.94.244.226:5000") 
          .get(`/api/order/find/last/${UserId}`)
          .set('token', `Bearer ${token}`)
          .set('userId', `Bearer ${UserId}`);

        expect(response.statusCode).toBe(200); 
      });


      test("putOrder", async () => { 
        const order = {
          status : "payé"
        }
        const response = await request("http://141.94.244.226:5000") 
          .put(`/api/order/${OrderId}/${UserId}`)
          .send(order)
          .set('token', `Bearer ${token}`)
          .set('userId', `Bearer ${UserId}`);
        expect(response.statusCode).toBe(200); 
        expect(response.body.status).toBe("payé");
        OrderId = response.body._id;
      });

      

      test("deleteOrder", async () => { 
        const response = await request("http://141.94.244.226:5000") 
          .delete(`/api/order/${OrderId}`)
          .set('token', `Bearer ${token}`);
        expect(response.statusCode).toBe(200); 
      });

  });