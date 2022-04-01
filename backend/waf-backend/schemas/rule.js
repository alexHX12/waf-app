const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rule = new Schema(
  {
    // AUTO-GENERATED ID

    name: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },
  },
  {
    collection: "rules",
  }
);

const Rule = mongoose.model("Rule", rule);

module.exports = Rule;
