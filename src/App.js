import React, {useState,useEffect} from 'react'
import L from "leaflet";
import {
  MapContainer, 
  Popup,
  TileLayer,
  Marker
} from "react-leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { popupContent, okText } from './PopupStyles'
import './App.css';

const icon = new L.icon({
  iconUrl: 'images/icon-location.svg',
  iconSize: [45, 45],
});

/*

{"ip":"73.51.131.23",
"location":{"country":"US","region":"Illinois","timezone":"-06:00"},
"domains":["c-73-51-131-23.hsd1.il.comcast.net"],

"as":{"asn":7922,"name":"COMCAST-7922","route":"73.0.0.0\/8",
"domain":"https:\/\/corporate.comcast.com\/",
"type":"Cable\/DSL\/ISP"},

"isp":"Comcast"}
*/


  function App() {
    const apiKey = process.env.API_KEY;
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_WCugYz2GCoTmT6xYgzuMBFZnTsQ6f&ip`;

    const [IP, setIP] = useState([]);
    const [ipInput, setIpInput] = useState('');
    const[place, setPlace] = useState([])
    const [city, setCity] = useState([])
    const [time, setTime] = useState([])
    const [ISP, setISP] = useState([])
    const [lat, setLat] = useState(37.38605);
    const [lng, setLng] = useState(-122.08385);
    const [position1, setPosition] = useState([{ lat: 0, lng: 0 }]);

    const fetchIpData = async() => {
       try {
             const response = await fetch(url);
             const data = await response.json();
             const { location } = data;
             const { region, timezone, city, lat, lng } = location;
             setIP(data.ip)
             setPlace(region);
             setCity(city);
             setTime(timezone);
             setISP(data.isp); 
             setLat(lat)
             setLng(lng)
             console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchIpData2 = async() => {
      try {
          const url2 = `https://geo.ipify.org/api/v2/country,city?apiKey=at_WCugYz2GCoTmT6xYgzuMBFZnTsQ6f&ipAddress=${ipInput}`;
          const response = await fetch(url2);
          const data = await response.json();
          const { location } = data;
          const { region, timezone, city, lat, lng } = location;
          setIP(data.ip)
          setPlace(region);
          setCity(city);
          setTime(timezone);
          setISP(data.isp);
          setLat(lat);
          setLng(lng);
        
          console.log(data)
      } catch (error) {
        console.log(error)
      }  
    }

    const handleSubmit = () => {
      parseFloat(setIP(ipInput))
    }

   

    // useEffect(() => {
    //   if(handleSubmit) {
    //     fetchIpData2()
    //   } else {
    //      fetchIpData()
    //   }  
    // },[handleSubmit]);

    useEffect(() => {
      fetchIpData()
    },[])

    useEffect(() => {
        fetchIpData2();
    }, [handleSubmit])
    
  

    return (
      <>
        <div className="background-image">
          <h1>IP Address Tracker</h1>
          <form className="enter-ip" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search for any IP address or domain"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
            />
            <button>
              <img src="/images/icon-arrow.svg" alt="" />
            </button>
          </form>
        </div>
        <div className="map">
          <div className="display-data">
            <div className="data-section">
              <span>IP Address</span>
              <p>{IP}</p>
            </div>
            <div className="data-section">
              <span>Location</span>
              <p>
                {city}, {place}
              </p>
            </div>
            <div className="data-section">
              <span>Time</span>
              <p>UTC {time}</p>
            </div>
            <div className="data-section">
              <span>ISP</span>
              <p>{ISP}</p>
            </div>
          </div>
          <div id="map">
            <div style={{ height: "100%", width: "100%" }}>
              <MapContainer
                center={[lat, lng]}
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
                  position={[lat, lng]}
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
              </MapContainer>
            </div>
          </div>
        </div>
      </>
    );
  }

export default App;