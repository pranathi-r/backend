/**
 * UsigninController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//UsigninController
const bcrypt = require("bcrypt");
module.exports = {
  async signin(req, res) {
    try {
      const { username, password } = req.body;

      // Find the user in the database based on the username
      const user = await User.findOne({ signUpUsername: username });

      // If the user is not found or the password doesn't match, return an error
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password." });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.signUpPassword);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid username or password." });
      }

      // If the username and password are correct, return a success response
      return res.status(200).json({ message: "Login successful.", user });
    } catch (error) {
      console.error("Signin failed:", error);
      return res
        .status(500)
        .json({ error: "Signin failed. Please try again later." });
    }
  },

  async findUser(req, res) {
    try {
      const userId = req.param("id");
      const user = await User.findOne({ id: userId });

      if (!user) {
        return res.notFound({ error: "user not found" });
      }

      return res.ok(user);
    } catch (error) {
      console.error("Error Fetching User", error);
      return res.serverError({ error: "Server Error" });
    }
  },
};
