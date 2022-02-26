const sql = require("./db.js");
// constructor
const Ysbet = function(data) {
  this.investor_address = data.investor_address;
  this.token_amount = data.token_amount;
  this.claim = data.claim;
  this.refund = data.refund;
};

Ysbet.create = (data, result) => {
    sql.query("INSERT INTO ysbet SET ?", data, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created project: ", { id: res.insertId, ...data });
      result(null, { id: res.insertId, ...data });
    });
};

Ysbet.findByAddress = (address, result) => {
  sql.query(`SELECT * FROM ysbet WHERE investor_address = ${address}`, (err, res) => {
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

Ysbet.updateByAddress = (data, result) => {
  sql.query(
    "UPDATE ysbet SET token_amount = ?, claim = ?, refund =? WHERE investor_address = ?",
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
      console.log("updated ysbet data: ", { data });
      result(null, { data });
    }
  );
};

Ysbet.remove = (address, result) => {
  sql.query("DELETE FROM ysbet WHERE investor_address = ?", address, (err, res) => {
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

module.exports = Ysbet;