const request = require('supertest');
require("dotenv").config(); // Pour charger les variables d'environnement depuis un fichier .env
const MAIL = process.env.MAIL_ADMIN; 
const MDP = process.env.MDP_ADMIN; 

describe('Hub', () => {

  let hubId;
  let token;


  test("Login pour la suite", async () => { 
    const response = await request("http://141.94.244.226:80") 
      .post("/api/auth/login")
      .send({email : MAIL, password: MDP})
      UserId= response.body._id
      token= response.body.accessToken
  });

      test("get All Hubs", async () => { 
        const response = await request("http://141.94.244.226:80") 
          .get("/api/hub/");
          expect(response.statusCode).toBe(200); // Définit le code de retour attendu
          expect(response.body.length).toBeGreaterThan(0);
      });

      test("Add hub", async () => { 
        const hub = {
          name: "Nice Jean Medecin",
          adress: "1 avenue Jean Medecin",
            ville: "Nice",
            code:"06000"
        }

        
        const response = await request("http://141.94.244.226:80") 
          .post("/api/hub")
          .send(hub)
          .set('token', `Bearer ${token}`);
          expect(response.statusCode).toBe(201); // Définit le code de retour attendu
          hubId = response.body._id;
          expect(response.body.code).toBe("06000");

      });


      test("putHub", async () => { 
        const hub = {
          name : "Jean"
        }
        const response = await request("http://141.94.244.226:80") 
          .put(`/api/hub/${hubId}`)
          .send(hub)
          .set('token', `Bearer ${token}`);
        expect(response.statusCode).toBe(200); 
        expect(response.body.name).toBe("Jean");
      });

      test("deleteHub", async () => { 
        const response = await request("http://141.94.244.226:80") 
          .delete(`/api/hub/${hubId}`)
          .set('token', `Bearer ${token}`);
          console.log(hubId)
        expect(response.statusCode).toBe(200); 
      });

  });