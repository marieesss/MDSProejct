import React from 'react'
import companyLogo from '../assets/logoblanc.png';
import "../css/app.css"
import { Link } from 'react-router-dom';



const Footer = () => {
  return (
    <div class="row justify-content-center footer">
        <div class="col-lg-6 col-md-12">
            <img src={companyLogo} class="companylogo_footer" alt="logo du footer"/>
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
                <Link to={`/contact`} class="link-footer">
                <p>Nous contacter</p><br/>
                </Link>
                <Link to={`/hub`} class="link-footer">
                <p class="link">Nos Hubs</p><br/>
                </Link>
                    
                </div>
                <div class="col-lg-3 col-md-12">
                <h3> Plus </h3><br/>
                <Link to={`/contact`} class="link-footer">
                <p>Nous rejoindre</p>
                </Link>
                <br/>
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
                        <Link to={`/mentions-légales`} class=" col-4 link-footer">
                            <a class=" droits-link">Mentions Légales</a>
                            </Link>
                            <Link to={`/CGVU`} class=" col-4 link-footer">
                            <a class="droits-link">Conditions</a>
                            </Link>
                            <Link to={`/contact`} class=" col-4 link-footer">
                            <a class=" droits-link">Nous Contacter</a>
                            </Link>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12 d-flex align-items-end justify-content-end mb-3 ">
                    <a href="https://www.instagram.com/nos_producteurs_locaux/" target='blank'><i class="fa-brands fa-instagram fa-xl mx-2" style={{color: "#ffffff"}}/></a>
                    </div>
                </div>
            </div>
            <div class="col-2"/>
        </div>
      
    </div>
  )
}

export default Footer
