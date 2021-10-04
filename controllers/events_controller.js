const db = require("../models");

exports.getEvents = (req, res) => {
  db.Event.find().exec((err, result) => {
    err
      ? res.status(400).json({ error: `error because: ${err}` })
      : res.status(200).json({ result: result });
  });
};
exports.deleteEvent = (req, res) => {
  db.Event.deleteOne({ _id: req.params.event_id }).exec((err, result) => {
    err
      ? res.status(400).json({ error: `error because: ${err}` })
      : res.status(200).json({ result: result });
  });
};

exports.getEventsChartData = (req, res) => {
  try {
    db.Event.aggregate([
      {
        $sort: { month: 1 },
      },
      {
        $group: {
          _id: "$month",
          purchases: { $sum: 1 },
        },
      },
    ]).exec((err, monthlyEventCreated) => {
      if (err) {
        console.log("err");
      } else
        db.Event.countDocuments().exec((err, count) => {
          err
            ? res.status(400).json({ error: err })
            : count
            ? res.status(200).json({
                result: { total: count, chartData: monthlyEventCreated },
              })
            : res
                .status(400)
                .json({ error: "Error in get-chart-data @catch-block" });
        });
    });
  } catch (e) {
    console.log("Error at catch-block @getAllPerchasedTickets:", String(e));
  }
};

exports.getFilteredEvent = (req, res) => {
  let data = JSON.parse(req.body.data);

  const getContainsResult = (value, field) => {
    field === "title"
      ? db.Event.find({
          title: { $regex: value, $options: "i" },
        }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        })
      : field === "category"
      ? db.Event.find({
          category: { $regex: value, $options: "i" },
        }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        })
      : field === "hostingPlatform"
      ? db.Event.find({
          hostingPlatform: { $regex: value, $options: "i" },
        }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        })
      : field === "start_date"
      ? db.Event.find({
          start_date: { $regex: value, $options: "i" },
        }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        })
      : field === "eventType"
      ? db.Event.find({
          eventType: { $regex: value, $options: "i" },
        }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        })
      : field === "city"
      ? db.Event.find({
          city: { $regex: value, $options: "i" },
        }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        })
      : db.Event.find({
          country: { $regex: value, $options: "i" },
        }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        });
  };
  const getEqualResult = (value, field) => {
    field === "title"
      ? db.Event.find({ title: value }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        })
      : field === "hostingPlatform"
      ? db.Event.find({ hostingPlatform: value }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        })
      : field === "start_date"
      ? db.Event.find({ start_date: value }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        })
      : field === "eventType"
      ? db.Event.find({ eventType: value }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        })
      : field === "city"
      ? db.Event.find({ city: value }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        })
      : db.Event.find({ country: value }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        });
  };
  const getSelectionWise = (value, field) => {
    field === "eventType"
      ? db.Event.find({ eventType: value }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        })
      : db.Event.find({ hostingPlatform: value }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        });
  };

  if (
    data.search === "" &&
    data.by !== "eventType" &&
    data.by !== "hostingPlatform"
  ) {
    db.Event.find().exec((err, result) => {
      err
        ? res.status(400).json({ error: err })
        : result
        ? res.status(200).json({ result: result })
        : res.status(400).json({ error: err });
    });
  } else if (data.by === "eventType" || data.by === "hostingPlatform") {
    getSelectionWise(data.search, data.by);
  } else {
    data.contains === "contains"
      ? getContainsResult(data.search, data.by)
      : getEqualResult(data.search, data.by);
  }
};
 
exports.getGlobalData = (req, res) => {
  const calculate = (result) => {
    let length = result.length;
    let globalData = [];
    let mapData = {};
    result.forEach((data) => {
      mapData[data._id.value] = data.total;
      globalData.push({
        country: data._id,
        total: data.total,
        percentage: (data.total / length) * 100,
      });
    });

    return {
      globalData: globalData,
      mapData: mapData,
    };
  };

  db.Ticket.aggregate([
    {
      $group: {
        _id: "$country",
        total: { $sum: 1 },
      },
    },
  ]).exec((err, result) => {
    err
      ? res.status(400).json({ error: err })
      : result
      ? res.status(200).json({ result: calculate(result) })
      : res.status(400).json({ error: err });
  });
};
