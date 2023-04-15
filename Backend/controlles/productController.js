import productModel from "../models/productModel.js";


//get all the products 

export async function getAll (req,res,next){
  productModel.find({},(err,response) =>{
    if(err)return next (err);
    return res.status(200).send({success:true,response});
  });
}

//get product byId
export async function getById(req,res,next){
  let{id}=req.params;
  productModel.findOne({_id:id},(err,response)=>{
    if (err) return next (err);
    res.status(200).send({success:true,response})
  });
  ;
}

//creating product 
// export async function post(req, res, next) {
//   try {
//     let body = req.body;
//     let newproduct = new productModel(body);
//     newproduct.save((error, response) => {
//       if (error) return res.status(500).send(error);
//       res
//         .status(200)
//         .send({ success: true, message: "product Added Succesfully" });
//     });
//   } catch (e) {
//     return res.status(500).send(e);
//   }
// }
export function post(req, res, next) {
  const product = new productModel(req.body);
  product.save().then((response)=>{
    res
      .status(200)
      .send({ status: 201, message: response })
      .catch((err) => {
        next(err);
      });
  });
}



//update the product
export async function put(req,res,next){
  try {
        const product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
          return res.status(404).send();
        }
        res.send(product);
      } catch (err) {
        res.status(400).send(err);
      }

}

export async function Delete(req,res,next){
  try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
          return res.status(404).send();
        }
        res.send("not found");
      } catch (err) {
        res.status(400).send(err);
      }

}


const productController = {post , getAll, Delete, getById, put};

export default productController;
