const router = require("express").Router();
const Controller = require("../controllers");

router.get(`/get-attendees-chart`, Controller.Attendee.getAttendeesChartData);
router.post(`/get-attendees`, Controller.Attendee.getAttendees);
router.get(`/get-attendee-by-id/:org_id`, Controller.Attendee.getAttendee);


module.exports = router;
