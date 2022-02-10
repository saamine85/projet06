const Sauce = require("../models/sauces");

exports.createSauce = (req, res, next) => {
  delete req.body._id;
  const sauce = new Sauce({
    ...req.body,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  Sauce.updateOne(
    {
      _id: req.params.id,
    },
    {
      ...req.body,
      _id: req.params.id,
    }
  )
    .then(() =>
      res.status(200).json({
        message: "Objet modifié !",
      })
    )
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  // verif if the user whowant to do a request is the same user that we athentify with our database
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce) {
      return res.status(404).json({
        error: new Error("Sauce non trouvé !"),
      });
    }
    if (sauce.userId !== req.auth.userId) {
      return res.status(401).json({
        error: new Error("requête non autorisé"),
      });
    }
    // after matching userid with our data base we can produce to response to request delete
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => {
        //delete sauce
        res.status(200).json({
          message: "Deleted!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
};
