import mongoose from "mongoose";

const peopleSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: "String",
  },
  CIN: {
    type: Number,
  },
});

const People = mongoose.model("people", peopleSchema);
export default People;