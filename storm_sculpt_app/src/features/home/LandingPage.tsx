import React, { useEffect, useRef , useState} from "react";
import "./LandingPage.css";
import Nav from "./Nav";
import { fetchRealTimeWeather, fetchIPDetails} from "../../app/api/apiSlice2";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/stores/store";
import Loading from "../../app/general/Loading";
import Settings from "../settings/Settings";
import useWindowResize from "../../Hooks/useWindowResize";



const LandingPage = () => {
  const [tempIsToggled, setTempIsToggled] = useState(false);
  const [windIsToggled, setWindIsToggled] = useState(false);
  const [visIsToggled, setVisIsToggled] = useState(false);
  const [settingsClicked, setSettingsClicked] = useState(false);
  const {width, height} = useWindowResize();


  const dispatch = useAppDispatch()
  const {data, isIPLoading,isRealTWLoading} = useSelector((state:any) => state.WeatherDetails)
  const IP = data.ipdata.ip
  const count = useRef(0)
  const realTdata = data.realTimedata
  const timeDate =   realTdata.location

  useEffect(() => {
    dispatch(fetchIPDetails())
  }, [])
  

  useEffect(() => {
    if (IP && count.current === 0) {
      count.current = count.current + 1
      dispatch(fetchRealTimeWeather(IP))
    }
  }, [IP])

  const gethourlyDetails = () => {
    if(realTdata?.forecast?.forecastday[0] && width! >= 500) {
        const originalArray = realTdata.forecast.forecastday[0].hour;
        const newArray = [...originalArray].filter(( hour,index) => {
          return index % 3 === 0 && index != 0
        });
      return newArray
    } else if(realTdata?.forecast?.forecastday[0] && width! <=    499) {
      const originalArray = realTdata.forecast.forecastday[0].hour;
      const newArray = [...originalArray].filter(( hour,index) => {
       return index < 3
      });
      return newArray
    } else {
      return null
    }
}

  const getDailyDetails = () => {
    if(realTdata && realTdata.forecast ) {
        return realTdata.forecast
    } else {
      return null
    }
  }

  const getDailyDetails2 = () => {
    if(realTdata && realTdata.forecast && realTdata.forecast.forecastday ) {
     const originalArray = realTdata.forecast.forecastday
      const newArray = [...originalArray].filter(( hour,index) => {
        return  index != 0
      });
    return newArray


    } else {
      return null
    }
  }

  console.log(width)
  
  return (
    <div className="landing-page-container">
      <Nav 
        setSettingsClicked={setSettingsClicked}
        settingsClicked={settingsClicked} />
      <Settings 
        settingsClicked={settingsClicked}
        tempIsToggled={tempIsToggled} 
        onToggleTemp={() => setTempIsToggled(!tempIsToggled)}
        windIsToggled={windIsToggled} 
        onToggleWind={() => setWindIsToggled(!windIsToggled)}
        visIsToggled={visIsToggled} 
        onToggleVis={() => setVisIsToggled(!visIsToggled)}
        />

      {isIPLoading || isRealTWLoading ? <div className="landing-page-loading">
        <Loading/> 
      </div>:
       <>
      <div className="landing-page-container-1">
        <div className="geolocation">
            <div className="city">
              <div className="name">
                <h2>{realTdata?.location?.name ? `${realTdata?.location?.name}` : null}{realTdata?.location?.country  ? ',' : null} 
                </h2>
                {realTdata?.location?.country ? <h2>{realTdata?.location?.country}</h2> : null}
              </div>
              <div className="date-time">
                <div className="time">
                  <p>{timeDate?.localtime.split(" ")[1]}</p>
                </div>
                <div className="date">
                  <p>{timeDate?.localtime.split(" ")[0]}</p>
                </div>
              </div>
              <div className="degree">
                {tempIsToggled ? <p>{realTdata && realTdata.current ? `${realTdata.current.temp_f}°F` : null}</p> :
                <p>{realTdata && realTdata.current ? `${realTdata.current.temp_c}°C` : null}</p>}
              </div>
            </div>
            <div className="condition">
              <img src= {realTdata && realTdata.current && realTdata.current.condition ? realTdata.current.condition.icon  : null} alt="condition icon" />
            
            </div>
        </div>


        <div className="weather-outlook">
              <h4 className="header">Weather's Outlook</h4><div className="outlook-time-degree">

                {gethourlyDetails()?.map((hour, index) => {
                  return (
                    <div key={index} className="hourly-details">
                      <h6>{hour.time.split(" ")[1]}</h6>
                      <img src={hour.condition.icon} alt="" />
                      {tempIsToggled ? <h4>{`${hour.temp_f.toString()}°F`}</h4> : <h4>{`${hour.temp_c.toString()}°C`}</h4>}
                    </div>
                  );
                })}
              </div>
              <div className="other-outlook-info">
                <div className="info">
                  <h6>avg-Temperature:</h6>
                  {tempIsToggled ? <h4>{getDailyDetails()?.forecastday[0]?.day ? `${getDailyDetails().forecastday[0].day.avgtemp_f}°F` : null}</h4> : <h4>{getDailyDetails()?.forecastday[0]?.day ? `${getDailyDetails().forecastday[0].day.avgtemp_c}°C` : null}</h4>}
                </div>
                <div className="info">
                  <h6>max-Wind:</h6>
                  {windIsToggled ? <h4>{getDailyDetails()?.forecastday[0]?.day ? `${getDailyDetails().forecastday[0].day.maxwind_mph} mph` : null}</h4> : <h4>{getDailyDetails()?.forecastday[0]?.day ? `${getDailyDetails().forecastday[0].day.maxwind_kph} kph` : null}</h4>}
                </div>
                <div className="info">
                  <h6>avg-Humidity:</h6>
                  <h4>{getDailyDetails()?.forecastday[0]?.day ? `${getDailyDetails().forecastday[0].day.avghumidity}%` : null}</h4>
                </div>
                <div className="info">
                  <h6>Chances of Rain</h6>
                  <h4>{getDailyDetails()?.forecastday[0]?.day ? `${getDailyDetails().forecastday[0].day.daily_chance_of_rain}%` : null}</h4>
                </div>
              </div>
        </div>
      </div>

      <div className="landing-page-container-2">
        <div className="current-weather-condition">
              <h4 className="header2">Current Conditions</h4>
              <div className="other-outlook-info outlook-two">
                <div className="info wind">
                  <h6>Wind:</h6>
                  {windIsToggled ? <h4>{realTdata.current ? `${realTdata.current.wind_mph} mph` : null}</h4> : <h4>{realTdata.current ? `${realTdata.current.wind_kph} kph` : null}</h4>}
                </div>
                <div className="info vis">
                  <h6>Visibility</h6>
                  {visIsToggled ? <h4>{realTdata.current ? `${realTdata.current.vis_miles} mi` : null}</h4> : <h4>{realTdata.current ? `${realTdata.current.vis_km} km` : null}</h4>}
                </div>
                <div className="info fl">
                  <h6>Feels Like</h6>
                  {tempIsToggled ? <h4>{realTdata.current ? `${realTdata.current.feelslike_f}°F` : null}</h4> : <h4>{realTdata.current ? `${realTdata.current.feelslike_c}°C` : null}</h4>}
                </div>
                <div className="info hum">
                  <h6>Humidity:</h6>
                  <h4>{realTdata.current ? `${realTdata.current.humidity}%` : null}</h4>
                </div>
                <div className="info uv">
                  <h6>UV Index:</h6>
                  <h4>{realTdata.current ? `${realTdata.current.uv}` : null}</h4>
                </div>
              </div>
              <h4 className="header2 astronomy">Astronomy</h4>
              <div className="other-outlook-info outlook-two">
                <div className="info">
                  <h6>Sunrise:</h6>
                  <h4>{getDailyDetails()?.forecastday[0]?.astro ? `${getDailyDetails().forecastday[0].astro.sunrise}` : null}</h4>
                </div>
                <div className="info">
                  <h6>Sunset:</h6>
                  <h4>{getDailyDetails()?.forecastday[0]?.astro ? `${getDailyDetails().forecastday[0].astro.sunset}` : null}</h4>
                </div>
                <div className="info">
                  <h6>Moonset:</h6>
                  <h4>{getDailyDetails()?.forecastday[0]?.astro ? `${getDailyDetails().forecastday[0].astro.moonset}` : null}</h4>
                </div>
              </div>
          </div>


          {getDailyDetails2()?.map((daytime: any, index)=> {
            return (
              <div key={index} className="future-forecast">
                <h4 className="header2">{index === 0 ? 'Tomorrow' : index === 1 ? '2-days' : null}</h4>
                <div className="other-outlook-info outlook-two">
                  <div className="info info avg-temp" >
                    <h6>avg-Temperature:</h6>
                    <h4>{daytime.day.avgtemp_c}°C</h4>
                  </div>
                  <div className="info info2 rain-chance">
                    <h6>Chances of Rain: </h6>
                    <h4>{daytime.day.daily_chance_of_rain}%</h4>
                  </div>
                  <div className=" info info2 max-wind">
                    <h6>max-Wind:</h6>
                    <h4>{daytime.day.maxwind_kph} k/h</h4>
                  </div>
                  <div className="info info2 avg-vis">
                    <h6>avg-Visibility:</h6>
                    <h4>{daytime.day.avgvis_km} km</h4>
                  </div>
                  <div className="info info2 sunrise">
                    <h6>Sunrise:</h6>
                    <h4>{daytime.astro.sunrise}</h4>
                  </div>
                  <div className="info info2 humidity">
                    <h6>avg-Humidity:</h6>
                    <h4>{daytime.day.avghumidity}%</h4>
                  </div>
                </div>
            </div>
          )})}
      </div>
      </>}
    </div>
  );
};

export default LandingPage;
