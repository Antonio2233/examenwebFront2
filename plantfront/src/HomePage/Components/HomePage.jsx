import axios from 'axios'
import {useEffect} from 'react';
import SearchBar from '../../Common/SearchBar';
import '../CSS/HomePage.css'
import Prueba from '../../Common/Prueba';
import Navbar from '../../Common/NavBar';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import React, { useState } from "react";

import LogViewer from '../../Common/LogViewer';
import GeocoderSearch from '../../Common/GeocoderSearch';
import { useSession } from '../../Common/SessionProvider';

function HomePage(){

  const [showLogs, setShowLogs] = useState(false);
  const classnamebotonVerde = "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 mr-2 mt-2";
  const { isLoggedIn } = useSession(); // Obtén el estado de inicio de sesión

    useEffect(() => {
        document.title = 'AGZ';
    },[]);

    const toggleLogs = () => {
      setShowLogs(!showLogs);
    };

    return(
    <div id='homeScreen' className='h-screen flex flex-col justify-between items-center'>
      {/* <Navbar/> */}

      <div className='flex flex-col justify-center items-center flex-grow gap-y-7'>
        <h1 id='titulo' className='text-center text-6xl font-sans font-bold italic tracking-wide'>EVENTUAL</h1>
        <footer className='text-center text-2xl max-w-2xl mx-auto font-medium'>Bienvenido a Eventual</footer>
        <SearchBar></SearchBar>

        {isLoggedIn ? (
          <button className= {classnamebotonVerde} onClick={toggleLogs}>
            {showLogs ? "Ocultar logs": "Ver logs"}
          </button>
        ): null}



        {showLogs && <LogViewer email={cookies.get("email")} />}

      </div>
    </div>
    );



}

export default HomePage;