/**
 * UsignupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


//UsignupController

const bcrypt = require("bcrypt");
// Import the User model
module.exports = {
  async signup(req, res) {
    try {
      // Extract signup data from the request body
      const { signUpUsername, signUpPassword } = req.body;

      // Check if the username already exists
      const existingUser = await User.findOne({ signUpUsername });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(signUpPassword, 10);

      //  creating a new user in the database
      const newUser = await User.create({
        signUpUsername,
        signUpPassword: hashedPassword, // Save the hashed password
      }).fetch();

      // Return success response with the newly created user
      return res.status(201).json(newUser);
    } catch (error) {
      // Handle errors
      console.error("Signup failed:", error);
      return res
        .status(500)
        .json({ error: "Signup failed. Please try again later." });
    }
  },
};
