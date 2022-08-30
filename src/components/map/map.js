import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles.js";
import "./otherStyles.css";
import hawkerData from "../../hawker-centres-kml.json";
// import hawkerDataKML from "./hawker-centres-kml.kml";
// import heart from "./heart.svg";
import compass from "./compass.svg";
import ReviewFeed from "../../pages/Posts";
import { NavLink } from "react-router-dom";

const heart =
  "https://www.freeiconspng.com/thumbs/heart-icon/heart-icon-14.png";

const libraries = ["places"];
const mapContainerStyle = {
  width: "80vw",
  height: "80vh",
};
const center = {
  lat: 1.3368848,
  lng: 103.8146355,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  // const onMapClick = React.useCallback((event) => {
  //   setMarkers((current) => [
  //     ...current,
  //     {
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //       time: new Date(),
  //     },
  //   ]);
  //   console.log(markers);
  // }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading Maps";

  // GoogleMap.data.loadGeoJson(hawkerData);
  // console.log(hawkerData.features);

  // var data = fetch({ hawkerData }).then(function (data) {
  //   console.log(data);
  // });

  // const autoCenterMap = ({ google }, map) => {
  //   this.loadGeoJson(map);
  // };

  // const loadGeoJson = async (map) => {
  //   const geojsonRoutes = await this.getRoutes(feed_code);
  //   const geojsonEnvelope = await this.getEnvelope(feed_code);
  //   map.data.addGeoJson(geojsonEnvelope);
  //   map.data.addGeoJson(geojsonRoutes); // # load geojson layer
  // };

  return (
    <div>
      {/* <h1>
        Must Eat{" "}
        <span role="img" aria-label="candy">
          🍬
        </span>
      </h1> */}

      <Search panTo={panTo} />
      <Locate panTo={panTo} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {hawkerData.map((item) => {
          return (
            <Marker
              key={item.Name}
              position={{
                lat: item.Y,
                lng: item.X,
              }}
              icon={{
                url: heart,
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              onClick={() => {
                setSelected(item);
                console.log(setSelected);
                console.log(selected);
                console.log(item);
              }}
            />
          );
        })}

        {selected ? (
          <InfoWindow
            onCloseClick={() => {
              setSelected(null);
            }}
            position={{
              lat: selected.Y,
              lng: selected.X,
            }}
          >
            {/* console.log(selected) */}
            <div>
              <h2>{selected.Name}</h2>
              <NavLink
                // className="navbar-item"
                // activeClassName="is-active"
                to="/posts"
                exact
              >
                View Reviews
              </NavLink>
              {/* <p>Added {formatRelative(selected.time, new Date())}</p> */}
            </div>
          </InfoWindow>
        ) : null}
        {/* {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>Nice Food</h2>
              <p>Added {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null} */}

        {/* //Do something with this layer or if not manually plot out*/}
        {/* <KmlLayer src={hawkerDataKML} /> */}
        {/* //Attempt at trying to extract out the coordinates for each hawker
        center //from the data.gov.sg geojson file */}
        {/* {hawkerData.features.map((hawkerData) => (
          <Marker
            key={hawkerData.features.properties.Name}
            position={{
              lat: hawkerData.features.geometry.coordinates[1],
              lng: hawkerData.features.geometry.coordinates[0],
            }}
            icon={{
              icon: { heart },
            }}
          />
        ))}{" "}
        // */}
        {/* {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: heart,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))} */}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src={compass} alt="compass-locate me" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 1.287953, lng: () => 103.851784 },
      radius: 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
