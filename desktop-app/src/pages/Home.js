import React from 'react'
import Menu from '../components/Menu'
import { useEffect, useMemo, useState } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux'
import ChartUI from '../components/Chart';
import "../css/app.css";
import { useNavigate } from "react-router-dom";





const Home = () => {
  const [userStats, setUserStats] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [orderStats, setorderStats] = useState([]);
  const userToken = useSelector((state) => state.user.currentUser.accessToken);
  const navigate = useNavigate();

 // création du tableau avec les mois
  const MONTHS = useMemo(
    () => [
      "Janvier",
      "Fevrier",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Septembre",
      "Octobre",
      "Novembre",
      "Decembre",
    ],
    []
  );
  const config = {
    headers: { token: `Bearer ${userToken}` }
};

//récupération des statistiques des utilisateurs des trois derniers mois
  useEffect(() => {
    const getUserStats = async () => {
      try {
        const res = await axios.get("https://api.nossproducteurslocaux.fr/api/user/stats", config);
        setDataUser(res.data)
      } catch(err){
        if(err.response.status===403){
          navigate('/login')
        }
      }
    };
    getUserStats(); 
  }, [MONTHS]);

    // associe les donnnées des commandes créés à un mois
  useEffect(()=>{
    const tableau = []
    dataOrder.map(data =>
       // ajoute dans le tableau un objet avec la valeur et le mois correspond à l'id
       // l'id est de 1 à 12 alors que le tableau commence par 0 donc on fait -1 
      tableau.push({"month": MONTHS[data._id -1], "value": data.total})
      )
      setorderStats(tableau)
  },[dataOrder])


  // associe les donnnées des utilisateurs créés à un mois
  useEffect(()=>{
     const tableau = []
    dataUser.map(data =>
       // ajoute dans le tableau un objet avec la valeur et le mois correspond à l'id
       // l'id est de 1 à 12 alors que le tableau commence par 0 donc on fait -1 
      tableau.push({"month": MONTHS[data._id -1], "value": data.total})
      )
      setUserStats(tableau)
  }, [dataUser])

//récupération des statistiques des commandes des trois derniers mois
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("https://api.nossproducteurslocaux.fr/api/order/stats", config);
        setDataOrder(res.data)
      } catch(err){
        console.log("erreur")
      }
    };
    getStats(); 
  }, [MONTHS]);

 



  return (
    <div>
      <Menu/>
      <div class="title-home-container">
        <h1 class="title-home-content">Nos producteurs locaux</h1>
        <img src={require('../img/logo2.png')} width={100} />
      </div>  
      <div class="title-home-container">
        <h3>Administrateur</h3>
      </div>
      
      <div className="row justify-content-around margin-50"> 
        
        <div class="container-y container-stats col-lg-6 col-md-12">
        <ChartUI
        data={userStats}
        dataKey={"value"}
        title={"Utilisateurs créés ces trois derniers mois"}
      />
      </div>
      <div class="container-y container-stats col-lg-6 col-md-12">
      <ChartUI
              data={orderStats}
              dataKey={"value"}
              title={"Commandes créés ces trois derniers mois"}
            />
      </div>     
      </div> 
      
    </div>
  )
}

export default Home
