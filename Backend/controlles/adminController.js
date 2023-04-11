import adminModel from "../models/adminModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export async function getAllAdmins(req, res, next) {
    adminModel.find({}, (err, response) =>{
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    })
}
  
export async function getAdmin(req, res, next) {
    let { id } = req.params;
    adminModel.findOne({ _id: id }, (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    });
}
  
export async function editAdmin(req, res, next) {
    let filter={_id:req.params.id};
    let update=req.body;
    adminModel.findOneAndUpdate(filter, update,{
    new:true,
    },(err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    });
}
  
export async function deleteAdmin(req, res, next) {
    let { id } = req.params;
    adminModel.findByIdAndDelete({ _id: id }, (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    })
}

export async function addAdmin(req, res, next) {
    try {
      // Get user input
      const { FirstName, LastName, Email, Password } = req.body;
  
      // Validate user input
      if (!(Email && Password && FirstName && LastName)) {
        res.status(400).send("All input is required");
        return;
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await adminModel.findOne({ Email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      let encryptedUserPassword = await bcrypt.hash(Password, 10);
  
      // Create user in our database
      const user = await adminModel.create({
        FirstName: FirstName,
        LastName: LastName,
        Email: Email.toLowerCase(), // sanitize
        Password: encryptedUserPassword
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, Email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      // save user token
      user.token = token;

      // return new user
      res.status(201).json(user);
    } catch (error) {
      if(error) return next(error);
      return res.status(400).send(`Error: ${error}`);
    }
}

 export async function login(req, res, next) {
  try {
    // Get user input
    const { Email, Password } = req.body;

    // Validate user input
    if (!(Email && Password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    adminModel.findOne({ Email }, function(err, user) {
      if (err) {
        return next(err);
      }
      if (user && bcrypt.compareSync(Password, user.Password)) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, Email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "5h",
          }
        );

        // save user token
        user.token = token;
          
        // user and cookies
        return res.cookie('token', token).status(200).json(user);
      } else {
        return res.status(401).send("Invalid Credentials");
      }
    });
  } catch(error) {
    if(error) return next(error);
    return res.status(400).send(`Error: ${error}`);
  }
}



export async function logout(req, res, next) {
  try {
    res.clearCookie("token").status(200).send({ status: 200, message: "Logged Out!" });
  } catch (error) {
    return next(error);
  }
}

export default adminModel;