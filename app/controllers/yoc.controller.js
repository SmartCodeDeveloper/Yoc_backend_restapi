const Yoc = require("../models/yoc.model.js");
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a Tutorial
    const yoc = new Yoc({
      pro_id: req.body.pro_id,
      pro_name: req.body.pro_name,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      ongoing: req.body.ongoing || false,
      claim: req.body.claim || false,
      refund: req.body.refund || false
    });

    // Save Tutorial in the database
    Yoc.create(yoc, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      else res.send(data);
    });
};

exports.findOne = (req, res) => {
  Yoc.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found project with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving project with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);

  Yoc.updateById(
    new Yoc(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found project with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating project with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
}

exports.delete = (req, res) => {
  Yoc.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found project with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete project with id " + req.params.id
        });
      }
    } else res.send({ message: `Project was deleted successfully!` });
  });
};