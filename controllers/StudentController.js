const path = require("path");
const Student = require("../models/StudentModel");
const fs = require("fs");

const displayHome = (req, res) => {
  res.render("index");
};
const addStudent = (req, res) => {
  res.render("addStudent");
};

const displayStudents = async (req, res) => {
  const data = await Student.find();
  if (data) {
    res.render("displayStudents", { studentData: data });
  } else {
    res.render("index");
  }
};

const addNewStudent = (req, res) => {
  const { fullname, age, department, address } = req.body;
  const { image } = req.files;

  image.mv(path.join(__dirname, "../public/images", image.name), (error) => {
    if (!error) {
      Student.create(
        {
          fullname: fullname,
          age: age,
          department: department,
          address: address,
          image: image.name,
        },
        (error) => {
          if (!error) {
            res.redirect("displayStudents");
          } else {
            res.redirect("addStudent");
          }
        }
      );
    }
  });
  //console.log(fullname,age,department,address,image)
};
const deleteStudent = (req, res) => {
  const { id } = req.query;

 Student.findById(id, (error, doc) => {
    if (!error) {
      const pic = path.resolve(__dirname, "../public/images/", doc.image);
      fs.unlinkSync(pic);

      Student.findByIdAndDelete(id, (error, data) => {
        if (!error) {
          res.redirect("displayStudents");
        } else {
          res.redirect("displayHome");
        }
      });
    }
  });
};
const updateStudent = async (req, res) => {
  const { id } = req.query;
  //console.log(id)
  const data = await Student.findById(id);
  if (data) {
    res.render("updateStudent", { updatedStudent: data });
  } else {
    res.redirect("displayStudents");
  }

  //res.redirect('updateStudent');
};

const studentUpdated = (req, res) => {
  const { id } = req.query;
  const { fullname, age, department, address } = req.body;
  const { image } = req.files;

  image.mv(path.resolve(__dirname, "../public/images", image.name), (error) => {
    if (!error) {
      Student.findById(id, (error, data) => {
        if (!error) {
          const oldImg = path.resolve(
            __dirname,
            "../public/images",
            data.image
          );
          fs.unlinkSync(oldImg);

          Student.findByIdAndUpdate(
            id,
            {
              fullname: fullname,
              age: age,
              department: department,
              address: address,
              image: image.name,
            },
            (error, data) => {
              if (!error) {
                res.redirect("displayStudents");
              } else {
                res.redirect("updateStudent");
              }
            }
          );
        }
      });
    }
  });
};

module.exports = {
  displayHome,
  addStudent,
  displayStudents,
  addNewStudent,
  deleteStudent,
  updateStudent,
  studentUpdated,
};
