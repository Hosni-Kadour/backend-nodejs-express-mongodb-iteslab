import mongoose from "mongoose";
import People from "../models/people.js";

export const getPeople = async (req, res) => {
  try {
    const people = await People.find({});

    res.status(200).json(people);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addPerson = async (req, res) => {
  console.log(req.body)
  const data = req.body
  try {
    const person = new People(data);
    await person.save()
    res.status(200).json(person);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePerson = async (req, res) => {
  const { id: id } = req.params;
  const content = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no person with that id");

  const updatedSaplings = await People.findByIdAndUpdate(id, content , {
    new: true,
  });
  res.status(201).json(updatedSaplings);
};