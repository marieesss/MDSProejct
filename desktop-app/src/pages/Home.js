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
        const res = await axios.get("http://localhost:5000/api/user/stats", config);
        console.log(res.data)
        setDataUser(res.data)
        console.log(dataUser)
        dataUserTableau()
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
      console.log(tableau)
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


  const dataUserTableau = () =>{
       

  }
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/order/stats", config);
        console.log(res.data)
        setDataOrder(res.data)
      } catch(err){
        console.log(err)
      }
    };
    getStats(); 
  }, [MONTHS]);



  


  return (
    <div>
      <Menu/>
      <div className="container-c margin-50"> 
        <div className="container-y">
        <ChartUI
        data={userStats}
        dataKey={"value"}
        title={"Utilisateurs créés ces trois derniers mois"}
      />
      </div>
      <div class="container-y">
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
