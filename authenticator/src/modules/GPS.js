const geodist = require('geodist')

export default class GPS {
  getPosition () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 20 * 1000
      })
    })
  }

  isInLabRadius (lab) {
    return this.getPosition().then(position => {
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

      return distance <= 15
    })
  }
}
