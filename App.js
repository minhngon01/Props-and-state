import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import SearchInput from './components/SearchInput';
//import {fetchLocationId, fetchWeather} from './utils/api';

export const fetchLocationId = async city => {
  const response = await fetch(
    `https://www.metaweather.com/api/location/search/?query=${city}`,
  );
  const locations = await response.json();
  return locations[0].woeid;
};

export const fetchWeather = async woeid => {
  const response = await fetch(
    `https://www.metaweather.com/api/location/${woeid}/`,
  );
  const { title, consolidated_weather } = await response.json();
  const { weather_state_name, the_temp } = consolidated_weather[0];

  return {
    location: title,
    weather: weather_state_name,
    temperature: the_temp,
  };
};

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading:false,
      error:false,
      location: '',
      temperature:0,
      weather:'',
    };
  }

  changeLocation = async city => {
    if(!city) return;

    this.setState({loading: true}, async () =>{
      try{
        const locationID = await fetchLocationId(city);
        const {location, weather, temperature} = await fetchWeather(
          locationID,
        );

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };

  componentDidMount(){
    this.changeLocation('Ho Chi Minh City');
  }

  render() {
    const { loading, error, location, weather, temperature } = this.state;
    return (

    <View style={styles.container}>
      <ActivityIndicator animating={loading} color="black " size="large" />
      {!loading && (
        <View style={styles.textContainer}>
          {error && (
            <Text style={styles.textNStyle}> Could not load weather information</Text>
          )}
      

          {!error && (
            <View  style={styles.textContainer}>
              <Text style={styles.textStyle}>{location}</Text>
              <Text style={styles.textStyle}>{weather}</Text>
              <Text style={styles.textStyle}>{temperature}°</Text>
            </View>
          )}  
      

      <SearchInput 
      placeholder = "Search city"
      onSubmit={this.changeLocation}/>

    </View>
      )}
  </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  textContainer:{
    alignItems: 'center',
  },
  textNStyle:{
    color: 'white',  
    fontSize: 15,
  },
  textStyle:{
    fontSize: 25,
    color: 'white',
  }
});
