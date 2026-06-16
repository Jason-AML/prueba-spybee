import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const priorityColor = {
  low: "#10b981",
  medium: "#f59e0b",
  high: "#ef4444",
};

const IncidentMap = ({ incident, incidents }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const items = incidents ?? (incident ? [incident] : []);

  useEffect(() => {
    if (!items.length || !mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/standard",
      center: [items[0].coordinates.lng, items[0].coordinates.lat],
      zoom: items.length === 1 ? 17 : 15,
    });

    map.current.on("load", () => {
      items.forEach((inc) => {
        if (!inc.coordinates) return;

        const color = priorityColor[inc.priority] ?? "#6366f1";

        new mapboxgl.Marker({ color })
          .setLngLat([inc.coordinates.lng, inc.coordinates.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
              <div style="width:200px">
                <img
                  src="${inc.media?.[0]?.url ?? ""}"
                  alt="${inc.title}"
                  style="width:100%; height:120px; object-fit:cover; border-radius:4px; margin-bottom:8px;"
                  onerror="this.style.display='none'"
                />
                <strong>${inc.title}</strong>
                <p style="font-size:12px; color:#6b7280; margin:4px 0">${inc.locationDescription ?? ""}</p>
                <a href="/incidents/${inc.id}" style="display:block; margin-top:4px; color:#3b82f6;">
                  Ver incidente
                </a>
              </div>
            `),
          )
          .addTo(map.current);
      });
    });

    return () => map.current?.remove();
  }, [incident, incidents]);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Ubicación</h2>
      <div ref={mapContainer} className="w-full h-120 rounded-lg overflow-hidden mb-4" />
      {items.length === 1 && items[0].coordinates && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Latitud</p>
            <p className="font-mono font-semibold text-gray-900">{items[0].coordinates.lat}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Longitud</p>
            <p className="font-mono font-semibold text-gray-900">{items[0].coordinates.lng}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentMap;
