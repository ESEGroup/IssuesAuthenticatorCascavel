const geodist = require('geodist')

export default class GPS {
  getPosition () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
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

    console.log(distance)

    return distance <= 20
  }
}
