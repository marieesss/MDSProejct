import React from 'react'
import Menu from '../../components/Menu'
import Footer from '../../components/Footer'

const Contact = () => {
  return (
    <div class="overflow-hidden" style={{color:"#485E1B"}}>
    <Menu/>
    <div class="row justify-content-end" style={{marginTop:"20px"}}>
        <p class="col-3"><a href="/productf" class="link-vert">Retourner vers la boutique</a></p>
    </div>
    <div class="row justify-content-center" style={{marginTop:"40px"}}>
        <div class="col-lg-7 col-md-12 px-5">
            <h1> Nous contacter</h1>
            <p style={{paddingRight:"50px"}}> 
            Avant de contacter notre équipe, vous pourriez vouloir consulter ces ressources utiles 
            au cas où votre question aurait déjà été répondue</p>
            <ul>
                <li> <p>Consultez nos Conditions générales de ventes </p></li>
                <li> <p>Consultez nos Mentions légales </p></li>
            </ul>
            <p> Si vous avez encore besoin d’aide, nous serions ravis de vous entendre.
             N’hésitez pas à contacter directement notre équipe du Service Clientèle.</p>       
        

        </div> 
        <div class="col-lg-5 col-md-12" style={{marginBottom:"100px"}} >
            <div class="row justify-content-center">
                <div class="col-9">
            <h5> Nos producteurs locaux</h5>
            <p>150 Boulevard des jardiniers</p>
            <p>06200 Nice</p>
            <p> Lundi – Vendredi : 9h - 17h</p>
            <p>contact@nosproducteurslocaux.fr</p>
            <p> 07.61.64.80.65</p>
            </div>

</div>
        </div> 
    </div>


    <Footer/>  
    </div>
  )
}

export default Contact
