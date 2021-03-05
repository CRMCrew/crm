const pdf = require('html-pdf');
const template = require('../pdf/index');

const save = async (req, res) => {
  console.log(req.body);
  pdf.create(template(req.body, {})).toFile('./pdf/test/test.pdf', (err) => {
    if (err) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  });

  res.status(201).send(' Hello world');
};

module.exports = {
  save,
};
