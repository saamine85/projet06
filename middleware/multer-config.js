// middleware pour gerer les fichiers entrants

// call multer plugin

const multer = require("multer");

// possible extension to use in our files

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// create object to configure multer
// function diskStorage means that we want to save a file in the disk
const storage = multer.diskStorage({
  // in wich destination we want to save it
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  //wich file to use
  filename: (req, file, callback) => {
    // generate new name for the file
    // acces to our original file
    // eliminate white space from name files and replace it with underscore( join name with undersccore)
    const name = file.originalname.split(" ").join("_");
    // create extension file // sending file mimetype by front end
    const extension = MIME_TYPES[file.mimetype];
    // callback and create file name + time stump( make our file unique)
    callback(null, name + Date.now() + "." + extension);
  },
});

// export middlware contain unique file called image with name path storage
module.exports = multer({ storage: storage }).single("image"); //({ storage: storage })==({ storage })
