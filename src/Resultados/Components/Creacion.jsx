import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';  // Para manejar rutas dinámicas y navegación
import Navbar from '../../Common/NavBar';
import MapComponent from '../../Common/MapComponent';

import UploadFile from '../../Common/UploadFile';
import apiEndpoint from '../../assets/apiEndpoints.json'


const Creacion = () => {

  const [eventData, setEventData] = useState({
    nombre: '',
    organizador: '',
    lat: '',
    lon: '',
    lugar: '',
    imagen: '',
    timestamp: new Date().toISOString(),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Estado para el mensaje de éxito
  const [coordinates,setCoordinates] = useState({
    lat: 0,
    lon: 0
  })


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {

      const updatedEventData = {
        ...eventData,
        lat: coordinates.lat,
        lon: coordinates.lon,
      };

      console.log(eventData);
      let urlPost = apiEndpoint.api + '/eventos/';

      // const response = await axios.post('http://127.0.0.1:8000/eventos', updatedEventData);
      const response = await axios.post(urlPost, updatedEventData);

      console.log('Evento creado:', response.data);
      setSuccessMessage('Evento creado exitosamente!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    {/* <Navbar/> */}
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Crear</h2>

        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <label className="block mb-2">
          <strong>Nombre:</strong>
          <input
            type="text"
            name="nombre"
            value={eventData.nombre}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          <strong>Organizador:</strong>
          <input
            type="email"
            name="organizador"
            value={eventData.organizador}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          <strong>Lugar:</strong>
          <input
            type="text"
            name="lugar"
            value={eventData.lugar}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          <strong>Latitud:</strong>
          <input
            type="number"
            name="lat"
            value={coordinates.lat}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          <strong>Longitud:</strong>
          <input
            type="number"
            name="lon"
            value={coordinates.lon}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          <strong>Imagen URL:</strong>
          <input
            type="text"
            name="imagen"
            value={eventData.imagen}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          <strong>TimeStamp:</strong>
          <input
            type="date"
            name="timestamp"
            value={new Date(eventData.timestamp).toLocaleDateString("en-CA")}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
          />
        </label>

        <UploadFile setEventData={setEventData}/>


        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
          onClick={handleSave}
        >
          CREAR
        </button>
      </div>

      <MapComponent coordinates={[{lat: 0,lon: 0}]} setCoordinates={setCoordinates}/>
    </div>

  );
};

export default Creacion;
