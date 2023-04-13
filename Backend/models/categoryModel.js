import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  
},{
  collection:"Categories"
});

 export default mongoose.model("categories",categorySchema);