import React, { useEffect, useState } from "react";
import './Nav.css';
import { LogoCloudIcon, SettingsIcon } from '../../assets/icons/SVG';
import { fetchRealTimeWeather, fetchSearchAutoComplete} from "../../app/api/apiSlice2";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/stores/store";
import { getValue } from "@testing-library/user-event/dist/utils";
import { eventNames } from "process";

const Nav = (props: any) => {
  const [search, setSearch] = useState('')
  const {setSettingsClicked, settingsClicked} = props
  const [ID, setID] = useState('')
  const dispatch = useAppDispatch()
  const {data, isSearchLoading, isRealTWLoading} = useSelector((state:any) => state.WeatherDetails)
  const searchData = data?.searchdata
  const realTdata = data.realTimedata

  useEffect(() => {
    if (ID && searchData) {
      dispatch(fetchRealTimeWeather(`${searchData[ID].name} ${searchData[ID].region} ${searchData[ID].country}`))
    }
  }, [ID])

  const handleChange = (event: { target: { value: any; }; }) => {
    setSearch(event.target.value)

    if(search != '') {
      dispatch(fetchSearchAutoComplete(search))
    }

    if(ID != '') {
      setID('')
    }

  }

  const handleWantedSearchData = (event: any) => {
    setID(event.currentTarget.id)
    setSearch('')

  }

  const handleSettingsButton = () => {
    if(settingsClicked) {
      setSettingsClicked(false)
    } else {
      setSettingsClicked(true)
    }
  }

  
  
  console.log(search)

  return (
    <div className='navbar'>
        <div className="logo">
            <h1>StormSculpt</h1>
            <LogoCloudIcon/>
        </div>
        <div className="search-bar-container">
          <input onChange={handleChange} value={search} className='search-bar' type="text" placeholder='Find Weather for...'/>
          <div className="search-suggestions">
            <div className={search === '' ? 'search-suggestion-1-hiddden' :"search-suggestions-1"}>
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
        <div className="settings-btn">
          <button onClick={handleSettingsButton}>
            <SettingsIcon/>
          </button>
        </div>
        
    </div>
  )
}

export default Nav