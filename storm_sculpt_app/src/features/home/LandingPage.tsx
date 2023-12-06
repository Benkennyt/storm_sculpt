import React, { useEffect, useRef, useState } from "react";
import "./LandingPage.css";
import Nav from "./Nav";
import { SunIcon } from "../../assets/icons/SVG";
import { fetchRealTimeWeather, fetchIPDetails} from "../../app/api/apiSlice2";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/stores/store";



const LandingPage = () => {

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
    if(realTdata?.forecast?.forecastday[0]) {
        const originalArray = realTdata.forecast.forecastday[0].hour;
        const newArray = [...originalArray].filter(( hour,index) => {
          return index % 3 === 0 && index != 0
        });
      return newArray
    } else {
      return null
    }
  }

  const getDailyDetails = () => {
    if(realTdata?.forecast ) {
        return realTdata.forecast
    } else {
      return null
    }
  }



  console.log(getDailyDetails()?.forecastday[0]?.day?.avgtemp_c)
  
  return (
    <div className="landing-page-container">
      <Nav />
      
      <div className="landing-page-container-1">
        <div className="geolocation">
          {isIPLoading || isRealTWLoading ? <h2 className="loading">Loading...</h2> : 
          <>
            <div className="city">
              <h1>{realTdata?.location?.name ? `${realTdata?.location?.name}` : null}{realTdata?.location?.country  ? ',' : null} 
              </h1>
              {realTdata?.location?.country ? <h1>{realTdata?.location?.country}</h1> : null}
              <div className="date-time">
                <div className="time">
                  <p>{timeDate?.localtime.split(" ")[1]}</p>
                </div>
                <div className="date">
                  <p>{timeDate?.localtime.split(" ")[0]}</p>
                </div>
              </div>
              <div className="degree">
                <p>{realTdata && realTdata.current ? `${realTdata.current.temp_c}°C` : null}</p>
              </div>
            </div>
            <SunIcon />
          </>}
        </div>


        <div className="weather-outlook">
          {isIPLoading || isRealTWLoading ? <h2 className="loading">Loading...</h2> :
            <>
              <h4 className="header">Weather's Outlook</h4><div className="outlook-time-degree">

                {gethourlyDetails()?.map((hour, index) => {
                  return (
                    <div key={index} className="hourly-details">
                      <h6>{hour.time.split(" ")[1]}</h6>
                      <h4>{`${hour.temp_c.toString()}°C`}</h4>
                    </div>
                  );
                })}
              </div>
              <div className="other-outlook-info">
                <div className="info">
                  <h6>avg-Temperature:</h6>
                  <h4>{getDailyDetails()?.forecastday[0]?.day ? `${getDailyDetails().forecastday[0].day.avgtemp_c}°C` : null}</h4>
                </div>
                <div className="info">
                  <h6>max-Wind:</h6>
                  <h4>{getDailyDetails()?.forecastday[0]?.day ? `${getDailyDetails().forecastday[0].day.maxwind_kph} km/p` : null}</h4>
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
            </>}
        </div>

        <div className="current-weather-condition">
          {isIPLoading || isRealTWLoading ? <h2 className="loading">Loading...</h2> :
          <>
            <h4 className="header2">Current Conditions</h4>
            <div className="other-outlook-info outlook-two">
              <div className="info">
                <h6>Wind:</h6>
                <h4>{realTdata.current ? `${realTdata.current.wind_kph} km/h` : null}</h4>
              </div>
              <div className="info">
                <h6>Visibility</h6>
                <h4>{realTdata.current ? `${realTdata.current.vis_km} km` : null}</h4>
              </div>
              <div className="info">
                <h6>Feels Like</h6>
                <h4>{realTdata.current ? `${realTdata.current.feelslike_c}°C` : null}</h4>
              </div>
              <div className="info">
                <h6>Humidity:</h6>
                <h4>{realTdata.current ? `${realTdata.current.humidity}%` : null}</h4>
              </div>
              <div className="info">
                <h6>UV Index:</h6>
                <h4>{realTdata.current ? `${realTdata.current.uv}` : null}</h4>
              </div>
            </div>
            <h4 className="header2">Astronomy</h4>
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
              <div className="info">
                <h6>Moon Phase:</h6>
                <h4>{getDailyDetails()?.forecastday[0]?.astro ? `${getDailyDetails().forecastday[0].astro.moon_phase}` : null}</h4>
              </div>
            </div>
          </>}
        </div>

        <div className="future-forecast">
          {isIPLoading || isRealTWLoading ? <h2 className="loading">Loading...</h2> :
          <>
            <h4 className="header2">Tomorrow</h4>
            <div className="other-outlook-info outlook-two">
              <div className="info">
                <h6>avg-Temperature:</h6>
                <h4>{getDailyDetails()?.forecastday[1]?.day ? `${getDailyDetails().forecastday[1].day.avgtemp_c}°C` : null}</h4>
              </div>
              <div className="info">
                <h6>Raining Chance: </h6>
                <h4>{getDailyDetails()?.forecastday[1]?.day ? `${getDailyDetails().forecastday[1].day.daily_chance_of_rain}%` : null}</h4>
              </div>
              <div className="info max-wind">
                <h6>max-Wind:</h6>
                <h4>{getDailyDetails()?.forecastday[1]?.day ? `${getDailyDetails().forecastday[1].day.maxwind_kph} k/h` : null}</h4>
              </div>
              <div className="info">
                <h6>avg-Visibility:</h6>
                <h4>{getDailyDetails()?.forecastday[1]?.day ? `${getDailyDetails().forecastday[1].day.avgvis_km} km` : null}</h4>
              </div>
              <div className="info humidity">
                <h6>avg-Humidity:</h6>
                <h4>{getDailyDetails()?.forecastday[1]?.day ? `${getDailyDetails().forecastday[1].day.avghumidity}%` : null}</h4>
              </div>
              <div className="info">
                <h6>Sunrise:</h6>
                <h4>{getDailyDetails()?.forecastday[1]?.astro ? `${getDailyDetails().forecastday[1].astro.sunrise}` : null}</h4>
              </div>
            </div>
          </>}
        </div>

        <div className="future-forecast 2">
          {isIPLoading || isRealTWLoading ? <h2 className="loading">Loading...</h2> :
          <>
            <h4 className="header2">2 days</h4>
            <div className="other-outlook-info outlook-two">
              <div className="info">
                <h6>avg-Temperature:</h6>
                <h4>{getDailyDetails()?.forecastday[2]?.day ? `${getDailyDetails().forecastday[2].day.avgtemp_c}°C` : null}</h4>
              </div>
              <div className="info">
                <h6>Raining Chance: </h6>
                <h4>{getDailyDetails()?.forecastday[2]?.day ? `${getDailyDetails().forecastday[2].day.daily_chance_of_rain}%` : null}</h4>
              </div>
              <div className="info max-wind">
                <h6>max-Wind:</h6>
                <h4>{getDailyDetails()?.forecastday[2]?.day ? `${getDailyDetails().forecastday[2].day.maxwind_kph} k/h` : null}</h4>
              </div>
              <div className="info">
                <h6>avg-Visibility:</h6>
                <h4>{getDailyDetails()?.forecastday[2]?.day ? `${getDailyDetails().forecastday[2].day.avgvis_km} km` : null}</h4>
              </div>
              <div className="info humidity">
                <h6>avg-Humidity:</h6>
                <h4>{getDailyDetails()?.forecastday[2]?.day ? `${getDailyDetails().forecastday[2].day.avghumidity}%` : null}</h4>
              </div>
              <div className="info">
                <h6>Sunrise:</h6>
                <h4>{getDailyDetails()?.forecastday[2]?.astro ? `${getDailyDetails().forecastday[2].astro.sunrise}` : null}</h4>
              </div>
            </div>
          </>}
        </div>
      </div>      
    </div>
  );
};

export default LandingPage;
