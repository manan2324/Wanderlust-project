const express = require("express");
const router = express.Router();

router.get("/", (req ,res) => {
    res.send("GET users info");
});

router.get("/:id", (req, res) => {
    res.send("GET user details");
});

router.post("/:id", (req, res) => {
    res.send("POST request send");
});

router.delete("/:id", (req, res) => {
    res.send("user deleted")
});

module.exports = router;