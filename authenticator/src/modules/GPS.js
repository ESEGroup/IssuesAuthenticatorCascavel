const geodist = require('geodist')

export default class GPS {
  getPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10 * 1000,
        maximumAge: 60 * 1000
      })
    })
  }

  isInLabRadius(lab) {
    return this.getPosition().then(position => {
      const user = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
      const lab = {
        lat: lab.latitude,
        lon: lab.longitude
      }
      const distance = geodist(user, lab, {
        unit: 'meters',
        exact: true
      })

      return distance <= 15
    })
  }
}
