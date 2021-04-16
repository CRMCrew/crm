const CreditCardHistory = require('../models/CreditcardDeposit');
const Test = require('../models/Test');

const getResponse = async (req, res) => {
  const cus = new CreditCardHistory(req.body);
  const test = new Test({ outPut: JSON.stringify(req.body) });
  try {
    const creditHistory = await cus.save();
    const damn = test.save(test);
    res.status(201).send(creditHistory);
  } catch (err) {
    console.log(err);
    res.status(402).send({ error: err });
  }
};

module.exports = {
  getResponse,
};
