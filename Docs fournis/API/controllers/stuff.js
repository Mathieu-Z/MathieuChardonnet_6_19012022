const Sauce = require('../models/sauce');
const fs = require('fs');
const { error } = require('console');

// publier une sauce (POST)
exports.createSauce = (req, res, next) => {
  /*const sauce = new Sauce({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.body.userId
  });*/
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce ({...sauceObject, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`});
  sauce.save()
    .then(() => res.status(201).json({message: 'Sauce enregistrée !'}))
    .catch((error) => res.status(400).json({ error }));
};

// trouve toutes les sauces (GET)
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => {res.status(200).json(sauces)})
    .catch(error => {res.status(400).json({ error })})
};

// trouve une sauce selon sont id (GET)
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => {res.status(200).json(sauce)})
    .catch(error => {res.status(404).json({ error })});
};

// mise à jour d'une sauce (PUT)
exports.modifySauce = (req, res, next) => {
  /*const sauce = new Sauce({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.body.userId
  });*/
  const sauceObject = req.file ?
    {...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : { ...req.body };
  Sauce.updateOne({_id: req.params.id}, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(201).json({message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

// suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`ìmages/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
        .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// likes et dislikes (POST)
exports.likes = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
    .then(sauce => {

    })
    .catch(error => res.status(403).json({ error }));
}