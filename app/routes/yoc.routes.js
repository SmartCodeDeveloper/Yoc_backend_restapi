module.exports = app => {
    const yoc = require("../controllers/yoc.controller.js");
    var router = require("express").Router();
    router.post("/", yoc.create);
    router.get("/:id", yoc.findOne);
    router.put("/", yoc.update);
    router.delete("/:id", yoc.delete);

    app.use('/api/yoc', router);
};