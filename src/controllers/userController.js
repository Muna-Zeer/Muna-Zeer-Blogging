//create new user
const { User } = require("../models");

//Get all users info
module.exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    // res.status(200).json(allUsers);
    console.log("allUsers", allUsers);
    res.render("userList", { users: allUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};


module.exports.getUserByID = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Render the userDetail view with user data and send the response
    res.render("userDetail", { user });
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ error: "Unable to fetch user" });
  }
};
module.exports.getUserEditPage = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.render("editUser", { user });
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ error: "Unable to fetch user" });
  }
};


module.exports.updateUserInfo = async (req, res) => {
    const { userId } = req.params;
    try {
        const [updatedRowsCount, updatedUser] = await User.update(req.body, {
            where: { id: userId },
            returning: true 
        });
        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }
      
        res.redirect(`/api/users/${userId}`);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Unable to update user" });
    }
};


module.exports.deleteUserId = async (req, res) => {
  const { userId } = req.params;
  console.log("Deleting user with ID:", userId);

  try {
      const user = await User.findByPk(userId);
      if (!user) {
          console.error("User not found");
          return res.status(404).json({ error: "User not found" });
      }

      await user.destroy();

      console.log("User deleted successfully");
      res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Unable to delete user" });
  }
};
