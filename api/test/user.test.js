const request = require('supertest');
require("dotenv").config(); // Pour charger les variables d'environnement depuis un fichier .env
const MAIL = process.env.MAIL_ADMIN; 
const MDP = process.env.MDP_ADMIN; 

describe('Authentification', () => {

  let token;
  let UserId;
  let UserIdToTest;

  test("Add User", async () => { 
    const User = {
    username: "squeezie",
    email: "squeezie@gmail.com",
    password: "123Squeezie!"
    }

    
    const response = await request("https://api.nossproducteurslocaux.fr") 
      .post("/api/auth/register")
      .send(User)
      expect(response.statusCode).toBe(201); 
      UserIdToTest=response.body._id
  });


  test("Login pour la suite", async () => { 
    const response = await request("https://api.nossproducteurslocaux.fr") 
      .post("/api/auth/login")
      .send({email : MAIL, password: MDP})
      expect(response.statusCode).toBe(200);
      UserId= response.body._id
      token= response.body.accessToken
  });

      test("Wrong password", async () => { 
        const response = await request("https://api.nossproducteurslocaux.fr") 
          .post("/api/auth/login")
          .send({email : "bouteille@bouteille.com", password: "bouteill"})
          expect(response.statusCode).toBe(401); // Définit le code de retour attendu
      });

      test("Wrong email", async () => { 
        const response = await request("https://api.nossproducteurslocaux.fr") 
          .post("/api/auth/login")
          .send({email : "bouteille@bouteille.co", password: "bouteill"})
          expect(response.statusCode).toBe(401); // Définit le code de retour attendu
      });

      test("get All Users", async () => { 
        const response = await request("https://api.nossproducteurslocaux.fr") 
          .get("/api/user/")
          .set('token', `Bearer ${token}`)
          
          expect(response.statusCode).toBe(200); // Définit le code de retour attendu
      });

      test("putUser", async () => { 
        const User = {
          username : "Fabrice"
        }
        const response = await request("https://api.nossproducteurslocaux.fr") 
          .put(`/api/user/${UserIdToTest}`)
          .send(User)
          .set('token', `Bearer ${token}`);
        expect(response.statusCode).toBe(200); 
        expect(response.body.username).toBe("Fabrice");
      });

      test("get One User", async () => { 
        const response = await request("https://api.nossproducteurslocaux.fr") 
          .get(`/api/user/find/${UserIdToTest}`)
          .set('token', `Bearer ${token}`);
        expect(response.statusCode).toBe(200); 
      });

      test("deleteUser", async () => { 
        const response = await request("https://api.nossproducteurslocaux.fr") 
          .delete(`/api/user/${UserIdToTest}`)
          .set('token', `Bearer ${token}`);
        expect(response.statusCode).toBe(200); 
      });


  

  });