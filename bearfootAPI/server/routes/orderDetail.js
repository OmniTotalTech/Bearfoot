const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");

const OrderDetailsController = require("../controllers/orderDetail");
const passportJWT = passport.authenticate("jwt", { session: false });

// Uses JWT Token to verify

// Get functions
router.route("/").get(OrderDetailsController.getAll);
router.route("/").post(OrderDetailsController.newOrder);

module.exports = router;
//test
