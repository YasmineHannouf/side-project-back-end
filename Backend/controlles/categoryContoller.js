import categoryModel from "../models/categoryModel.js";




function getCategoryById(req, res) {
  const categoryId = req.params.id;
  categoryModel.findOne({ _id: categoryId })
    .then(category => {
      if (!category) {
        return res.status(404).send('Category not found');
      }
      res.send(category);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Internal server error');
    });
}



// get all the categories 

export  async function getAllCategory(req, res, next) {
  // categoryModel.find({}, (err, response) => {
  //   if (err) return next(err);
  //   return res.status(200).send({ success: true, response });
  // });
 const categories= await categoryModel.find({}).exec();
 if(categories){
   return res.status(200).send({ success: true, data: categories });

 }
  
}

// create category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await categoryModel.create({ name });
    res.status(200).json({ success: true, data: newCategory });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
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

export const deleteCategory = async (req, res,next ) => {
  const id = req.params.id;
  try {
    let response = await categoryModel.findByIdAndRemove({ _id: id });
    res.status(200).send({ success: true, response });
  } catch (error) {
    res.status(400).send({ error: true, error });
  }
}; 



const categoryController = { getCategoryById, createCategory, updateCategory, deleteCategory ,getAllCategory};

export default categoryController;