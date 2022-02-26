module.exports = app => {
    const ymakers = require("../controllers/ymakers.controller.js");
    var router = require("express").Router();
    router.post("/", ymakers.create);
    router.get("/:address", ymakers.findOne);
    router.put("/", ymakers.update);
    router.delete("/:address", ymakers.delete);

    app.use('/api/ymakers', router);
};