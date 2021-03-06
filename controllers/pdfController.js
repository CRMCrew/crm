const pdf = require('html-pdf');
var path = require('path');
var appDir = path.dirname(require.main.filename);
const template = require('../pdf/index');

const save = async (req, res) => {
  pdf.create(template(req.body, {})).toFile(`${req.body.itemId}.pdf`, (err) => {
    if (err) {
      res.status(400).send({ error: err });
    } else {
      res.status(200).send({ success: 0 });
    }
  });
};

const get = async (req, res) => {
  const { customerId, itemId } = req.params;

  const dir = `${appDir}/${itemId}.pdf`;
  console.log(' dir', dir);
  res.sendFile(dir);
};

module.exports = {
  save,
  get,
};
