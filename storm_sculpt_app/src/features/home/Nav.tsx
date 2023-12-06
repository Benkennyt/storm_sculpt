import React, { useEffect, useState } from "react";
import './Nav.css';
import { LogoCloudIcon } from '../../assets/icons/SVG';
import { fetchRealTimeWeather, fetchSearchAutoComplete} from "../../app/api/apiSlice2";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/stores/store";

const Nav = () => {
  const [ID, setID] = useState(Number)
  const dispatch = useAppDispatch()
  const {data, isSearchLoading} = useSelector((state:any) => state.WeatherDetails)
  const searchData = data?.searchdata

  useEffect(() => {
    if (ID && searchData) {
      dispatch(fetchRealTimeWeather(`${searchData[ID].name} ${searchData[ID].region} ${searchData[ID].country}`))
    }
  }, [ID])

  const handleChange = (event: { target: { value: any; }; }) => {
    let value = event?.target?.value
    if(value) {
      return (
        dispatch(fetchSearchAutoComplete(value))
      )
    }
  }

  const handleWantedSearchData = (event: any) => {
    setID(event.currentTarget.id)
  }


  return (
    <div className='navbar'>
        <div className="logo">
            <h1>StormSculpt</h1>
            <LogoCloudIcon/>
        </div>
        <div className="search-bar-container">
          <input onChange={handleChange} className='search-bar' type="text" placeholder='Find Weather for...'/>
          <div className="search-suggestions">
            <div className="search-suggestions-1">
              {searchData && searchData.length ? searchData.map((search: any, index: any) => {
                return (
                  <button id={index}  key={index} onClick={handleWantedSearchData}>
                  <p >
                    {search?.name}, {search?.region}, {search?.country}
                  </p>
                  </button>
            
                );
                }) : null }
            </div>
          </div>
        </div>
        <ul>
            <li><a href="">Refresh</a></li>
            <li><a href="">Home</a></li>
            <li><a href="">Weather Map</a></li>
            <li><a href="">Settings</a></li>
            <li><a href="">About</a></li>
        </ul>
    </div>
  )
}

export default Nav