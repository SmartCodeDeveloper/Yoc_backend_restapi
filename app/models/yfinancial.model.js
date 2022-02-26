const sql = require("./db.js");
// constructor
const Yfinancial = function(data) {
  this.investor_address = data.investor_address;
  this.token_amount = data.token_amount;
  this.claim = data.claim;
  this.refund = data.refund;
};

Yfinancial.create = (data, result) => {
    sql.query("INSERT INTO yfinancial SET ?", data, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created project: ", { id: res.insertId, ...data });
      result(null, { id: res.insertId, ...data });
    });
};

Yfinancial.findByAddress = (address, result) => {
  sql.query(`SELECT * FROM yfinancial WHERE investor_address = ${address}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found project: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Yfinancial.updateByAddress = (data, result) => {
  sql.query(
    "UPDATE yfinancial SET token_amount = ?, claim = ?, refund =? WHERE investor_address = ?",
    [data.token_amount, data.claim, data.refund, data.investor_address],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated yfinancial data: ", { data });
      result(null, { data });
    }
  );
};

Yfinancial.remove = (address, result) => {
  sql.query("DELETE FROM yfinancial WHERE investor_address = ?", address, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted project with id: ", address);
    result(null, res);
  });
};

module.exports = Yfinancial;