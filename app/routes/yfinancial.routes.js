module.exports = app => {
    const yfinancial = require("../controllers/yfinancial.controller.js");
    var router = require("express").Router();
    router.post("/", yfinancial.create);
    router.get("/:address", yfinancial.findOne);
    router.put("/", yfinancial.update);
    router.delete("/:address", yfinancial.delete);

    app.use('/api/yfinancial', router);
};