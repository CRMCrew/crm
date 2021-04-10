const Customer = require('../models/CreditcardDeposit');

const getResponse = async (req, res) => {
  try {
    const customer = await Customer.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await customer.generateAuthToken();

    res
      .status(202)
      .cookie('token', token, {
        sameSite: 'strict',
        path: '/',
        expires: new Date(new Date().getTime() + 1000 * 1000),
      })
      .send({ customer, token });
  } catch (error) {
    console.log('error', error);
    res.status(400).send({ message: 'could validata credentials', error });
  }
};

module.exports = {
    getResponse
  };