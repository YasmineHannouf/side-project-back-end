import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  }
}, {
  collection: "admin"
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

