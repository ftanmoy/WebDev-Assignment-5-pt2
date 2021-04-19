import { useState, useEffect } from "react";
import axios from 'axios';
import { City } from "./components/City";
import './App.css';

function App() {
  const [cityName, setCityName] = useState("");
  const [input, setInput] = useState("");
  const [cities, setCities] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
    const handleSearch = async () => {
        if (cityName === "") return;

        //creating a link to call the api
        let linkToAPI = "https://ctp-zip-api.herokuapp.com/city/" + cityName;

        try {
            //calling api
          let response = await axios.get(linkToAPI);
          //storing the response
            setCities(response.data);

        } catch (error) {
          if (error.response) {
              //creating a child element to show the error message.
              setError(error);
              var para = document.createElement('P');
              para.id = 'P'
              para.innerHTML = 'Ooooppps ... ZipCode for city "' + cityName + '"  was ' + error.response.data + " : "
                  + error.response.status;
              return document.getElementById("results").appendChild(para);
          }
        }
      };

      handleSearch();
    }, [cityName]);

    //displaying the response to the user in readable format
    const generateCities = () => {
       return  <City key={cities.length} value={cities}/>;
    };

    //collecting all characters until user hits enter to call the api in search()
    const handleChange = (e) => {
        setInput(e.target.value);
        //resetting city so the page is reset and setting all user input characters to capital case and saving it.
        setCities([]);
        setCityName("");


    }

    // searching will reset all existing values and only hit the api once the user hits enter
    const search = () => {
        if( error !== '' && input !== ''){
            var lastElement =  document.getElementById('P');
            document.getElementById("results").removeChild(lastElement);
            setError("");
        }

        setCityName(input.toUpperCase());
        
    }
    //user has to press enter to see results.

  return (
    <div id="content-wrapper">
      <div id="header">
        <div id="header-text">
          <h1>Find the Zipcode for Your City</h1>
        </div>
      </div>
        <div id="search-box">
          <label>
            Enter City:
          </label>
          <input className="search-box-field" placeholder="Enter a City!" type="text" onChange={handleChange}
                 onKeyPress={event => {
              if (event.key === 'Enter') {
                  search()
              }
          }}/>
      </div>
        <div id="results">
      {generateCities()}
    </div>
    </div>
  );
}

export default App;
