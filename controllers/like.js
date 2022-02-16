// // logic front end send a request  with userId and likes or dislikes
// // if like =1 than likes =1 and if like =-1 than dislikes = +1

// // import models BDD from file models
const Sauce = require("../models/sauces");

exports.sauceLiked = (req, res, next) => {
  // console.log("je suis dans le controlleur like");

  // get req.body
  /*request must sending in body raw (postman) json format
// {
//   "userId":"",
//   "like":
// }
*/

  // console.log(req.body)
  // get id from request url

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      //like = 1( likes = +1)
      // if userliked == flase & like === 1
      if (!sauce.usersLiked.includes(req.body.userId) && req.body.likes === 1) {
        // req.body.userId== reslut of promise ;
        // req.body.lik9e == request front end
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 }, // operateur MDB pour assigner
            $push: { usersLiked: req.body.userId }, // operateur db pour assigner user id to userliked
          }
        )
          .then(() => res.status(200).json({ message: "sauce aimé +1" }))
          .catch((error) => res.status(400).json({ error }));
      }
      //like = 0( likes = 0 , pas de j'aime)
      //if userID is in userliked and likes ==0 than delete the userliked
      if (sauce.usersLiked.includes(req.body.userId) && req.body.likes === 0) {
        // req.body.userId== reslut of promise ;
        // req.body.lik9e == request front end
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 }, // operateur MDB pour assigner
            $pull: { usersLiked: req.body.userId }, // operateur db pour delete user id to userliked
          }
        )
          .then(() => res.status(200).json({ message: "sauce aimé 0" }))
          .catch((error) => res.status(400).json({ error }));
      }
      //like = -1( dislikes = +1)
      if (
        !sauce.usersDisLiked.includes(req.body.userId) &&
        req.body.likes === -1
      ) {
        // req.body.userId== reslut of promise ;
        // req.body.lik9e == request front end
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 }, // operateur MDB pour assigner
            $push: { usersDisLiked: req.body.userId }, // operateur db pour delete user id to userliked
          }
        )
          .then(() => res.status(200).json({ message: "sauce dislike +1" }))
          .catch((error) => res.status(400).json({ error }));
      }
      //after like =-1 , like become to 0 and we remove the dislike
      if (
        sauce.usersDisLiked.includes(req.body.userId) &&
        req.body.likes === 0
      ) {
        // req.body.userId== reslut of promise ;
        // req.body.lik9e == request front end
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: -1 }, // operateur MDB pour assigner
            $pull: { usersDisLiked: req.body.userId }, // operateur db pour delete user id to userliked
          }
        )
          .then(() => res.status(200).json({ message: " sauce dislike 0" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    // uilsation de la methode javascript includes()
    // use $inc operator (MDB)
    // use $push operator (MDB)
    // use $pull operator (MDB)

    // res.status(200).json(sauce)
    .catch((error) => res.status(404).json({ error }));
};
/*POST: To deal with the likes or dislikes of the created sauces
if like is = 1 the sauce is liked, if is = -1 is disliked. The count of the users likes are in an array */
// exports.sauceLiked = (req, res, next) => {
//   Sauce.findOne({ _id: req.params.id }).then((sauce) => {
//     // to see if our user is in the array
//     const userLikedIndex = sauce.usersLiked.indexOf(req.body.userId);
//     //if our user liked the sauce, it will be find in the array, therefore is !== -1
//     const userLiked = userLikedIndex !== -1;
//     const userDislikedIndex = sauce.usersDisliked.indexOf(req.body.userId);
//     const userDisliked = userDislikedIndex !== -1;

//     if (req.body.like === 1 && !userLiked) {
//       //if the user has not liked the sauce yet and is going to
//       sauce.likes++;
//       sauce.usersLiked.push(req.body.userId);
//       if (userDisliked) {
//         //if the user had a dislike on the sauce
//         sauce.dislikes--;
//         sauce.usersDisliked.splice(userDislikedIndex, 1);
//       }
//     } else if (req.body.like === -1 && !userDisliked) {
//       //if the user has not dislike the sauce yet and is going to
//       sauce.dislikes++;
//       sauce.usersDisliked.push(req.body.userId);
//       if (userLiked) {
//         //if the user had a liked on the sauce
//         sauce.likes--;
//         sauce.usersLiked.splice(userLikedIndex, 1);
//       }
//     } else if (req.body.like === 0) {
//       //cancel our like or dislike
//       if (userDisliked) {
//         //if the user had a dislike on the sauce
//         sauce.dislikes--;
//         sauce.usersDisliked.splice(userDislikedIndex, 1);
//       } else if (userLiked) {
//         //if the user had a liked on the sauce
//         sauce.likes--;
//         sauce.usersLiked.splice(userLikedIndex, 1);
//       }
//     }
//     Sauce.updateOne({ _id: req.params.id }, sauce)
//       .then(() => {
//         res.status(201).json({
//           message: `Mention j'aime modifiée`,
//         });
//       })
//       .catch((error) => {
//         res.status(400).json({
//           error: error,
//         });
//       });
//   });
// }
