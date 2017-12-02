import WiFiModule from './WiFi'
import GPSModule from './GPS'
import API from '../api'

export default class Monitor {
  constructor () {
    this.GPS = new GPSModule()
    this.WiFi = new WiFiModule()
  }

  async shouldAuthenticateUser () {
    return this.GPS.isEnabled()
  }

  async authenticateUser (user) {
    const { userId, labs } = user
    const { GPS, WiFi } = this

    const position = await GPS.getPosition()
    const wifiList = await WiFi.getWifiList()

    return Promise.all(
      labs.map(lab => {
        const { labId } = lab
        const isInsideGPS = GPS.isInLabRadius(lab, position)

        if (isInsideGPS) {
          const isInsideWiFi = WiFi.isInLabRadius(lab, wifiList)

          if (isInsideWiFi) {
            return lab.present
              ? null
              : API.registerEnter({ userId, labId })
          }

          return null
        }

        return lab.present
          ? API.registerExit({ userId, labId })
          : null
      })
    )
  }
}
