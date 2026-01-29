import { useEffect, useState } from 'react'
import Search from "../assets/search.png";
import Humidity from "../assets/humidity.png";
import Wind from "../assets/wind.png";
import './Weather.css'
const KEY_VALUE = import.meta.env.VITE_KEY_VALUE;

function Weather() {
  const [Weatherdata, setWeatherdata] = useState(null);
  const [city, setCity] = useState("New Delhi");
  const [inputvalue,setInputvalue] = useState('');

  const search = async () => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${KEY_VALUE}&q=${city}&aqi=no`);
      const data = await response.json();
      if (!data.current) return;
      setWeatherdata({
        icon: data.current.condition.icon,
        tempreature: data.current.temp_c,
        wind: data.current.wind_kph,
        humidity: data.current.humidity
      })

    }
    catch (error) {
      console.error("Unable to fetch data", error);
    }
  }
  useEffect(() => {
    search();
  }, [city])
 
  function searchbutton(){
    
    if(!inputvalue.trim()) return;
    setCity(inputvalue);
  }
  function handleInputchange(e){
     setInputvalue(e.target.value);

  }


  return (
    <>
      <div className='maindiv'>
        {/* Search Div */}
        <div className='Searchdiv'>
          <input type="text"
          value={inputvalue}
          onChange={handleInputchange}
          onKeyDown={(e) => e.key === "Enter" && searchbutton()}
          placeholder='Enter City here'
           />
          <div>
            <img src={Search} alt="Search button"
            onClick={searchbutton} />
          </div>
        </div>
        {/*Wheather image */}
        <div className='wheather_details'>

          <img src={Weatherdata && Weatherdata.icon} alt="Wheather image" className='wheather_img' />

          {/*Tempreature and Location div */}
          <div className='loctemp'>
            <h1 className='cent'>{Weatherdata && Weatherdata.tempreature}&#xB0; c</h1>
            <h3 className='city'>{city}</h3>
          </div>

        </div>

        {/*Humidity And Wind Speed Showing Div */}
        <div className='tempdiv'>
          {/*humidty div */}
          <div className='humidity'>
            <img src={Humidity} alt="Humidity div" />
            <div className='humid'>
              <h3>{Weatherdata && Weatherdata.humidity}</h3>
              <p>Humidity</p>
            </div>

          </div>
          {/*Wind Speed div */}
          <div className='wind'>
            <img src={Wind} alt="Wind Image" />
            <div className='windspeed'>
              <h3>{Weatherdata && Weatherdata.wind}km/hr</h3>
              <p>Wind Speed</p>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default Weather
