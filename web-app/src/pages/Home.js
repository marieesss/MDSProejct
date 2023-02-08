import React, { useState } from 'react';
import axios from 'axios';
import Menu from '../components/Menu';


const Home = () => {
    return (
        
        <div className='container'>
            <Menu/>
            <h1>Fermier</h1>
        </div>
        
    );
};

export default Home;