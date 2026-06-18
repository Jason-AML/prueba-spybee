import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { toLatLng } from "@/utils/coordinate";
const priorityColors = {
  low: "#22c55e",
  medium: "#eab308",
  high: "#ef4444",
};
const IncidentMap = ({ incident, incidents, title }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Normalizar
  const items = incidents ?? (incident ? [incident] : []);

  useEffect(() => {
    if (!items.length || !mapContainer.current) return;
    const firstCoords = toLatLng(items[0].coordinates);
    if (isNaN(firstCoords.lat) || isNaN(firstCoords.lng)) return;
    if (!firstCoords) return;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [firstCoords.lng, firstCoords.lat],
      zoom: items.length === 1 ? 17 : 15,
    });
    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: "Buscar dirección...",
        countries: "co", 
        language: "es",
      }),
    );
    items.forEach((inc) => {
      const coords = toLatLng(inc.coordinates);
      if (!coords) return;

      const color = priorityColors[inc.priority?.toLowerCase()] ?? "#6b7280";
      const rawUrl = inc.media?.[0]?.url;
      const imgSrc = rawUrl?.startsWith("http") ? rawUrl : null;

      const popup = new mapboxgl.Popup().setHTML(`
    <div style="width:200px">
      ${imgSrc ? `<div id="img-${inc.id}" style="height:120px; background:#f3f4f6; border-radius:4px; margin-bottom:8px;"></div>` : ""}
      <strong>${inc.title}</strong>
      <a href="/incidents/${inc.id}" style="display:block; margin-top:4px; color:#3b82f6;">Ver incidente</a>
    </div>
  `);

      if (imgSrc) {
        popup.on("open", () => {
          const container = document.getElementById(`img-${inc.id}`);
          if (!container || container.dataset.loaded) return;
          const img = document.createElement("img");
          img.src = imgSrc;
          img.alt = inc.title;
          img.style.cssText =
            "width:100%; height:120px; object-fit:cover; border-radius:4px;";
          container.replaceWith(img);
          img.dataset.loaded = "true"; 
        });
      }

      new mapboxgl.Marker({ color })
        .setLngLat([coords.lng, coords.lat])
        .setPopup(popup)
        .addTo(map.current);
    });

    return () => map.current?.remove();
  }, [incident, incidents]);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6 mt-5">
      {title && (
        <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      )}
      <div
        ref={mapContainer}
        className="w-full h-120 rounded-lg overflow-hidden mb-4"
      />
      {items.length === 1 && items[0].coordinates && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Latitud</p>
            <p className="font-mono font-semibold text-gray-900">
              {items[0].coordinates.lat}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Longitud</p>
            <p className="font-mono font-semibold text-gray-900">
              {items[0].coordinates.lng}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentMap;
