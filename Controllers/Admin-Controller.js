const Enroll = require("../Models/Enrollement-Model");

exports.getadmin = (req, res) => {
  res.render("admin");
};

exports.postadmin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (username === "RAHUL" && password === "12345") {
      res.render("getenroll");
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

//pending Enrollemnts
exports.getpending = async (req, res) => {
  try {
    const data = await Enroll.find({ approve: false });
    const viewdata = {
      enrolls: data,
    };
    res.render("pendingenroll", viewdata);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.editenroll = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Enroll.findById(id);
    if (!data) {
      return res.status(404).send("Enrollment not found");
    }
    const viewdata = {
      data: data,
      id: data._id, // Mongoose uses _id by default
    };
    res.render("editenroll", viewdata);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateenroll = async (req, res) => {
  try {
    console.log("body in update", req.body);
    const id = req.body.expenseid;
    console.log("data id,", id);
    const updatedFields = {
      name: req.body.name,
      age: req.body.age,
      houseno: req.body.houseno,
      street: req.body.street,
      city: req.body.city,
      district: req.body.district,
      postalcode: req.body.postalcode,
      gender: req.body.gender,
      dob: req.body.dob,
      phonenumber: req.body.phonenumber,
    };
    
    const data = await Enroll.findByIdAndUpdate(id, updatedFields, { new: true });
    console.log("DATA after update", data);
    res.redirect("/pending");
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

// approve enrollemnet
exports.approved = async (req, res) => {
  try {
      const data = await Enroll.find({ approve: true });
      const viewdata = {
          enrolls: data,
      };
      res.render('approvedenroll', viewdata);
  } catch (error) {
      console.log("Error:", error);
      res.status(500).send("Internal Server Error");
  }
};

//for approval
exports.forapproval = async (req, res) => {
  try {
      const id = req.params.id;
      const status = await Enroll.findByIdAndUpdate(id, { approve: true }, { new: true });
      if (status) {
          res.status(200).redirect('/approving');
      } else {
          res.status(404).send("Enrollment not found or could not be updated.");
      }
  } catch (error) {
      console.log("Error in forapproval controller: ", error);
      res.status(500).send("Internal Server Error");
  }
}
