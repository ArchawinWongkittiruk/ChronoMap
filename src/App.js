import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Button } from '@material-ui/core';
import './App.css';
import years from './years';

const App = () => {
  const hint = 'Hover over any entity to display its name here.';
  const [year, setYear] = useState(-1);
  const [entity, setEntity] = useState(hint);

  const handleApiLoaded = (map, maps) => {
    const yearChosen = year > 0 ? year : `bc${-year}`;
    map.data.loadGeoJson(
      `https://raw.githubusercontent.com/aourednik/historical-basemaps/master/world_${yearChosen}.geojson`
    );
    map.data.addListener('click', (e) => {
      setEntity(e.feature.getProperty('NAME'));
    });
    map.data.addListener('mouseover', (e) => {
      setEntity(e.feature.getProperty('NAME'));
    });
    map.data.addListener('mouseout', () => {
      setEntity(hint);
    });
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  };

  return (
    <React.Fragment>
      <div className='top'>
        <h1>ChronoMap</h1>
        <p>Current Year: {year > 0 ? `${year} CE` : `${-year} BCE`}</p>
        <div>
          {years.map((year) => (
            <Button
              variant='outlined'
              key={year}
              color='primary'
              onClick={() => setYear(year)}
            >
              {year}
            </Button>
          ))}
        </div>
        <p>{entity}</p>
      </div>
      <div className='map'>
        <GoogleMapReact
          key={year}
          bootstrapURLKeys={{ key: 'AIzaSyCv2GYlbEmB0D2wHcc55phmBHWmtzKvQMI' }}
          defaultCenter={{ lat: 20, lng: 0 }}
          defaultZoom={1}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        />
      </div>
    </React.Fragment>
  );
};

export default App;
