import React, {useState, useEffect} from 'react'
import Menu from '../components/Menu';
import axios from 'axios';
import Footer from '../components/Footer';

const Hubs = () => {
    const [hubs, setHubs] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/hub`)
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
            </tr>
        ))}
      </tbody>
    </table>
    <Footer/>
      
    </div>
  )
}

export default Hubs
