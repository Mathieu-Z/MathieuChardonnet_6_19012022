// in controllers/stuff.js

const Sauce = require('../models/sauce');

// publier une sauce
exports.createSauce = (req, res, next) => {
  const sauce = new Sauce({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  sauce.save()
    .then(() => {res.status(201).json({message: 'Sauce enregistrée !'})})
    .catch((error) => {res.status(400).json({error: error})});
};

// trouve toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {res.status(200).json(sauces)})
    .catch((error) => {res.status(400).json({error: error})})
};

// trouve une sauce selon sont id
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then((sauce) => {res.status(200).json(sauce)})
    .catch((error) => {res.status(404).json({error: error})});
};

// mise à jour d'une sauce
exports.modifySauce = (req, res, next) => {
  const sauce = new Sauce({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  Sauce.updateOne({_id: req.params.id}, sauce)
    .then(() => {res.status(201).json({message: 'Sauce modifiée !'})})
    .catch((error) => {res.status(400).json({error: error})});
};

// suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({_id: req.params.id})
    .then(() => {res.status(200).json({message: 'Sauce supprimée !'})})
    .catch((error) => {res.status(400).json({error: error})});
};