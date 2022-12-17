const express = require("express");

const router = express.Router();

const { getSales } = require("../controllers/salaes");

router.get("/sales", getSales);

module.exports = router;
