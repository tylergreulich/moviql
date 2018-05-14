const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

const MovieImages = require('../models/moviePoster');

router.get('/', (req, res, next) => {
  MovieImages.find()
    .select('title moviePoster')
    .exec()
    .then(docs => {
      const response = {
        poster: docs.map(doc => {
          return {
            moviePoster: doc.moviePoster,
            _id: doc._id,
            request: {
              type: 'GET',
              url: 'http://localhost:4000/poster/' + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post('/', upload.single('moviePoster'), (req, res, next) => {
  const moviePoster = new MovieImages({
    _id: new mongoose.Types.ObjectId(),
    moviePoster: req.file.path
  });
  moviePoster
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Created product successfully',
        createdMoviet: {
          _id: result._id,
          title: result.title,
          imgUrl: result.imgUrl,
          request: {
            type: 'GET',
            url: 'http://localhost:4000/poster/' + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
