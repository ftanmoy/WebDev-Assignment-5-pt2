import { useState, useEffect } from "react";
import axios from 'axios';
import { City } from "./components/City";
import './App.css';

function App() {
  const [cityName, setCityName] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
        if (cityName === "") return;

        let linkToAPI = "https://ctp-zip-api.herokuapp.com/city/" + cityName;

        let splitCity = cityName.toLowerCase().split(' ');
        for(var i = 0; i < splitCity.length; i++) {
          splitCity[i] = splitCity[i].charAt(0).toUpperCase() + splitCity[i].substring(1);
        }
        let capitalizeCity = splitCity.join(' ');

        try {
          let response = await axios.get(linkToAPI);
          setCities(response.data);
        } catch (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
          }
        }
      };
      handleSearch();
    }, [cityName]);

    const generateCities = () => {
      return cities.map((city) => {
        return <City key={city.RecordNumber} {...city} />;
      });
    };

    const handleChange = (e) => {
      // TODO: if input is not valid, print no results
      //       reset the output if the input is changed after a successful search
      setCityName(e.target.value)
    }

  return (
    <div id="content-wrapper">
      <div id="header">
        <div id="header-text">
          <h1>Zip Code Search</h1>
        </div>
      </div>
        <div id="search-box">
          <label>
            Enter Zipcode:
          </label>
          <input className="search-box-field" placeholder="Enter a zipcode!" type="text" onChange={handleChange} />
      </div>
      {generateCities()}
    </div>
  );
}

export default App;
