const wifi = require('react-native-android-wifi')

export default class WiFi {
  getWifiList () {
    return new Promise((resolve, reject) => {
      wifi.loadWifiList(wifiStringList => {
        resolve(JSON.parse(wifiStringList))
      }, reject)
    })
  }

  enableWifi () {
    wifi.setEnabled(true)
  }

  disableWifi () {
    wifi.setEnabled(false)
  }

  isInLabRadius (lab) {
    return this.getWifiList()
      .then(list => {
        const scannedWifi = list.find(l => l.SSID === lab.ssid)

        if (!scannedWifi) return false

        return scannedWifi.level > -67
      })
  }
}
