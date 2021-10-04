const router = require("express").Router();
const Controller = require("../controllers");

router.post(`/add-new-user`, Controller.Logging.addNewUser);
router.patch(`/update-user`, Controller.Logging.updateUser);
router.post(`/super-admin-signin`, Controller.Logging.signin);

module.exports = router;
