const pdf = require('html-pdf');
var path = require('path');
var appDir = path.dirname(require.main.filename);
const template = require('../pdf/index');

const save = async (req, res) => {
  pdf
    .create(template(req.body, {}))
    .toFile(`./pdf/${req.body.customerId}/${req.body.itemId}.pdf`, (err) => {
      if (err) {
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    });

  res.status(201).send(' Hello world');
};

const get = async (req, res) => {
  const { customerId, itemId } = req.params;
  console.log(customerId);
  const dir = `${appDir}/pdf\\${customerId}\\${itemId}.pdf`;
  res.sendFile(dir);
};

module.exports = {
  save,
  get,
};
