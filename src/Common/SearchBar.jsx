import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Cookies from 'universal-cookie';


const SearchBar = () => {
  const [nombre, setNombre] = useState('');
  const [organizador, setOrganizador] = useState('');
  const cookies = new Cookies();


  const [coordinates, setCoordinates] = useState({
    lat: '',
    lon: ''
  });

  const classnameboton = "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200";
  const classnamebotonred = "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 ml-2";

  const navigate = useNavigate();

  // Función para realizar la búsqueda en OpenStreetMap
  const fetchCoordinates = async (query) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        // Seleccionamos el primer resultado
        return {
          lat: data[0].lat,
          lon: data[0].lon
        };
      }
      else {
        // alert("No se encontraron resultados para la dirección proporcionada.");
        // return null;
      }
    } catch (error) {
      console.error("Error al buscar coordenadas:", error);
      alert("Hubo un error al buscar las coordenadas.");
      return null;
    }
  };

  const search = async (event) => {
    event.preventDefault();
    const params = new URLSearchParams();

    if (nombre.trim()) {
      // Obtener coordenadas desde OpenStreetMap
      const coords = await fetchCoordinates(nombre);
      if (coords) {
        setCoordinates(coords);
        params.append("latitud", coords.lat);
        params.append("longitud", coords.lon);
        params.append("organizador",organizador);
      }
    }
    else if(organizador.trim()){
        params.append("organizador",organizador);
    }else{
      const email = cookies.get('email'); // Obtener el email del usuario desde las cookies

      params.append("organizador",email);


      // const coords = await fetchCoordinates("Malaga");
      // if (coords) {
      //   setCoordinates(coords);
      //   params.append("latitud", coords.lat);
      //   params.append("longitud", coords.lon);
      // }
    }

    // if (coordinates.lat) params.append("latitud", coordinates.lat);
    // if (coordinates.lon) params.append("longitud", coordinates.lon);


    if (params.toString()) {
      navigate(`/eventos?${params.toString()}`);
    } else {
      // alert("Por favor, rellena al menos un campo para buscar.");
    }
  };

  return (
    <form onSubmit={search} className='flex gap-3 justify-center'>
      <div className='flex row'>
        {/* <input
          type="text"
          placeholder="Dirección"
          // required={true}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className='border rounded px-4 py-2 w-full mr-3'
        /> */}

        <input
          type="text"
          placeholder="Autor de Mapa"
          // required={true}
          value={organizador}
          onChange={(e) => setOrganizador(e.target.value)}
          className='border rounded px-4 py-2 w-full mr-3'
        />

        {/* <input
          type="number"
          placeholder="Latitud"
          value={coordinates.lat}
          onChange={(e) => setCoordinates((prev) => ({ ...prev, lat: e.target.value }))}
          className='border rounded px-4 py-2 w-full mr-3'
        />

        <input
          type="number"
          placeholder="Longitud"
          value={coordinates.lon}
          onChange={(e) => setCoordinates((prev) => ({ ...prev, lon: e.target.value }))}
          className='border rounded px-4 py-2 w-full mr-3'
        /> */}

        <button type='submit' className={classnameboton}>Buscar Autor</button>
        <button type='submit' className={classnamebotonred}>Ver MiMapa</button>
      </div>

    </form>
  );
};

export default SearchBar;
