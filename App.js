import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SearchInput from './components/SearchInput';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      location : 'Ho Chi Minh city',
    }
  }

  changeLocation = city => {
    this.setState( {location: city});
  }

  render() {
    const {location} = this.state;
    return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcome}>{location}</Text>
      </View>

      <SearchInput 
      placeholder = "Type any text and see the change"
      onSubmit={this.changeLocation}/>

    </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
