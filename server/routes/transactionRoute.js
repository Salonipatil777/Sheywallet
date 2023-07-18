const express = require("express");
const userAuth = require("../Middleware/userAuth");
const router = express.Router();
const Transaction = require("../models/transactionSchema");
const User = require("../models/userSchema");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { uuid } = require("uuidv4");

router.post("/transfer-fund", userAuth, async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();

    await User.findByIdAndUpdate(req.body.sender, {
      $inc: {
        balance: -req.body.amount,
      },
    });
    await User.findByIdAndUpdate(req.body.receiver, {
      $inc: {
        balance: req.body.amount,
      },
    });
    res.send({
      message: "Transaction successful",
      data: transaction,
      success: true,
    });
  } catch (error) {
    res.send({
      message: "Transaction Failed",
      data: error.message,
      success: false,
    });
  }
});

//verify recievers acc no

router.post("/verify-account", userAuth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.receiver });
    if (user) {
      res.send({
        success: true,
        data: user,
        message: "Account verified",
      });
    } else {
      res.send({
        success: false,
        data: null,
        message: "Account not verified",
      });
    }
  } catch (error) {}
});

router.post("/get-all-transactions", userAuth, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
    }).sort({ createdAt: -1 });
    res.send({
      success: true,
      data: transactions,
      message: "Transactions fetched",
    });
  } catch (error) {
    res.send({
      success: false,
      data: error.message,
      message: "Transactions not fetched",
    });
  }
});

//deposit funds using stripe
router.post("/deposit-funds", userAuth, async (req, res) => {
  try {
    const { token, amount } = req.body;
    //create customer
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    //create charge
    const charge = await stripe.charges.create(
      {
        amount: amount,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        reference: "stripe deposit",
        description: "Deposit to sheywallet",
      },
      {
        idempontencyKey: uuid(),
      }
    );

    //save the transaction
    if (charge.status === "succeeded") {
      const newtransaction = new Transaction({
        sender: req.body.userId,
        receiver: req.body.userId,
        amount: amount,
        type: DepositFunds,
        status: "success",
        chargeId: charge.id,
      });
      await newtransaction.save();
      await User.findByIdAndUpdate(req.body.userId, {
        $inc: {
          balance: amount,
        },
      });
      res.send({
        success: true,
        data: newtransaction,
        message: "Transaction successful",
      });
    } else {
      res.send({
        success: false,
        data: null,
        message: "Transaction failed",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      data: error.message,
      message: "Transaction failed",
    });
  }
});

module.exports = router;
