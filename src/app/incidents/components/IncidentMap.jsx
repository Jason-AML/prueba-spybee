import { useEffect, useRef } from "react";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import React from "react";

const IncidentMap = ({ incident }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!incident || !mapContainer.current) return;

    //token de acceso
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    // Crear mapa
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [incident.coordinates.lng, incident.coordinates.lat],
      zoom: 15,
    });

    // Agregar marcador
    new mapboxgl.Marker({ color: "#EF4444" })
      .setLngLat([incident.coordinates.lng, incident.coordinates.lat])
      .addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [incident]);
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Ubicación</h2>
        <div
          ref={mapContainer}
          className="w-full h-80 rounded-lg overflow-hidden mb-4"
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Latitud</p>
            <p className="font-mono font-semibold text-gray-900">
              {incident.coordinates.lat}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Longitud</p>
            <p className="font-mono font-semibold text-gray-900">
              {incident.coordinates.lng}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncidentMap;
