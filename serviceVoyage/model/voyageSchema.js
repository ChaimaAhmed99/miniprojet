const mongoose=require('mongoose');

const voyageSchema = new mongoose.Schema({
    heureDepart: String,
    lieuDepart: String,
    destination: String,
    placesDisponibles: Number,
  });

  const voyage = mongoose.model('voyage', voyageSchema);

  module.exports= voyage;