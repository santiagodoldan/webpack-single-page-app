require("font-awesome-webpack")

// Configure storage adapter

const { RideInGroups } = require("./interfaces")
const { Storage } = require("./lib/storage")
const { LocalStorageAdapter } = require("./lib/storages")
const { Biker } = require("./models/biker")

Storage.getInstance().adapter = new LocalStorageAdapter()

/**
 * Create fake data if no bikers available
 */
if (!Biker.findAll().length) {
  const biker1 = new Biker({
    name: "James Isaac Neutro",
    email: "neutron@example.com",
    city: "City",
    rideInGroups: RideInGroups.Always,
    frequency: [0, 1, 2, 3, 4, 5, 6],
    createdAt: new Date(),
  })

  const biker2 = new Biker({
    name: "Carl Wheezer",
    email: "carl@example.com",
    city: "City",
    rideInGroups: RideInGroups.Sometimes,
    frequency: [1, 2, 3, 4, 5],
    createdAt: new Date(),
  })

  const biker3 = new Biker({
    name: "Cindy Vortex",
    email: "cindyvortex@example.com",
    city: "City",
    rideInGroups: RideInGroups.Never,
    frequency: [1, 3, 5],
    createdAt: new Date(),
  })

  biker1.save()
  biker2.save()
  biker3.save()
}

// Initialize all components

require("./components")
