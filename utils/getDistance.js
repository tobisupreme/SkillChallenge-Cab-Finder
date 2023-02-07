function getDistanceFromLatLonInKm(locationData) {
  const {
    start_coord_long,
    start_coord_lat,
    destination_coord_long,
    destination_coord_lat,
  } = locationData

  var R = 6371 // Radius of the earth in km
  var dLat = deg2rad(destination_coord_lat - start_coord_lat) // deg2rad below
  var dLon = deg2rad(destination_coord_long - start_coord_long)
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(start_coord_lat)) *
      Math.cos(deg2rad(destination_coord_lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in km
  return d
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

module.exports = { getDistanceFromLatLonInKm }
