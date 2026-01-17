const express = require("express");
const cors = require("cors");

const sequelize = require("./db");
const Contact = require("./models/Contact");

const app = express();
app.use(cors());
app.use(express.json());

// GET ALL CONTACTS
app.get("/Contacts", async (req, res) => {
  const contacts = await Contact.findAll();
  const jsonContacts = contacts.map((c) => ({
    id: c.id,
    firstName: c.first_name,
    lastName: c.last_name,
    email: c.email,
  }));
  res.json({ contacts: jsonContacts });
});

// CREATE CONTACT
app.post("/CreateContact", async (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: "include all fields" });
  }

  try {
    await Contact.create({
      first_name: firstName,
      last_name: lastName,
      email,
    });
    res.status(201).json({ message: "Contact Created." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE CONTACT
app.patch("/UpdateContact/:user_id", async (req, res) => {
  const contact = await Contact.findByPk(req.params.user_id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const { firstName, lastName, email } = req.body;

  contact.first_name = firstName ?? contact.first_name;
  contact.last_name = lastName ?? contact.last_name;
  contact.email = email ?? contact.email;

  await contact.save();
  res.json({ message: "Contact Updated" });
});

// DELETE CONTACT
app.delete("/DeleteContact/:user_id", async (req, res) => {
  const contact = await Contact.findByPk(req.params.user_id);
  if (!contact) {
    return res.status(404).json({ message: "User not found" });
  }

  await contact.destroy();
  res.json({ message: "Contact Deleted" });
});

// START SERVER
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log("Server started"));
});
