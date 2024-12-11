import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';  // Para manejar rutas dinámicas y navegación
import Navbar from '../../Common/NavBar';
import MapComponent from '../../Common/MapComponent';
import apiEndpoint from '../../assets/apiEndpoints.json'


const Edicion = () => {
  const { id } = useParams();  // Obtener el id del evento desde la URL
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

  const [coordinates,setCoordinates] = useState({
    lat: 0,
    lon: 0
  })

  const [eventData, setEventData] = useState({
    nombre: '',
    organizador: '',
    lat: '',
    lon: '',
    lugar: '',
    imagen: '',
    timestamp: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los datos del evento cuando el componente se monte
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        let urlApi = apiEndpoint.api + '/eventos/' + id;
        //const response = await axios.get(`http://127.0.0.1:8000/eventos/${id}`);
        const response = await axios.get(urlApi);

        setEventData(response.data);
        setCoordinates({
          lat: parseFloat(response.data.lat) || 0,
          lon: parseFloat(response.data.lon) || 0,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    setEventData((prevData) => ({
      ...prevData,
      lat: coordinates.lat.toString(),
      lon: coordinates.lon.toString(),
    }));
  }, [coordinates]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
        //localhost
      let urlPut = apiEndpoint.api + '/eventos/' + id;
      // const response = await axios.put(`http://127.0.0.1:8000/eventos/${id}`, eventData);
      const response = await axios.put(urlPut, eventData);

      console.log('Evento actualizado:', response.data);
      setSuccessMessage('¡Guardado exitosamente!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    {/* <Navbar/> */}
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Editar Evento</h2>

        {error && <p className="text-red-500">{error}</p>}

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
            value={eventData.lat}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          <strong>Longitud:</strong>
          <input
            type="number"
            name="lon"
            value={eventData.lon}
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

        <MapComponent coordinates={[{lat: 0,lon: 0}]} setCoordinates={setCoordinates}/>


        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
          onClick={handleSave}
        >
          GUARDAR
        </button>

        {successMessage && (
          <p className="text-green-500 text-sm mt-2">{successMessage}</p>
        )}
      </div>
    </div>

  );
};

export default Edicion;
