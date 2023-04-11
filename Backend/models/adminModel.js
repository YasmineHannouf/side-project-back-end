import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
  Firstname: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Token: {
    type: String,
  }
}, {
  collection: "admin"
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

