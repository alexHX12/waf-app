const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-sequence')(mongoose);

const rule = new Schema(
  {

    _id: Number,

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
    severity:{
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
    collection: "rules",
  }
);

rule.plugin(autoIncrement,{start_seq:1000000});

const Rule = mongoose.model("Rule", rule);

module.exports = Rule;
