const { v4: uuidv4 } = require('uuid');

const readXlsxFile = require('read-excel-file/node');
const Customer = require('../models/Customer');
const fs = require('fs');

const readXlsFile = async (newName) => {
  const users = [];
  await readXlsxFile(`./uploads/${newName}.xlsx`).then((rows) => {
    // rows.forEach((row) => {
    for (const row of rows) {
      users.push({
        firstName: row[0],
        lastName: row[1],
        email: row[2],
        phone: row[3],
        country: 'Switzerland',
        status: 0,
      });
    }
    // res.send({ id: fileId, users });
  });

  return users;
};
const moveFile = (file, newName) => {
  file.mv(`./uploads/${newName}.xlsx`);
  for (let i = 0; i < 20; i++) {
    console.log('done moving');
  }
};

const importCustomer = async (req, res) => {
  let users = [];
  let newName = '';
  let fileId = '';
  newName = uuidv4();
  fileId = newName;
  if (Array.isArray(req.files.file)) {
    let index = 0;
    for (const file of req.files.file) {
      newName = `${fileId}_${index++}`;
      moveFile(file, newName);
      try {
        const temp = await readXlsFile(newName);
        users = users.concat(temp);
      } catch (err) {
        console.log('error:', err);
      }
    }
  } else {
    const name = req.files.file.name;
    newName = `${uuidv4()}_1`;
    moveFile(req.files.file, newName);
    try {
      users = await readXlsFile(newName);
    } catch (err) {
      console.log('error:', err);
    }
  }

  const obj = { id: fileId, users };

  res.send(obj);
};

const executeImportCustomer = async (req, res) => {
  const { fileId, campaign, owner = null } = req.body;
  let hasFile = true;
  let users = [];
  let count = 0;
  const added = [];
  while (hasFile) {
    const name = `${fileId}_${count++}`;
    if (fs.existsSync(`./uploads/${name}.xlsx`)) {
      try {
        users = await readXlsFile(name);
        'users', users;
        for (user of users) {
          const newC = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            country: 'Switzerland',
            status: 0,
            campaign: campaign,
            userName: 'test',
            userPassword: '1234',
          };
          const customer = new Customer(newC);
          try {
            const response = await customer.save();
            added.push(newC);
          } catch (e) {}
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      hasFile = false;
    }
  }

  res.send(added);
};
module.exports = {
  importCustomer,
  executeImportCustomer,
};
