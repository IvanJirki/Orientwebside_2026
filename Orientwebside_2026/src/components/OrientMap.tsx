import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { ORIENT_LAURINTIE2 } from "@/lib/orientLocation";
import { cn } from "@/lib/utils";

import "leaflet/dist/leaflet.css";

const center: [number, number] = [ORIENT_LAURINTIE2.lat, ORIENT_LAURINTIE2.lon];

type OrientMapProps = {
  /** Popup label (e.g. translated place name) */
  popupLabel: string;
  className?: string;
};

export function OrientMap({ popupLabel, className }: OrientMapProps) {
  return (
    <div className={cn("relative z-0 h-[260px] w-full overflow-hidden rounded-2xl sm:h-[300px]", className)}>
      <MapContainer
        center={center}
        zoom={17}
        scrollWheelZoom={false}
        className="h-full w-full [&_.leaflet-control-attribution]:text-[10px] [&_.leaflet-control-attribution]:leading-tight"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker
          center={center}
          radius={11}
          pathOptions={{
            color: "#b91c1c",
            fillColor: "#b91c1c",
            fillOpacity: 0.88,
            weight: 2,
          }}
        >
          <Popup>{popupLabel}</Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}
