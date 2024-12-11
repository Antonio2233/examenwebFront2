import React, { useState } from "react";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

function GeocoderSearch({ setCoordinates = null }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query) return;

    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.geocode(query, (results) => {
      if (results && results.length > 0) {
        const { center } = results[0];
        if (typeof setCoordinates === "function") {
          setCoordinates({
            lat: center.lat,
            lon: center.lng,
          });
        }
        console.log("Coordinates:", center);
      } else {
        console.error("No results found for query:", query);
      }
    });
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <input
        type="text"
        value={query}
        placeholder="Search location..."
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "300px",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "0.5rem 1rem",
          border: "none",
          backgroundColor: "#007BFF",
          color: "white",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Buscar Localizacion
      </button>
    </div>
  );
}

export default GeocoderSearch;
