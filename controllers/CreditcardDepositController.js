const CreditCardHistory = require('../models/CreditcardDeposit');

const getResponse = async (req, res) => {
  const cus = new CreditCardHistory(req.body);
  try {
    const creditHistory = await cus.save();
    res.status(201).send(creditHistory);
  } catch (err) {
    console.log(err);
    res.status(402).send({ error: err });
  }
};

module.exports = {
  getResponse,
};
