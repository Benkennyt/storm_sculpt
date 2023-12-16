import React from 'react';
import './Settings.css'

const Settings = (props: any) => {
  const {tempIsToggled, onToggleTemp,windIsToggled, onToggleWind,visIsToggled, onToggleVis, settingsClicked} = props
  return (
    <div className={settingsClicked ? 'settings-container' : 'settings-container-hidden'}>
      <h2 className={settingsClicked ? 'h2h-hidden' : ''}>Units</h2>

      <div className="all-switch">
        <div className='switch'>
            <div className="switch-for">
              <h3>Temperature</h3>
            </div>
          <input type="checkbox" checked={tempIsToggled} onChange={onToggleTemp} id='temp-toggled' />
          <label htmlFor="temp-toggled">
          <div className='switch-btn-name'>
            <div className='name-dv'>
              <h3>Celicus</h3>
            </div>
            <div className='name-dv'>
              <h3>Fahrenheit</h3>
            </div>
          </div>
          </label>
        </div>   

        <div className='switch'>
            <div className="switch-for">
              <h3>Wind</h3>
            </div>
          <input type="checkbox" checked={windIsToggled} onChange={onToggleWind}  id='wind-toggled'/>
          <label htmlFor="wind-toggled">
          <div className='switch-btn-name'>
            <div className='name-dv'>
              <h3>kph</h3>
            </div>
            <div className='name-dv'>
              <h3>mph</h3>
            </div>
          </div>
          </label>
        </div>  

        <div className='switch'>
            <div className="switch-for">
              <h3>Visibility</h3>
            </div>
          <input type="checkbox" checked={visIsToggled} onChange={onToggleVis} id='vis-toggled'/>
          <label htmlFor="vis-toggled">
          <div className='switch-btn-name'>
            <div className='name-dv'>
              <h3>km</h3>
            </div>
            <div className='name-dv'>
              <h3>miles</h3>
            </div>
          </div>
          </label>
        </div>  

        
      </div>
    </div>
  )
}

export default Settings