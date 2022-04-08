const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const container = new Schema(
  {
    // AUTO-GENERATED ID

    user_id:{
      type:String,
      required:true
    },

    domain: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },
  },
  {
    collection: "containers",
  }
);


const Container = mongoose.model("Container", container);

module.exports = Container;
