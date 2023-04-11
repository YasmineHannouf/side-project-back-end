import categoryModel from "../models/categoryModel.js";

// get category by id 
export async function getCategoryById(req, res) {
  let { id } = req.params;
  categoryModel.findOne({ _id: id }, (err, response) => {
          if (err) return next(err);
          res.status(200).send({ success: true, response });
      });
}
// get all the categories 

export async function getAllCategory (req,res,next){
  categoryModel.find({},(err,response) =>{
    if(err)return next (err);
    return res.status(200).send({success:true,response});
  });
}

// create category
export const createCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ name: req.body.name ,
    products:req.body.products});

    if (category) {
      return res.status(400).json({ msg: "Category already exists" });
    }
    const newCategory = new category(req.body);

    await newCategory.save();

    res.json(newCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
};

//update category by id 

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    category.name = name; 
    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(500).send("Server Error");
  }
};
// Delete a specific category

export const deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    await category.remove();
    res.json({ msg: "Category removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(500).send("Server Error");
  }
};



const categoryController = {getCategoryById , createCategory, updateCategory, getAllCategory, deleteCategory};

export default categoryController;