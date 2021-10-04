const router = require("express").Router();
const Controller = require("../controllers");

router.get("/get-events", Controller.Events.getEvents);
router.get("/get-events-chart", Controller.Events.getEventsChartData);
router.delete("/delete-event/:event_id", Controller.Events.deleteEvent);
router.post("/filter-events", Controller.Events.getFilteredEvent);
router.get(`/get-global-data`, Controller.Events.getGlobalData);
module.exports = router;
