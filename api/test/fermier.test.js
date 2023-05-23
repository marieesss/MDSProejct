const request = require('supertest');
require("dotenv").config(); // Pour charger les variables d'environnement depuis un fichier .env
const MAIL = process.env.MAIL_ADMIN; 
const MDP = process.env.MDP_ADMIN; 

describe('Fermier', () => {

  let fermierId;
  let token;


  test("Login pour la suite", async () => { 
    const response = await request("http://141.94.244.226:80") 
      .post("/api/auth/login")
      .send({email : MAIL, password: MDP})
      UserId= response.body._id
      token= response.body.accessToken
  });


      test("get All fermier", async () => { 
        const response = await request("http://141.94.244.226:80") 
          .get("/api/fermier/");
          expect(response.statusCode).toBe(200); // Définit le code de retour attendu
          expect(response.body.length).toBeGreaterThan(0);
      });

      test("Add fermier", async () => { 
        const fermier = {
            name: "Josiane" ,
            desc: "fermier  de Josiane",
            img: "Josiane.png"
        }

        
        const response = await request("http://141.94.244.226:80") 
          .post("/api/fermier")
          .send(fermier)
          .set('token', `Bearer ${token}`);
          expect(response.statusCode).toBe(200); // Définit le code de retour attendu
          fermierId = response.body._id;

      });


      test("putfermier", async () => { 
        const fermier = {
          name : "Jean"
        }
        const response = await request("http://141.94.244.226:80") 
          .put(`/api/hub/${fermierId}`)
          .send(fermier)
          .set('token', `Bearer ${token}`);
        expect(response.statusCode).toBe(200); 
      });

      test("deleteFermier", async () => { 
        const response = await request("http://141.94.244.226:80") 
          .delete(`/api/hub/${fermierId}`)
          .set('token', `Bearer ${token}`);
        expect(response.statusCode).toBe(200); 
      });

  });