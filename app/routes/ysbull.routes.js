module.exports = app => {
    const ysbull = require("../controllers/ysbull.controller.js");
    var router = require("express").Router();
    router.post("/", ysbull.create);
    router.get("/:address", ysbull.findOne);
    router.put("/", ysbull.update);
    router.delete("/:address", ysbull.delete);

    app.use('/api/ysbull', router);
};