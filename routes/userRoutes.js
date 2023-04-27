const express = require("express");
const router = express.Router();
const { registerUser,loginUser,currentUser} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

// Or We Use Like This For Same Routes With Different Methods
// router.route("/").get(getContacts).post(createContacts);
// router.route("/:id").get(getContactById).get(updateContactById).delete(deleteContactById);
// End

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.get("/current",validateToken, currentUser);

module.exports = router;
