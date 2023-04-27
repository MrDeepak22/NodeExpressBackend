const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContacts,
  getContactById,
  updateContactById,
  deleteContactById,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken)
router.route("/").get(getContacts);

// Or We Use Like This For Same Routes With Different Methods
// router.route("/").get(getContacts).post(createContacts);
// router.route("/:id").get(getContactById).get(updateContactById).delete(deleteContactById);
// End

router.route("/").post(createContacts);

router.route("/:id").get(getContactById);

router.route("/:id").put(updateContactById);

router.route("/:id").delete(deleteContactById);

module.exports = router;
