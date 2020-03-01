import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import { listLogEntries } from './API';

 const App = () => {
   const [logEntries, setLogEntries ] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 54.969502,
    longitude: -1.5486113,
    zoom: 2
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);


  return (
    <ReactMapGL 
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MapBoxAccessToken}
      mapStyle='mapbox://styles/geordiecoder/ck7967mwk23no1ipls8fav7ci'
      onViewportChange={setViewport}
    >
      {
        logEntries.map(entry => (
          
          <Marker 
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude} 
            offsetLeft={-20} 
            offsetTop={-10}
          >
          <div>{entry.title}</div>
          </Marker>
            
          
          
        ))
      }
    </ReactMapGL>
  );
}

export default App;