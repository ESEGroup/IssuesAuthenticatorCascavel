import RNSettings from 'react-native-settings'
const geodist = require('geodist')
const RNALocation = require('react-native-android-location')
const { DeviceEventEmitter } = require('react-native')

export default class GPS {
  async isEnabled () {
    const result = await RNSettings.getSetting(RNSettings.LOCATION_SETTING)

    return result === RNSettings.ENABLED
  }

  getPosition () {
    return new Promise((resolve, reject) => {
      DeviceEventEmitter.addListener('updateLocation', (e) => {
        resolve({
          coords: {
            latitude: e.Latitude,
            longitude: e.Longitude
          }
        })
      })

      RNALocation.getLocation()
    })
  }

  isInLabRadius (lab, position) {
    const userPosition = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    const labPosition = {
      lat: lab.latitude,
      lon: lab.longitude
    }
    const distance = geodist(userPosition, labPosition, {
      unit: 'meters',
      exact: true
    })

    return distance <= 20
  }
}
