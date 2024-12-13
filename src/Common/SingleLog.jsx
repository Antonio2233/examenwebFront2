import { useState, useEffect } from 'react'

function SingleLog({data}) {


    return (
        <div>
            <p>Hora: {data.timestamp}</p>
            <p>Autor: {data.email}</p>
            <p>Visita: {data.datoalmacenado}</p>
            <p>Token: {data.token}</p>
            <p>  --  </p>
        </div>
    )


}

export default SingleLog;