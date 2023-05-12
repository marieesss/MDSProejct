import React from 'react'
import companyLogo from '../assets/logo.png';
import "../css/app.css"
import { Link } from 'react-router-dom';



const Footer = () => {
  return (
    <div class="row justify-content-center footer">
        <div class="col-lg-6 col-md-12">
            <img src={companyLogo} class="companylogo_footer"/>
        </div>
        <div class="col-lg-6 col-md-12">
            <div class ="row justify-content-center container-flex-wrap">
                <div class="col-lg-3 col-md-12">
                    <h3> Boutique</h3><br/>
                    <Link to={`/fermier`} class="link-footer">
                    <p>Nos producteurs</p>
                    </Link>
                    <br/>
                    <Link to={`/productf`} class="link-footer">
                    <p>Nos produits</p>
                    </Link>
                    
                </div>
                <div class="col-lg-3 col-md-12">
                <h3> A propos</h3><br/>
                <p>Nous contacter</p><br/>
                <Link to={`/hub`} class="link-footer">
                <p class="link">Nos Hubs</p><br/>
                </Link>
                    
                </div>
                <div class="col-lg-3 col-md-12">
                <h3> Plus </h3><br/>
                <p>Nous rejoindre</p><br/>
                </div>

            </div>
            
        </div>
        <div class="row line-green">
                <div class="col-2">
                </div>
                <div class="col-8 line-white">
                </div>
                <div class="col-2">
                </div>

            </div>
        
        <div class="row">
            <div class="col-2"/>
            <div class="col-8"> 
                <div class="row justify-content-between pb-5">
                    <div class="col-lg-8 col-md-12">
                        <h4> Nos producteurs locaux tous droits réservés</h4> <br/>
                        <div class="row justify-content-center">
                            <a class="col-4 droits-link">Mentions Légales</a>
                            <a class="col-4 droits-link">Conditions</a>
                            <a class="col-4 droits-link">Nous Contacter</a>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12 d-flex align-items-end justify-content-end mb-3 ">
                    <i class="fa-brands fa-instagram fa-xl mx-2" style={{color: "#ffffff"}}/>
                    <i class="fa-brands fa-twitter fa-xl mx-2" style={{color: "#ffffff;"}}></i>
                    <i class="fa-brands fa-facebook fa-xl mx-2" style={{color: "#ffffff;"}}></i>
                    <i class="fa-brands fa-youtube  fa-xl mx-2" style={{color: "#ffffff;"}}></i>
                    </div>
                </div>
            </div>
            <div class="col-2"/>
        </div>
      
    </div>
  )
}

export default Footer
