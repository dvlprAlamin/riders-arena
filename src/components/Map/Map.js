import React from 'react';
import ReactMapGL from 'react-map-gl';

const Map = () => {
    const [viewport, setViewport] = React.useState({
        latitude: 23.68764,
        longitude: 90.351002,
        zoom: 8
      });
    
      return (
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          mapboxApiAccessToken='pk.eyJ1IjoiZHZscHJhbGFtaW4iLCJhIjoiY2ttZ3F6NDh0MDAyaTJwdG53MXl3NGQwZiJ9.JF04VTFHZ7CEumAvZT1JOw'
          onViewportChange={(viewport) => setViewport(viewport)}
        />
      );
};

export default Map;