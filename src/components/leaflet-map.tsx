import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type DeviceMarker = {
  id: number | string;
  lat: number;
  lng: number;
  label: string;
  sublabel?: string;
  color: string; // CSS color
};

interface Props {
  markers: DeviceMarker[];
  center?: [number, number];
  zoom?: number;
  dark?: boolean;
}

export default function LeafletMap({
  markers,
  center = [22.9734, 78.6569], // India center
  zoom = 5,
  dark = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const map = L.map(ref.current, {
      center,
      zoom,
      zoomControl: true,
      attributionControl: true,
    });

    const tileUrl = dark
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

    L.tileLayer(tileUrl, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dark]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    layer.clearLayers();
    markers.forEach((m) => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="position:relative;display:flex;align-items:center;justify-content:center;">
          <span style="position:absolute;width:22px;height:22px;border-radius:9999px;background:${m.color};opacity:.25;animation:lp 1.6s ease-out infinite"></span>
          <span style="width:12px;height:12px;border-radius:9999px;background:${m.color};box-shadow:0 0 0 2px var(--background, white)"></span>
        </div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });
      L.marker([m.lat, m.lng], { icon })
        .bindPopup(
          `<div style="font-family:Inter,sans-serif"><strong>${m.label}</strong><br/><span style="opacity:.7;font-size:12px">${m.sublabel ?? ""}</span></div>`,
        )
        .addTo(layer);
    });
  }, [markers]);

  return (
    <>
      <style>{`@keyframes lp{0%{transform:scale(.6);opacity:.6}100%{transform:scale(2);opacity:0}}
        .leaflet-container{background:transparent;font-family:Inter,sans-serif;border-radius:1rem}
        .leaflet-popup-content-wrapper{border-radius:12px}
      `}</style>
      <div ref={ref} className="absolute inset-0 rounded-2xl overflow-hidden" />
    </>
  );
}
