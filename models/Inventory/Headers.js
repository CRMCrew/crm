const mongoose = require('mongoose');

const HeadersSchema = new mongoose.Schema(
  {
    headers: [],
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
  {
    timestamps: true,
  }
);

const togo = () => {};

const Headers = mongoose.model('Headers', HeadersSchema);
module.exports = Headers;
