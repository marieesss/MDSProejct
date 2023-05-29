const request = require('supertest');
require("dotenv").config(); // Pour charger les variables d'environnement depuis un fichier .env
const MAIL = process.env.MAIL_ADMIN; 
const MDP = process.env.MDP_ADMIN; 

describe('Product', () => {

  let productId;
  let token;


  test("Login pour la suite", async () => { 
    const response = await request("https://api.nossproducteurslocaux.fr") 
      .post("/api/auth/login")
      .send({email : MAIL, password: MDP})
      token= response.body.accessToken
  });
    
    test("get All product", async () => { 
        const response = await request("https://api.nossproducteurslocaux.fr") 
          .get("/api/product/");
          expect(response.statusCode).toBe(200); // Définit le code de retour attendu
      });


      test("Add Product", async () => { 
        const product = {
            title:"ananas",
            desc:"tomates cerises",
            img:"https://plus.unsplash.com/premium_photo-1667049288927-b7c56c3f1ef0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dG9tYXRlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            categories:"fruit",
            price:"5",
            size:"6",
            fermierId:"kj"
        }

        
        const response = await request("https://api.nossproducteurslocaux.fr") 
          .post("/api/product")
          .send(product)
          .set('token', `Bearer ${token}`);
          expect(response.statusCode).toBe(200); // Définit le code de retour attendu
          productId = response.body._id;

      });


      test("putProduct", async () => { 
        const product = {
          title : "cerises"
        }
        const response = await request("https://api.nossproducteurslocaux.fr") 
          .put(`/api/product/${productId}`)
          .send(product)
          .set('token', `Bearer ${token}`);
        expect(response.statusCode).toBe(200); 
        expect(response.body.title).toBe("cerises");

        productId = response.body._id;
      });

      test("getOneProduct", async () => { 
        const response = await request("https://api.nossproducteurslocaux.fr") 
          .get(`/api/product/find/${productId}`)
        expect(response.statusCode).toBe(200); 
      });

      test("deleteProduct", async () => { 
        const response = await request("https://api.nossproducteurslocaux.fr") 
          .delete(`/api/product/${productId}`)
          .set('token', `Bearer ${token}`);
        expect(response.statusCode).toBe(200); 
      });

  });