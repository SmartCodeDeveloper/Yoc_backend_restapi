const Ysbet = require("../models/ysbet.model.js");
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a Tutorial
    const ysbet = new Ysbet({
      investor_address: req.body.investor_address,
      token_amount: req.body.token_amount,
      claim: req.body.claim || false,
      refund: req.body.refund || false
    });

    // Save Tutorial in the database
    Ysbet.create(ysbet, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      else res.send(data);
    });
};

exports.findOne = (req, res) => {
  Ysbet.findByAddress(req.params.address, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found project with id ${req.params.address}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving project with id " + req.params.address
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

  Ysbet.updateByAddress(
    new Ysbet(req.body),
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
  Ysbet.remove(req.params.address, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found project with id ${req.params.address}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete project with id " + req.params.address
        });
      }
    } else res.send({ message: `Project was deleted successfully!` });
  });
};