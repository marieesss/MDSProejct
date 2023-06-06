import React from 'react'
import Menu from '../../components/Menu'
import Footer from '../../components/Footer'

const Mentions = () => {
  return (
    <div class="overflow-hidden" style={{color:"#485E1B"}}>
        <Menu/>
            <div class="row justify-content-center" >
                <h1 class="col-5 px-5 mb-5 mt-5"> Mentions légales </h1>
            </div>
            <div class="row justify-content-center">
                <div class="col-10">
                    <h5 style={{textDecoration:"underline"}}>Mentions légales du site www.web.nossproducteurslocaux.fr</h5>
                    <h5>Édition du site</h5>
                    <p>Le site www.web.nossproducteurslocaux.fr est édité par la société Nos Producteurs Locaux, au capital de 4000€, immatriculée au RCS de NICE sous le numéro 986 628 629 082611, 
                    dont le siège social est situé au 150 Boulevard des Jardiniers, 06200 NICE.</p>
                    <div class="row justify-content-start">
                        <h5 class="col-3" > Numéro de téléphone :</h5> 
                        <p class="col-3">07.69.13.63.18</p>
                    </div>
                    <div class="row justify-content-start">
                        <h5 class="col-3" >Adresse email :</h5> 
                        <p class="col-3">contact@nosproducteurslocaux.fr</p>
                    </div>
                    <div class="row justify-content-start">
                        <h5 class="col-4" >Directeur de la publication :</h5> 
                        <p class="col-3">Marie Espinosa</p>
                    </div>
                    <h5> Hébergement du site</h5>
                    <p>Le site web.nossproducteurslocaux.fr est hébergé par OVH, dont le siège social est situé au 2 rue Kellermann - 59100 Roubaix - France.</p>

                    <h5> Données personnelles</h5>
                    <p>
                    Les informations recueillies sur ce site sont utilisées dans le cadre de la gestion de votre compte, de vos commandes,
                     ainsi que pour toute communication marketing si vous avez donné votre accord.<br/> <br />
                    Pour plus d’informations sur l’utilisation de vos données personnelles, 
                    veuillez consulter notre politique de confidentialité ci dessous.
                    </p>
                    <h5>Propriété intellectuelle</h5>
                    <p>
                    Tous les éléments du site web.nosproducteurslocaux.fr, y compris les textes, graphiques, logos, animations, sont la propriété exclusive de la société Nos Producteurs Locaux,
                     à l’exception des marques, logos ou contenus appartenant à d’autres sociétés partenaires ou auteurs. <br /> <br />

                    Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, 
                    de ces différents éléments est strictement interdite sans l’accord express par écrit de Nos Producteurs Locaux. 
                    Cette représentation ou reproduction, par quelque procédé que ce soit, constitue une contrefaçon sanctionnée 
                    par les articles L.335-2 et suivants du Code de la propriété intellectuelle.

                    </p>
                    <h5>Limitation de responsabilité</h5>
                    <p>Nos Producteurs Locaux ne saurait être tenue responsable pour toute interruption du site, survenance de bugs, 
                        pour toute inexactitude ou omission portant sur des informations disponibles sur le site,
                     pour tous dommages résultant d’une intrusion frauduleuse d’un tiers.</p>
                    <h5 class ="mt-5" style={{textDecoration:"underline"}}>Politique de confidentialité du site www.nosproducteurslocaux.fr</h5>
                    <h5>Collecte des informations personnelles</h5>
                    <p>Nous collectons les informations suivantes : <br/>
                    Nom <br/>
                    Prénom <br/>
                    Adresse postale <br/>
                    Code postal <br/>
                    Adresse de courriel <br/>
                    Numéro de téléphone <br/><br/>
                    Les renseignements personnels que nous collectons sont recueillis au travers de formulaires et grâce à l’interactivité établie entre vous et notre site web. Nous utilisons également, comme indiqué dans la section suivante, des cookies et/ou journaux pour réunir des informations vous concernant.

                    </p>
                    <h5>Formulaires et interactivité</h5>
                    <p>
                    Vos renseignements personnels sont collectés par le biais de formulaire, à savoir :<br/>

                    Formulaire d’inscription au site web<br/>
                    Formulaire de commande<br/><br/>

                    Nous utilisons les renseignements ainsi collectés pour les finalités suivantes :<br/>
                    Suivi de la commande<br/>
                    Informations / Offres promotionnelles<br/>
                    Statistiques<br/>
                    Contact<br/>
                    Droit d’opposition et de retrait<br/><br/>

                    Nous nous engageons à vous offrir un droit d’opposition et de retrait quant à vos renseignements personnels.<br/>

                    Pour pouvoir exercer ces droits, vous pouvez contacter la société par les biais suivants :<br/>
                    Courrier : 150 Boulevard des Jardiniers, 06200 NICE - FRANCE<br/>
                    Courriel : contact@nosproducteurslocaux.fr<br/>
                    Téléphone : 07.69.13.63.18<br/>
                    </p>
                        <h5>Sécurité</h5>
                        <p>Les renseignements personnels que nous collectons sont conservés dans un environnement sécurisé.
                         Les personnes travaillant pour nous sont tenues de respecter la confidentialité de vos informations.<br /><br />

                        Pour assurer la sécurité de vos renseignements personnels, nous avons recours aux mesures suivantes :<br />
                        Protocole SSL (Secure Sockets Layer)<br />
                        Gestion des accès - personne autorisée<br />
                        Sauvegarde informatique<br />
                        Identifiant / mot de passe<br />
                        </p> 

                        <h5>Législation</h5>
                        <p>Nous nous engageons à respecter les dispositions législatives énoncées dans le Règlement Général sur la Protection des Données (RGPD) de l’Union Européenne.</p>


                </div>

            </div>

        <Footer/>
    </div>
  )
}

export default Mentions
