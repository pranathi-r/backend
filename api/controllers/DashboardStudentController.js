module.exports = {
  async getCountStudent(req, res) {
    try {
      const count = await Addstudent.count();
      return res.json({ count });
    } catch (err) {
      return res.serverError(err);
    }
  },

  async getCountByDepartmentStudent(req, res) {
    //   try {
    //     const departmentCounts = {};
    //     const departments = ["cse", "ise", "ece", "eee", "aiml"]; // Specify your department names

    //     for (const department of departments) {
    //       const count = await Addstudent.count({ department });
    //       departmentCounts[department] = count;
    //     }

    //     return res.json(departmentCounts);
    //   } catch (err) {
    //     return res.serverError(err);
    //   }
    // },
    try {
      const { dept } = req.query;
      console.log(dept) // Get the department name from the query parameters
      if (!dept) {
        return res.badRequest("Department name is required.");
      }
        console.log(dept)
      // Assuming you have a Student model
      const students = await AddStudent.find({ department: dept });

      if (!students || students.length === 0) {
        return res.notFound("No students found for the given department.");
      }

      return res.ok(students); // Send the fetched students in the response
    } catch (error) {
      console.error("Error fetching students by department:", error);
      return res.serverError("Internal server error");
    }
  },
};
