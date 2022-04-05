import getCenter from 'geolib/es/getCenter'
import { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

const Map = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState({})
  const coords = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }))

  const center = getCenter(coords)

  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
    width: '100%',
    height: '100%',
  })
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/saifn97/cl1kp98zz000a15p2vjg8w84y"
      mapboxApiAccessToken={process.env.mapbox_key}
      width="100%"
      height="100%"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              onClick={() => setSelectedLocation(result)}
              className="animate-bounce cursor-pointer text-2xl"
              aria-label="push-pin"
            >
              📍
            </p>
          </Marker>

          {selectedLocation.long === result.long && (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              <div className="z-50">{result.title}</div>
            </Popup>
          )}
        </div>
      ))}
    </ReactMapGL>
  )
}

export default Map
