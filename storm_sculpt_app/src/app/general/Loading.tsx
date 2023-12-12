import React from 'react';
import './Loading.css'
import { LoadingCloudIcon } from '../../assets/icons/SVG';

const Loading = () => {
  return (
    <div className="loading">
        <div className="loading2">
            <LoadingCloudIcon/>
            <h2>Loading...</h2>
        </div>
    </div>
  )
}

export default Loading