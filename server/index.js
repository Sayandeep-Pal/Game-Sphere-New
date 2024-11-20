const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const UserModel = require("./models/Users.js")


const app = express();


app.use(cors());

app.use(express.json());


mongoose.connect(
  "mongodb+srv://sayandeep123:babusona@cluster0.0qugd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing

app.post("/createUser", async (request, response) => {
  const { username, email, password } = request.body;

  try {
    // Check if username or email already exists
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return response
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with hashed password
    UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    })
    .then(gamers => response.status(201).json(gamers));
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: "Server error", error: err });
  }
});


app.get("/loginUser/:email/:password", async (req, res) => {
  const {email} = req.params;
  const {password} = req.params;

  // if (!email || !password) {
  //   return res
  //     .status(400)
  //     .json({ message: "Email and password are required." });
  // }

  
    UserModel.findOne({ email: email })
    .then(gamers => {
      bcrypt.compare(password, gamers.password, (err, isMatch)=>{
        if(err) return err;
        if(isMatch){
          res.status(200).json(gamers);
        }
      })
    })
    .catch(err=> res.json(err));
});


app.get("/getUser/:id", (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  UserModel.findById(id)
    .then((gamers) => {
      if (!gamers) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(gamers);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err });
    });
});


app.listen(3000, () => {
  console.log("Server is running...");
});
