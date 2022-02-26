module.exports = app => {
    const ysbet = require("../controllers/ysbet.controller.js");
    var router = require("express").Router();
    router.post("/", ysbet.create);
    router.get("/:address", ysbet.findOne);
    router.put("/", ysbet.update);
    router.delete("/:address", ysbet.delete);

    app.use('/api/ysbet', router);
};