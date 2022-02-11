const Sauce = require("../models/sauces");
// import file systeme to delete file in like our file images
const fs = require("fs"); // systeme interne de node

exports.createSauce = (req, res, next) => {
  // after req of file ==> req.body.sauce after request is a string we need to parse it to objet
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id; //replace req.body with sauceObject we dont need to save an id because mdb generate an id ==> a revoir dans le cour
  const sauce = new Sauce({
    ...sauceObject,
    // our mutler manage our file image and the front end didnt know wich url to use
    // we can use req.file.filename from file system but he didn't know in production where is our image ==>
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    // imageUrl:"http or https"://3000 or another / images/ filename of the image
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "sauce enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  // check if the file exist or not ,if we have a file we give our string and parse it to object and we change imageUrl if not we take the body request
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    {
      ...sauceObject,
      _id: req.params.id,
    }
  )
    .then(() =>
      res.status(200).json({
        message: "sauce modifié !",
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
  // before delete object from our database we need to know his URL
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split("/images/")[1]; // url/images/namefile.jpg ==> we need the name of file to delete it
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => {
          //delete sauce
          res.status(200).json({
            message: "sauce supprimé!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    });
  });

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
    // to delete it we move this one to our callaback fs.unlink
    // Sauce.deleteOne({ _id: req.params.id })
    //   .then(() => {
    //     //delete sauce
    //     res.status(200).json({
    //       message: "sauce supprimé!",
    //     });
    //   })
    //   .catch((error) => {
    //     res.status(400).json({
    //       error: error,
    //     });
    //   });
  });
};
