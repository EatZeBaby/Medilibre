/* eslint-disable no-unused-vars */

const Parameter = require('../models/parameter');

// method to create parameter
exports.createParameter = (req, res, next) => {
  const parameter = new Parameter({
    slug: req.body.slug,
    value: req.body.value,
  });
  parameter.save().then(
    () => {
      res.status(201).json({
        parameter,
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// method to get one parameter
exports.getOneParameter = (req, res, next) => {
  Parameter.findOne({
    _id: req.params.id
  }).then(
    (parameter) => {
      res.status(200).json(parameter);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// method to modify parameter
exports.modifyParameter = (req, res, next) => {
  const parameter = new Parameter({
    _id: req.params.id,
    slug: req.body.slug,
    value: req.body.value,
  });
  Parameter.updateOne({_id: req.params.id}, parameter).then(
    () => {
      res.status(201).json({
        parameter,
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// method to delete parameter
exports.deleteParameter = (req, res, next) => {
  Parameter.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllParameters = (req, res, next) => {
  Parameter.find().then(
    (parameters) => {
      res.status(200).json(parameters);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};