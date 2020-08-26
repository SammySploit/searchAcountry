import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
});

const App = () => {
  const classes = useStyles();
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState("");

  const handleSearch = (e) => {
    setSearchedCountry(e.target.value);
  };

  const filteredCountries = searchedCountry.toUpperCase();
  const countryToShow = countries.filter((country) => {
    return country.name.toUpperCase().indexOf(filteredCountries) > -1;
  });
  // console.log(searchedCountry);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      // console.log(response.data);
      setCountries(response.data);
    });
  }, []);
  // console.log(countries);
  return (
    <div className="bgimg">
    <div className="App">
      <div>
        <TextField
          id="standard-textarea"
          label="Search a Country"
          placeholder="Search"
          onChange={handleSearch}
          multiline
        />
      </div>{" "}
      <div className="show-countries">
        {countryToShow.length >= 250 ? (
          <font><b><p>Please enter a country to know about...</p></b></font>
        ) : countryToShow.length >= 20 ? (
          <font><b><p>Too many matches, please specify a bit more</p></b></font>
        ) : countryToShow.length === 1 ? (
          countryToShow.map((country) => {
            let populate = parseInt(country.population).toLocaleString();
            return (
              <div className = "card">
                <Card>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={country.flag}
                      title="Country Flag"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="h4">
                        {country.name}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        component="p"
                        className="cap"
                      >
                        Capital: {country.capital}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        component="p"
                        className="cap"
                      >
                        Population: {populate}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        component="p"
                        className="cap"
                      >
                        Languages:
                      </Typography>
                      {country.languages.map((lang) => {
                        return <li className="caps">{lang.name}</li>;
                      })}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            );
          })
        ) : countryToShow.map((country) => {
          return searchedCountry.length 
          ? <div>
            <Card onClick={() => setSearchedCountry(country.name)} key={country.name} className = "cards">
              <CardActionArea>
                <CardContent>
            <span onClick={() => setSearchedCountry(country.name)} key={country.name}>
              {country.name}
            </span>
            </CardContent>
            </CardActionArea>
            </Card>
          </div> 
          : <div></div>
        })}
      </div>
    </div>
  </div>
  );
};

export default App;
