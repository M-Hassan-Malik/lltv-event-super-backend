const db = require("../models");

exports.getAdmins = (req, res) => {
  let { limit, startFrom, selection } = req.body.data;
  selection !== "all"
    ? db.Registration.find({ user_type: selection })
        .skip(startFrom)
        .limit(limit)
        .exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        })
    : db.Registration.find()
        .skip(startFrom)
        .limit(limit)
        .exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        });
};
exports.getOrganizers = (req, res) => {
  let data = JSON.parse(req.body.data);

  const getContainsResult = (value, field) => {
    field === "fname"
      ? db.Registration.find({
          user_type: "organizer",
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
          user_type: "organizer",
          email: { $regex: value, $options: "i" },
        }).exec((err, result) => {
          err
            ? res.status(400).json({ error: err })
            : result
            ? res.status(200).json({ result: result })
            : res.status(400).json({ error: err });
        })
      : db.Registration.find({
          user_type: "organizer",
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
    field === "fname"
      ? db.Registration.find({ user_type: "organizer", fname: value }).exec(
          (err, result) => {
            err
              ? res.status(400).json({ error: err })
              : result
              ? res.status(200).json({ result: result })
              : res.status(400).json({ error: err });
          }
        )
      : field === "email"
      ? db.Registration.find({ user_type: "organizer", email: value }).exec(
          (err, result) => {
            err
              ? res.status(400).json({ error: err })
              : result
              ? res.status(200).json({ result: result })
              : res.status(400).json({ error: err });
          }
        )
      : db.Registration.find({ user_type: "organizer", country: value }).exec(
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
      user_type: "organizer",
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
    db.Registration.find({ user_type: "organizer" }).exec((err, result) => {
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

exports.getOrganizersChartData = (req, res) => {
  try {
    db.Registration.aggregate([
      {
        $match: { user_type: "organizer" },
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
        db.Registration.countDocuments({ user_type: "organizer" }).exec(
          (err, count) => {
            err
              ? res.status(400).json({ error: err })
              : count
              ? res.status(200).json({
                  result: { total: count, chartData: monthlyEventCreated },
                })
              : res.status(400).json({
                  error: "Error in getOrganizersChartData @total @catch-block",
                });
          }
        );
    });
  } catch (e) {
    console.log("Error at catch-block @getAttendeesChartData:", String(e));
  }
};
