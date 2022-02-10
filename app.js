// creation application express

// const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");

// create express to be exported to main file server we import a node named path
const path = require("path");

// to have acces to our file systeme we call
const app = express();

// call our router user in our app express

const userRoutes = require("./routes/user");

// call our router sauce in our app express

const sauceRoutes = require("./routes/sauces");

// const Thing = require("./models/thing");

mongoose
  .connect(
    "mongodb+srv://amin942:4dPssbMkswEUB8RF@cluster0.65q3o.mongodb.net/proj06?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// route post il faut recuperer  les infos d'une base de donner format json

app.use(express.json());

/*Ces headers permettent :

d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;

d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;

d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).*/

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  ); /*  "*" veut dire tout le monde peut acceder*/
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// our app.js manage also all files in request we need to used it
// we need to use a static file named images
app.use("/images", express.static(path.join(__dirname, "images")));
//save route user to be used by frontend developer
app.use("/api/auth", userRoutes);
// set endpoint sauce and router sauce to be used
app.use("/api/sauces", sauceRoutes);

// make it accessible from outside this file

module.exports = app;

// creation des routes get,post,put,delete

// to use post we change app.use to app.get et creer un autre midlware pour la methode post
//********************** start  function export it to controllers****************************/
// app.post("/api/stuff", (req, res, next) => {
//   delete req.body._id;
//   const thing = new Thing({
//     ...req.body,
//   });
//   thing
//     .save()
//     .then(() => res.status(201).json({ message: "Objet enregistré !" }))
//     .catch((error) => res.status(400).json({ error }));
// });

// app.put("/api/stuff/:id", (req, res, next) => {
//   Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then(() => res.status(200).json({ message: "Objet modifié !" }))
//     .catch((error) => res.status(400).json({ error }));
// });

// app.get("/api/stuff/:id", (req, res, next) => {
//   Thing.findOne({ _id: req.params.id })
//     .then((thing) => res.status(200).json(thing))
//     .catch((error) => res.status(404).json({ error }));
// });
// app.delete("/api/stuff/:id", (req, res, next) => {
//   Thing.deleteOne({ _id: req.params.id })
//     .then(() => res.status(200).json({ message: "Objet supprimé !" }))
//     .catch((error) => res.status(400).json({ error }));
// });
// app.get("/api/stuff", (req, res, next) => {
//   Thing.find()
//     .then((things) => res.status(200).json(things))
//     .catch((error) => res.status(400).json({ error }));
// });

//********************** end  function export it to controllers****************************/
// midle ware deleted just for understanding how it work
// app.use((req, res, next) => {
//   console.log("requete recue");
//   next();
// });
// // change status request
// app.use((req, res, next) => {
//   res.status(201);
//   next();
// });

// app.use((req, res, next) => {
//   res.json({ message: "requete en json" });
//   next();
// });

// //add another middleware
// // for the last one we dont need to call function next()
// app.use((req, res) => {
//   console.log("reponse recue avec succes");
// });

// // creation application express

// const express = require("express");
// const app = express();

// app.use((req, res, next) => {
//   console.log("requete recue");
//   next();
// });
// // change status request
// app.use((req, res, next) => {
//   res.status(201);
//   next();
// });

// app.use((req, res, next) => {
//   res.json({ message: "requete en json" });
//   next();
// });

// //add another middleware
// // for the last one we dont need to call function next()
// app.use((req, res) => {
//   console.log("reponse recue avec succes");
// });
// module.exports = app;
