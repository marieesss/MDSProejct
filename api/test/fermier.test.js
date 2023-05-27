const request = require('supertest');
require("dotenv").config(); // Pour charger les variables d'environnement depuis un fichier .env
const MAIL = process.env.MAIL_ADMIN; //récupère l'email dans le .env
const MDP = process.env.MDP_ADMIN;  //récupère le mot de passe dans le .env

describe('Fermier', () => {

  let fermierId;
  let token;

    // Effectue une requête POST pour se connecter avec les identifiants de l'administrateur
  test("Login pour la suite", async () => { 
    const response = await request("http://141.94.244.226:5000") 
      .post("/api/auth/login")
      .send({email : MAIL, password: MDP})
      token= response.body.accessToken
  });

// Effectue une requête GET pour obtenir tous les fermiers
      test("get All fermier", async () => { 
        
        const response = await request("http://141.94.244.226:5000") 
          .get("/api/fermier/");
          expect(response.statusCode).toBe(200); // Définit le code de retour attendu
          expect(response.body.length).toBeGreaterThan(0);
      });

      // Effectue une requête POST pour créér un fermier
      test("Add fermier", async () => { 
        const fermier = {
            name: "Josiane" ,
            desc: "fermier  de Josiane",
            img: "Josiane.png"
        }
        const response = await request("http://141.94.244.226:5000") 
          .post("/api/fermier")
          .send(fermier)
          .set('token', `Bearer ${token}`);
          expect(response.statusCode).toBe(200); // Définit le code de retour attendu
          fermierId = response.body._id;

      });

    // Effectue une requête PUT pour modifier un fermier
      test("putfermier", async () => { 
        const fermier = {
          name : "Jean"
        }
        const response = await request("http://141.94.244.226:5000") 
          .put(`/api/hub/${fermierId}`)
          .send(fermier)
          .set('token', `Bearer ${token}`);
        expect(response.statusCode).toBe(200); 
      });

      // Effectue une requête DELETE pour supprimer un fermier
      test("deleteFermier", async () => { 
        const response = await request("http://141.94.244.226:5000") 
          .delete(`/api/hub/${fermierId}`)
          .set('token', `Bearer ${token}`);
        expect(response.statusCode).toBe(200); 
      });

  });