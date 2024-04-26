// api/controllers/DashboardController.js

module.exports = {
  async getCount(req, res) {
    try {
      const count = await Addteacher.count();
      return res.json({ count });
    } catch (err) {
      return res.serverError(err);
    }
  },

  async getCountByDepartment(req, res) {
    try {
      const departmentCounts = {};
      const departments = ["cse", "ise", "ece", "eee", "aiml"]; // Specify your department names

      for (const department of departments) {
        const count = await Addteacher.count({ department });
        departmentCounts[department] = count;
      }

      return res.json(departmentCounts);
    } catch (err) {
      return res.serverError(err);
    }
  },
};
