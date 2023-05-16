const Traveller = require('./Traveller');
const Location = require('./Location');
const Trip = require('./Trip');

Traveller.belongsToMany(Location, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Trip,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'planned_trips'
});

Location.belongsToMany(Traveller, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Trip,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'location_travellers'
});

Trip.belongsTo(Traveller, {
  foreignKey: 'traveller_id'
});

Trip.belongsTo(Location, {
  foreignKey: 'location_id'
});

Traveller.hasMany(Trip, {
  foreignKey: 'traveller_id'
});

Location.hasMany(Trip, {
  foreignKey: 'location_id'
});

module.exports = { Traveller, Location, Trip };
