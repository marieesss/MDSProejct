import React, {useState, useEffect} from 'react'
import Menu from '../components/Menu';
import axios from 'axios';
import Footer from '../components/Footer';

const Hubs = () => {
    const [hubs, setHubs] = useState([]);
    const URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`http://${URL}:80/api/hub`)
          .then(response => {
            console.log(response.data)
            setHubs(response.data);
            console.log(hubs)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

  return (
    <div>
    <Menu/>
    <center><h1>Nos Hubs</h1></center>
    <table class="table" striped bordered hover>
      <tr>
        <th>Nom du hub</th>
        <th>Adresse</th>
      </tr>
      <tbody>
        {hubs.map(hub=>(
            <tr>
                <td>{hub.name}</td>
                <td>{hub.adress}</td>
                <td> <a href={`https://www.google.com/maps/search/?api=1&query=${hub.latitude},${hub.longitude}`} target="_blank"><i class="fa-solid fa-arrow-up-right-from-square" style={{color: "#485E1B"}}/></a></td>
            </tr>
        ))}
      </tbody>
    </table>
    <Footer/>
      
    </div>
  )
}

export default Hubs