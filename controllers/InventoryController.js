const Inventory = require('../models/Inventory/Inventory');

// **** Get Inventory Groups ****\\
const getInventoryGroups = async (req, res) => {
  try {
    const response = await Inventory.find();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(402).send({ error: err });
  }
};

const deleteGroup = async (req, res) => {
  const _id = req.params.id;
  const response = await Inventory.deleteOne({ _id });
  res.send(response);
};

const saveInventory = async (req, res) => {
  const cus = new Inventory(req.body);
  try {
    const inventroy = await cus.save();
    res.status(201).send(inventroy);
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const updateGroup = async (req, res) => {
  const items = req.body.items;
  const _id = req.params.id;
  const response = await Inventory.updateOne({ _id }, { $set: { items } });
  res.send(items);
};

const updateInventoryItems = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const response = await Inventory.updateOne({ _id: id }, { items: body });
  res.send(response);
  // res.send(`id: ${id},  body: ${body[0].text}`);
};

module.exports = {
  saveInventory,
  getInventoryGroups,
  updateGroup,
  deleteGroup,
  updateInventoryItems,
};
