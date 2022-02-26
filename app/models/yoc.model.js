const sql = require("./db.js");
// constructor
const Yoc = function(project) {
  this.pro_id = project.pro_id;
  this.pro_name = project.pro_name;
  this.start_date = project.start_date;
  this.end_date = project.end_date;
  this.ongoing = project.ongoing;
  this.claim = project.claim;
  this.refund = project.refund;
};

Yoc.create = (newProject, result) => {
    sql.query("INSERT INTO yoc_projects SET ?", newProject, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created project: ", { id: res.insertId, ...newProject });
      result(null, { id: res.insertId, ...newProject });
    });
};

Yoc.findById = (id, result) => {
  sql.query(`SELECT * FROM yoc_projects WHERE pro_id = ${id}`, (err, res) => {
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

Yoc.updateById = (project, result) => {
  sql.query(
    "UPDATE yoc_projects SET pro_name = ?, start_date = ?, end_date = ?, ongoing =?, claim = ?, refund = ?, WHERE pro_id = ?",
    [project.pro_name, project.start_date, project.end_date, project.ongoing, project.claim, project.refund, project.pro_id],
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
      console.log("updated yoc project: ", { project });
      result(null, { project });
    }
  );
};

Yoc.remove = (id, result) => {
  sql.query("DELETE FROM yoc_projects WHERE pro_id = ?", id, (err, res) => {
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
    console.log("deleted project with id: ", id);
    result(null, res);
  });
};

module.exports = Yoc;