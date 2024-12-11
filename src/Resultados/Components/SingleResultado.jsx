import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { useSession } from '../../Common/SessionProvider'; // Importa el hook


const SingleResultado = ({ item, onEdit, onDelete}) => {

    const { isLoggedIn } = useSession(); // Obtén el estado de inicio de sesión

    const classnamebotonVerde = "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 mr-2";
    const classnamebotonBorrar = "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200";
    const navigate = useNavigate();


  const handleEdit = () => {

      navigate(`/eventos/edicion/${item._id}`);
  }

  const handleDelete = () => {
      console.log(item._id)
        onDelete(item._id);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2><strong>Nombre:</strong> {item.nombre}</h2>
        <p><strong>Organizador:</strong> {item.organizador}</p>
        <p><strong>Latitud:</strong> {item.lat}</p>
        <p><strong>Longitud:</strong> {item.lon}</p>
        {isLoggedIn ? (
          <div>
            <button className={classnamebotonVerde} onClick={handleEdit}>
              EDITAR
            </button>
            <button className={classnamebotonBorrar} onClick={handleDelete}>
              DELETE
            </button>
          </div>
        ) : null}
    </div>

  );
};

export default SingleResultado;
