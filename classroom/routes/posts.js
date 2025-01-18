const express = require("express");
const router = express.Router();

router.get("/", (req ,res) => {
    res.send("GET posts info");
});

router.get("/:id", (req, res) => {
    res.send("GET post details");
});

router.post("/:id", (req, res) => {
    res.send("POST request send for post");
});

router.delete("/:id", (req, res) => {
    res.send("post deleted")
});

module.exports = router;