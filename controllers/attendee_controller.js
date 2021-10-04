const db = require("../models");

exports.getAttendeesChartData = (req, res) => {
  try {
    db.Registration.aggregate([
      {
        $match: { user_type: "attendee" },
      },
      {
        $sort: { month: 1 },
      },
      {
        $group: {
          _id: "$month",
          registrations: { $sum: 1 },
        },
      },
    ]).exec((err, monthlyEventCreated) => {
      if (err) {
        console.log("err");
      } else
        db.Registration.countDocuments({ user_type: "attendee" }).exec(
          (err, count) => {
            err
              ? res.status(400).json({ error: err })
              : count
              ? res.status(200).json({
                  result: { total: count, chartData: monthlyEventCreated },
                })
              : res.status(400).json({
                  error: "Error in getAttendeesChartData @total @catch-block",
                });
          }
        );
    });
  } catch (e) {
    console.log("Error at catch-block @getAttendeesChartData:", String(e));
  }
};

exports.getAttendees = (req, res) => {
  let data = JSON.parse(req.body.data);

  const getContainsResult = (value, field) => {
    field === "fname"
      ? db.Registration.find({
          user_type: "attendee",
          fname: { $regex: value, $options: "i" },
        }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        })
      : field === "email"
      ? db.Registration.find({
          user_type: "attendee",
          email: { $regex: value, $options: "i" },
        }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        })
      : db.Registration.find({
          user_type: "attendee",
          dob: { $regex: value, $options: "i" },
        }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        });
  };
  const getEqualResult = (value, field) => {
    field === "fname"
      ? db.Registration.find({ user_type: "attendee", fname: value }).exec(
          (err, result) => {
            err
              ? res.status(400).json({ error: err })
              : result
              ? res.status(200).json({ result: result })
              : res.status(400).json({ error: err });
          }
        )
      : field === "email"
      ? db.Registration.find({ user_type: "attendee", email: value }).exec(
          (err, result) => {
            err
              ? res.status(400).json({ error: err })
              : result
              ? res.status(200).json({ result: result })
              : res.status(400).json({ error: err });
          }
        )
      : db.Registration.find({ user_type: "attendee", country: value }).exec(
          (err, result) => {
            err
              ? res.status(400).json({ error: err })
              : result
              ? res.status(200).json({ result: result })
              : res.status(400).json({ error: err });
          }
        );
  };
  const getAgeWise = (age) => {
    db.Registration.find({
      user_type: "attendee",
      dob: {
        $gte: age[0],
        $lte: age[1],
      },
    }).exec((err, result) => {
      err
        ? res.status(400).json({ error: err })
        : result
        ? res.status(200).json({ result: result })
        : res.status(400).json({ error: err });
    });
  };

  if (data.search === "") {
    db.Registration.find({ user_type: "attendee" }).exec((err, result) => {
      err
        ? res.status(400).json({ error: err })
        : result
        ? res.status(200).json({ result: result })
        : res.status(400).json({ error: err });
    });
  } else if (data.by === "dob") {
    getAgeWise(data.search);
  } else {
    data.contains === "contains"
      ? getContainsResult(data.search, data.by)
      : getEqualResult(data.search, data.by);
  }
};
exports.getAttendee = (req, res) => {
  db.Registration.findOne({ _id: req.params.org_id }).exec((err, result) => {
    result
      ? res.status(200).json({ result: result })
      : err
      ? res.status(200).json({ error: err })
      : res.status(200).json({ error: "Error @getAttendee Else-Block" });
  });
};
