import React from 'react'
import Menu from '../components/Menu'
import { useEffect, useMemo, useState } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux'
import ChartUI from '../components/Chart';
import "../css/app.css";




const Home = () => {
  const [userStats, setUserStats] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [orderStats, setorderStats] = useState([]);
  const [LastOrders, setLastOrders] = useState([]);
  const userToken = useSelector((state) => state.user.currentUser.accessToken);

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

  useEffect(() => {
    const getOrderStats = async () => {
      try {
        const res = await axios.get("http://141.94.244.226:5000/api/user/stats", config);
        console.log(res.data)
        setDataUser(res.data)
        console.log(dataUser)
  
      } catch(err){
        console.log(err)
      }
    };
    getOrderStats(); 
  }, [MONTHS]);

  useEffect(()=>{
    const tableau = []
    dataOrder.map(data =>
      tableau.push({"month": MONTHS[data._id -1], "value": data.total})
      )
      setorderStats(tableau)
  },[dataOrder])

  useEffect(()=>{
     const tableau = []
    dataUser.map(data =>
      tableau.push({"month": MONTHS[data._id -1], "value": data.total})
      )
      console.log(tableau)
      setUserStats(tableau)
  }, [dataUser])


  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("http://141.94.244.226:5000/api/order/stats", config);
        console.log(res.data)
        setDataOrder(res.data)
      } catch(err){
        console.log(err)
      }
    };
    getStats(); 
  }, [MONTHS]);


  useEffect(() => {

    axios.get("http://141.94.244.226:5000/api/order/adminhomepage", config)
      .then(response => {
        console.log(response.data)
        setLastOrders(response.data)
        
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(()=>{
    console.log(LastOrders)
  },[LastOrders])
 



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
      
      <div className="container-c justify-content-around margin-50"> 
        
        <div className="container-y container-stats">
        <ChartUI
        data={userStats}
        dataKey={"value"}
        title={"Utilisateurs créés ces trois derniers mois"}
      />
      </div>
      <div class="container-y container-stats">
      <ChartUI
              data={orderStats}
              dataKey={"value"}
              title={"Commandes créés ces trois derniers mois"}
            />
      </div>     
      </div> 

      {/* <div className="container-c justify-content-around margin-50"> 
      <div class="container-y container-stats">
          <h3> Dernières commandes </h3>
          <div className="container-c justify-content-around"> 
          {LastOrders.map(order=>(
            <div class="card" style={{width:"12rem"}}>
            <div class="card-body">
              <h5 class="card-title">{order.status}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{order.user[0].email}</h6>
              <p class="card-text">{order.amount} euros</p>
            </div>
          </div>
          ))}
          </div>
          <div className="container-c justify-content-around margin-50"> 
          <button class="button-green"><a href="/order">Voir toute les commandes</a></button>
          </div>
      </div>
      </div>   */}
      
    </div>
  )
}

export default Home
