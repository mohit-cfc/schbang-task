const courseModel = require("../schema/course");
const returnMessage = require("../utils/message");
const authUser = require("../utils/authUser");

module.exports = {
  index: async (req, res) => {
    try {
      const user = await authUser.getUser(req, res);
      if (user) {
        const courses = await courseModel.find({});
        const result = courses.filter((c) => c.isApproved == true);
        returnMessage.successMessage(res, "Got all Approved Courses", result);
      } else {
        returnMessage.errorMessage(res, "Not logged in");
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  showAll: async (req, res) => {
    try {
      const user = await authUser.getUser(req, res);
      if (user) {
        const courses = await courseModel.find({});
        returnMessage.successMessage(res, "Got all Courses", courses);
      } else {
        returnMessage.errorMessage(res, "Not logged in");
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const user = await authUser.getUser(req, res);
      if (user.role == "admin") {
        const {title} = req.body;
        const isNameTaken = await courseModel.findOne({title});
        if (isNameTaken) {
          returnMessage.errorMessage(res, "Course Already Exists");
        }

        const course = await courseModel.create({
          ...req.body,
          isApproved: false,
        });
        returnMessage.successMessage(
          res,
          "Course Successfully Created",
          course
        );
      } else {
        returnMessage.errorMessage(res, "You need to be an admin");
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const user = await authUser.getUser(req, res);
      if (user.role == "admin") {
        await courseModel.findByIdAndUpdate(req.params["id"], {
          ...req.body,
          isApproved: false,
        });
        const course = await courseModel.findById(req.params["id"]);
        returnMessage.successMessage(
          res,
          "Course Updated Successfully",
          course
        );
      } else {
        returnMessage.errorMessage(res, "You need to be an admin");
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  approve: async (req, res) => {
    try {
      const user = await authUser.getUser(req, res);
      if (user.role == "super-admin") {
        await courseModel.findByIdAndUpdate(req.params["id"], {
          isApproved: true,
        });
        const course = await courseModel.findById(req.params["id"]);
        returnMessage.successMessage(
          res,
          "Course Approved by Super Admin",
          course
        );
      } else {
        returnMessage.errorMessage(res, "You need to be a super admin");
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const user = await authUser.getUser(req, res);
      if (user.role == "admin") {
        const course = await courseModel.remove({
          _id: req.params["id"],
        });
        returnMessage.successMessage(res, "Deleted Successfully");
      } else {
        returnMessage.errorMessage(res, "You need to be an admin");
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const user = await authUser.getUser(req, res);
      if (user) {
        const course = await courseModel.findOne({
          _id: req.params["id"],
        });
        if (course.isApproved == true) {
          returnMessage.successMessage(res, "Showing Course", course);
        } else {
          returnMessage.errorMessage(res, "Course not approved");
        }
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
