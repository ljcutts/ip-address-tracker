import React, {useState,useEffect} from 'react'
import env from "react-dotenv";
import './App.css';
import MapComp from './MapComp';
import { apiKey } from './APIKey';




  function App() {
    const [IP, setIP] = useState([]);
    const [ipInput, setIpInput] = useState('');
    const[place, setPlace] = useState([])
    const [city, setCity] = useState([])
    const [time, setTime] = useState([])
    const [ISP, setISP] = useState([])
    const [lat, setLat] = useState(40.0);
    const [lng, setLng] = useState(-89.0);
   const [coords, setCoords] = useState([0, 0]);

  //  const apiKey = window.env.API_KEY;
  

    const fetchIpData = async() => {
      try {
          const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}=${ipInput}`;
          const response = await fetch(url);
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
          setCoords([lat, lng]);
          console.log(data)
      } catch (error) {
        console.log(error)
      }  
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      parseFloat(setIP(ipInput))
      fetchIpData()
      setIpInput('')
    }

    const changeLocation = () => {
      setCoords([lat, lng]);
    }

    useEffect(() => {
        fetchIpData();
        console.log(coords)
    }, [])

   
  
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
            <button onClick={changeLocation}>
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
          <MapComp coords={coords} />
        </div>
      </>
    );
  }

export default App;