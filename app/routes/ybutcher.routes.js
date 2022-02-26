module.exports = app => {
    const ybutcher = require("../controllers/ybutcher.controller.js");
    var router = require("express").Router();
    router.post("/", ybutcher.create);
    router.get("/:address", ybutcher.findOne);
    router.put("/", ybutcher.update);
    router.delete("/:address", ybutcher.delete);

    app.use('/api/ybutcher', router);
};