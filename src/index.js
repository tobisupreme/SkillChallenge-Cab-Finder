const { locations, rides, rideServices } = require('../utils/parseData')
const { getDistanceFromLatLonInKm } = require('../utils/getDistance')

/**
 * @param locations[]
 * @param rideServices[]
 * @param rides[]
 * @returns [{ ride, ridePrice }]
 */
function getRidePrice(locations, rideServices, rides) {
  const result = []
  rides.forEach((ride) => {
    const locationData = locations.find(
      (location) => location.location_id === ride.location_id
    )
    const distance = getDistanceFromLatLonInKm(locationData)
    const { priceperkm, rideservice_name } = rideServices.find(
      (rideService) => rideService.rideservice_id === ride.rideservice_id
    )
    const totalPrice = Math.round(distance * priceperkm)
    result.push({
      rideService: rideservice_name,
      rideDescription: locationData.location_description,
      rideDistance: distance,
      totalPrice: totalPrice,
    })
  })

  return result
}

function cheapestRide(locations, rideServices, rides) {
  const rideData = getRidePrice(locations, rideServices, rides);
  rideData.map((ride) => {
    ride.pricePerKm = ride.totalPrice / ride.rideDistance
    return ride
  })
  const t = rideData.map(data => data.pricePerKm)
  const lowest = Math.min.apply(null, t)
  return rideData.find(data => data.pricePerKm === lowest)
}

module.exports = {
  getRidePrice,
  cheapestRide
}

