const request = require('supertest');
require("dotenv").config(); // Pour charger les variables d'environnement depuis un fichier .env
const MAIL = process.env.MAIL_ADMIN; 
const MDP = process.env.MDP_ADMIN; 

describe('Hub', () => {

  let hubId;
  let token;


  test("Login pour la suite", async () => { 
    const response = await request("https://api.nossproducteurslocaux.fr") 
      .post("/api/auth/login")
      .send({email : MAIL, password: MDP})
      UserId= response.body._id
      token= response.body.accessToken
  });

      test("get All Hubs", async () => { 
        const response = await request("https://api.nossproducteurslocaux.fr") 
          .get("/api/hub/");
          expect(response.statusCode).toBe(200); // Définit le code de retour attendu
          expect(response.body.length).toBeGreaterThan(0);
      });

      test("Add hub", async () => { 
        const hub = {
          name: "St laurent du Var",
          adress: "1176 Rte de Saint-Laurent",
            ville: "La Gaude",
            code:"06610"
        }

        
        const response = await request("https://api.nossproducteurslocaux.fr") 
          .post("/api/hub")
          .send(hub)
          .set('token', `Bearer ${token}`);
          expect(response.status).toBe(201); // Définit le code de retour attendu
          hubId = response.body._id;
          expect(response.body.code).toBe("06610");

      });


      test("putHub", async () => { 
        const hub = {
          name : "St Laurent du Var"
        }
        const response = await request("https://api.nossproducteurslocaux.fr") 
          .put(`/api/hub/${hubId}`)
          .send(hub)
          .set('token', `Bearer ${token}`);
        expect(response.statusCode).toBe(200); 
        expect(response.body.name).toBe("St Laurent du Var");
      });

      test("deleteHub", async () => { 
        const response = await request("https://api.nossproducteurslocaux.fr") 
          .delete(`/api/hub/${hubId}`)
          .set('token', `Bearer ${token}`);
        expect(response.statusCode).toBe(200); 
      });

  });