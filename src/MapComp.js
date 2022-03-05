import React from 'react'
import L from "leaflet";
import { MapContainer, Popup, TileLayer, Marker, useMap } from "react-leaflet";
import { popupContent, okText } from "./PopupStyles";
import "./App.css";

const icon = new L.icon({
  iconUrl: "images/icon-location.svg",
  iconSize: [45, 45],
});

function SetViewOnClick({ coords }) {
   const map = useMap();
   map.setView(coords, map.getZoom());
  return null;
}

function MapComp({coords}) {
  return (
    <div id="map">
      <div style={{ height: "100%", width: "100%" }}>
        <MapContainer
          center={coords}
          zoom={14}
          zoomControl={false}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibGpjdXR0cyIsImEiOiJjbDA1ZWw2eXgxM25sM2ttbTgzMTlzOHpqIn0.YmoO3cRnKxq8TaLCZGLcHA`}
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          <Marker
            position={coords}
            draggable={false}
            animate={true}
            icon={icon}
          >
            <Popup className="request-popup">
              <div style={popupContent}>
                <div style={okText}>Hey, I live here!</div>
              </div>
            </Popup>
          </Marker>
          <SetViewOnClick coords={coords} />
        </MapContainer>
      </div>
    </div>
  );
}

export default MapComp