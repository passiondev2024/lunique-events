"use client";

import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";

import { env } from "@/env.mjs";
import { type Place } from "@/types";

export const LocationMap = ({ position }: { position: Place["position"] }) => {
  return (
    <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="h-52 w-full rounded-md">
        <Map
          mapId={env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
          zoom={15}
          center={position}
          clickableIcons={false}
          fullscreenControl={false}
          zoomControl={false}
          mapTypeControl={false}
          streetViewControl={false}
          style={{
            borderRadius: "calc(var(--radius) - 2px)",
            overflow: "hidden",
          }}
        >
          <AdvancedMarker position={position}>
            <Pin />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};
