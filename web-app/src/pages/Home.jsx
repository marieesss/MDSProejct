import React, { useState } from 'react';
import axios from 'axios';
import Menu from '../components/Menu';
import Categories from '../components/Categories';
import Fermiers from '../components/Fermiers';


const Home = () => {
    return (
        
        <div className='container'>
            <Menu/>
            <h1>Application</h1>
            <Categories/>
            <Fermiers/>
        </div>
        
    );
};

export default Home;