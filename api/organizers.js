const router = require("express").Router();
const Controller = require("../controllers");

router.post(`/getAdmins`, Controller.Organizer.getAdmins);
router.post(`/get-organizers`, Controller.Organizer.getOrganizers);

router.get(
    `/get-organizers-chart`,
    Controller.Organizer.getOrganizersChartData
  );

module.exports = router;
