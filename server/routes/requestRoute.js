const express = require("express");
const router = express.Router();
const Request = require("../models/requestModel");
const User = require("../models/userSchema");
const userAuth = require("../Middleware/userAuth");

router.post("/get-all-requests-by-user", userAuth, async (req, res) => {
  try {
    const requests = await Request.find({
      $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
    });
    res.send({
      data: requests,
      message: "fetched successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//send request to anather user
router.post("/send-request", userAuth, async (req, res) => {
  try {
    const { receiver, amount, description } = req.body;
    const request = new Request({
      sender: req.body.userId,
      receiver,
      amount,
      description,
    });
    await request.save();
    res.send({
      data: request,
      message: "request sent successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update a request status
router.post("/update-request-status", userAuth, async (req, res) => {
  try {
    if (req.body.status === "accepted") {
      await User.findByIdAndUpdate(req.body.sender, {
        $inc: { balance: +req.body.amount },
      });
      await User.findByIdAndUpdate(req.body.receiver, {
        $inc: { balance: -req.body.amount },
      });
      await Request.findByIdAndUpdate(req.body._id, {
        status: req.body.status
      });
    }
    res.send({
      data: null,
      message: "request updated successfully",
      success: true,
    });
  } catch (error) {
    res.send({ data: error, message: error.message, success: false });
  }
});



module.exports = router;
