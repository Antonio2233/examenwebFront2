import React from 'react';
import axios from 'axios';

import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Navbar from '../../Common/NavBar';
import apiEndpoint from '../../assets/apiEndpoints.json';
import SingleResultado from './SingleResultado';
import MapComponent from '../../Common/MapComponent';
import { useSession } from '../../Common/SessionProvider'; // Importa el hook

const Resultados = () => {

  const { isLoggedIn } = useSession(); // Obtén el estado de inicio de sesión


  const [searchParams] = useSearchParams();
  const latitud = searchParams.get("latitud");
  const longitud = searchParams.get("longitud");
  const nombre = searchParams.get("nombre");
  // tocar si buscar secund
  const organizador = searchParams.get("organizador");


  const classnamebotonVerde = "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 mr-2 mt-2";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  const handleCreate = () => {
      navigate(`/eventos/creacion`);
  }

  // Eliminar evento
  const handleDelete = async (id_result) => {
    let urlApiDelete = apiEndpoint.api + '/eventos/' + id_result;

    try {
      console.log("empieza delete");
      console.log(urlApiDelete);
      const response = await axios.delete(urlApiDelete);
      console.log(response.data);

      setData(prevData => prevData.filter(item => item._id !== id_result));
      console.log("termina delete");
    } catch (err) {
      setError(err.message);
    }
  };

  // Obtener los datos de los eventos
  const getData = async () => {
    let urlApi = apiEndpoint.api + '/eventos/?';

    console.log(latitud)

    if (latitud) urlApi += `lat=${latitud}&`;
    if (longitud) urlApi += `lon=${longitud}`;
    if (nombre) urlApi += `&nombre=${nombre}`;
    if (organizador) urlApi += `&organizador=${organizador}`;

    try {
      setLoading(true);
      console.log("Empieza la solicitud a la API");
      console.log(urlApi);

      const response = await axios.get(urlApi);
      setData(response.data);
      console.log("Respuesta recibida", response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

const coordinates = data.map(item => ({
  lat: item.lat,
  lon: item.lon,
  nombre: item.nombre,
}));

  useEffect(() => {
    getData();  // Obtener datos al cargar el componente o al cambiar los parámetros
  }, [latitud, longitud, nombre]);  // Dependencias de búsqueda

  return (
    <div>
      {/* <Navbar /> */}
      <h1>Resultados:</h1>

      {loading ? <p>Cargando...</p> : null}
      {error && <p className="text-red-500">Error: {error}</p>}

    {isLoggedIn ? (
      <div  className="flex justify-center">
      <button onClick={handleCreate} className={`${classnamebotonVerde}`}>CREAR </button>
      </div>
    ): null}

      {data && data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <SingleResultado
              key={item.id}
              item={item}
              onEdit={() => {}}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      ) : (
        !loading && <p>No se encontraron eventos.</p>
      )}
      <MapComponent coordinates={coordinates}/>
    </div>
  );
};

export default Resultados;
