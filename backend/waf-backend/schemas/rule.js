const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const rule = new Schema(
  {
    // AUTO-GENERATED ID

    container_id:{
      type: String,
      required: false
    },

    isGlobal:{
      type:Boolean,
      required:true,
    },

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
    phase: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  {
    collection: "rules",
  }
);

rule.plugin(autoIncrement.plugin, {
  model: 'rules',
  startAt: 1000000
});

const Rule = mongoose.model("Rule", rule);

module.exports = Rule;
