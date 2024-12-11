import React from 'react';
import { useSearchParams } from 'react-router-dom';

const PruebaMostrarValor = () => {
  const [searchParams] = useSearchParams();
  const latitud = searchParams.get("latitud");
  const longitud = searchParams.get("longitud");

  return (
    <div>
      <h1>Búsqueda</h1>
      {latitud && <p>Latitud: {latitud}</p>}
      {longitud && <p>Longitud: {longitud}</p>}
    </div>
  );
};

export default PruebaMostrarValor;
