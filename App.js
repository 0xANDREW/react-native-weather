import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  KeyboardAvoidingView,
  Switch
} from 'react-native';

import OpenWeatherApi from './open-weather-api'

export default class App extends React.Component {
  ICON_SIZE = 128
  ZIP_LEN = 5
  API_KEY_LEN =  32

  constructor(){
    super()

    this.state = {
      name: null,
      temp: null,
      desc: [],
      isMetric: true,
      icon: null,
      zip: '91020',
      apiKey: '3858cb328830337e7a05271a6922d52b'
    }

    this.getWeather()
  }

  async getWeather(){
    if (!this.checkConf()){
      return
    }

    var data = await OpenWeatherApi.currentWeather({
      zip: this.state.zip,
      apiKey: this.state.apiKey,
      units: this.state.isMetric ? 'metric': 'imperial'
    })

    this.setState({
      name: data.name,
      temp: data.main.temp,
      desc: data.weather.map(d => d.description),
      icon: data.weather[0].icon
    })
  }

  checkConf(){
    return this.state.zip.length == this.ZIP_LEN
      && this.state.apiKey.length == this.API_KEY_LEN
  }

  degUnit(){
    return this.state.isMetric ? 'C': 'F'
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    this.getWeather()
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text>{this.state.name}</Text>
        <Text>{this.state.temp}&deg;{this.degUnit()}</Text>
        <Text>{this.state.desc.join(', ')}</Text>
        <Image 
          source={{uri: OpenWeatherApi.getIconUrl(this.state.icon)}}
          style={{width: this.ICON_SIZE, height: this.ICON_SIZE}}
        />
        <TextInput
          value={this.state.zip}
          style={styles.textInput}
          onChangeText={text => this.setState({zip: text})}
          textContentType='postalCode'
          keyboardType='number-pad'
        />
        <Switch
          value={this.state.isMetric}
          onValueChange={v => this.setState({isMetric: v})}
        />

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInput: {
    backgroundColor: '#ddd',
    fontSize: 30
  }
});
