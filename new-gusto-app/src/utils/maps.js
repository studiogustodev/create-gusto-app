export const calcDistance = (lat1, lon1, lat2, lon2, unit = 'K') => {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0
  }
  const radlat1 = (Math.PI * lat1) / 180
  const radlat2 = (Math.PI * lat2) / 180
  const theta = lon1 - lon2
  const radtheta = (Math.PI * theta) / 180
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  if (dist > 1) dist = 1
  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = (dist * 60) * 1.1515
  if (unit === 'K') dist *= 1.609344
  if (unit === 'N') dist *= 0.8684
  return dist
}

/* global google */
export const codeLatLng = (lat, lng) => {
  const latLng = new google.maps.LatLng(lat, lng)
  const geocoder = new google.maps.Geocoder()
  geocoder.geocode({ latLng }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
      window.console.log(results)
      let city
      if (results[1]) {
        // formatted address
        // find country name
        for (let i = 0; i < results[0].address_components.length; i += 1) {
          for (let b = 0; b < results[0].address_components[i].types.length; b += 1) {
            // there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
            if (results[0].address_components[i].types[b] === 'administrative_area_level_1') {
              // this is the object you are looking for
              city = results[0].address_components[i]
              window.console.log('city ---->', city)
            }
          }
        }
      }
    }
  })
}
