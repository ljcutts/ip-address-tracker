import React, {useState,useEffect} from 'react'
import './App.css';
import MapComp from './MapComp';
import { apiKey } from './APIKey';




  function App() {
    const [IP, setIP] = useState([]); //Keeps track of the state of the current IP-Address
    const [ipInput, setIpInput] = useState(''); //Allows user to type in a different ip-address
    const[place, setPlace] = useState([])//Keeps track of the useState of the state in that country/continent
    const [city, setCity] = useState([]) //Keeps track of the useState of the city in that state
    const [time, setTime] = useState([]) //Keeps track of the state of the time of that location
    const [ISP, setISP] = useState([]) //Keeps track of the state of the Internet-Service-Provider of that location
    const [lat, setLat] = useState(0); //Helps to set the latitude of current location
    const [lng, setLng] = useState(0); //Helps to set the longitude of current location
    const [coords, setCoords] = useState([0, 0]); //Helps to set the coordinates of the current location combining the longitude and latitude
  
    //function outputs a promise and fetches the data from the API being used. API is then used to dynamically set the location, city, state, etc.
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

//This is the submission for when someone relocates the map and changes the information by typing in a different IP-Address
    const handleSubmit = (e) => {
      e.preventDefault()
      parseFloat(setIP(ipInput))
      fetchIpData()
      setIpInput('')
    }

  //Helps to change the coordinates of the map
    const changeLocation = () => {
      setCoords([lat, lng]);
    }

  //Renders the API data once
    useEffect(() => {
        fetchIpData();
    }, [])

   
  
    return (
      <>
        <div className="background-image">
          <h1>IP Address Tracker</h1>
          {/* Form for when the user changes the IP-Address */}
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
          {/* This outputs the data given from the API */}
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
          {/* Component of the map */}
          <MapComp coords={coords} />
        </div>
      </>
    );
  }

export default App;