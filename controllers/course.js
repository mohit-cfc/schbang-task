const courseModel = require("../schema/course");
const returnMessage = require("../utils/message");

module.exports = {
  index: async (req, res) => {
    try {
      const courses = await courseModel.find({});
      returnMessage.successMessage(res, "Got all Courses", courses);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const {title} = req.body;
      const isNameTaken = await courseModel.findOne({title});
      if (isNameTaken) {
        returnMessage.errorMessage(res, "Course Already Exists");
      }

      const course = await courseModel.create({...req.body, isApproved: false});
      returnMessage.successMessage(res, "Course Successfully Created", course);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const course = await courseModel.findByIdAndUpdate(req.params["id"], {
        ...req.body,
      });
      returnMessage.successMessage(res, "Course Updated Successfully", course);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const course = await courseModel.remove({
        _id: req.params["id"],
      });
      returnMessage.successMessage(res, "Deleted Successfully");
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const course = await courseModel.findOne({
        _id: req.params["id"],
      });
      returnMessage.successMessage(res, "Showing Course", course);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
