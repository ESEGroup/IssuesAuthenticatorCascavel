import WiFiModule from './WiFi'
import GPSModule from './GPS'
import API from '../api'

const WiFi = new WiFiModule()
const GPS = new GPSModule()

export default async (user) => {
  const { userId, labs } = user

  const position = await GPS.getPosition()
  const wifiList = await WiFi.getWifiList()

  console.log(position)
  console.log(wifiList)

  return Promise.all(
    labs.map(lab => {
      const { labId } = lab
      const isInsideGPS = GPS.isInLabRadius(lab, position)

      console.log(labId)
      console.log(isInsideGPS)

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
