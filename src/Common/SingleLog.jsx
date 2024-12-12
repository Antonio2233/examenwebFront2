import { useState, useEffect } from 'react'

function SingleLog({data}) {


    return (
        <div>
            <p>{data.timestamp}</p>
            <p>{data.email}</p>
            <p>{data.datoalmacenado}</p>
        </div>
    )


}

export default SingleLog;