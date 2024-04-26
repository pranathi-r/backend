

module.exports = {
  async create(req, res) {
    try {
      const doctor = await Addteacher.create(req.body).fetch();
      return res.status(201).json(doctor);
    } catch (error) {
      return res.status(500).json({ error: "Server Error" });
    }
  },

  async teacher(req, res) {
    try {
      const teacher = await Addteacher.find();
      return res.json(teacher);
    } catch (error) {
      console.error("Error Fetching Teachers", error);
      return res.status(500).json({ error: "Server Error" });
    }
  },

  async del(req, res) {
    try {
      const teacherId = req.param("id"); // Assuming you're passing the teacher ID as a parameter

      // Delete the teacher record from the database
      await Addteacher.destroy({ id: teacherId });

      return res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Server Error" });
    }
  },

  // async update(req, res) {
  //   const TeacherId = req.param("id");
  //   const newData = req.allParams();
  //   try {
  //     const updatedTeacher = await Addteacher.updateOne({ id: TeacherId }).set(
  //       newData
  //     );
  //     if (!updatedTeacher) {
  //       return res.notFound("Teacher not found.");
  //     }
  //     return res.ok(updatedTeacher);
  //   } catch (error) {
  //     return res.serverError(error);
  //   }
  // },

  async update(req, res) {
    try {
      const updatedTeacher = await Addteacher.updateOne({
        id: req.params.id,
      }).set(req.body);
      if (!updatedTeacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }
      res.status(200).json(updatedTeacher);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the teacher." });
    }
  },

  async findy(req, res) {
    try {
      const teacherId = req.param("id");
      const teacher = await Addteacher.findOne({ id: teacherId });

      if (!teacher) {
        return res.notFound({ error: "Teacher not found" });
      }

      return res.ok(teacher);
    } catch (error) {
      console.error("Error Fetching Teacher", error);
      return res.serverError({ error: "Server Errory" });
    }
  },

  async findDegree(req, res) {
    try {
      const teacherId = req.param("id");
      const teacher = await Addteacher.findOne({ id: teacherId });

      if (!teacher) {
        return res.notFound({ error: "Teacher not found" });
      }

      const teacherDetails = {
        degree: teacher.degree,
        designation: teacher.designation,
      };

      return res.ok(teacherDetails);
    } catch (error) {
      console.error("Error Fetching Teacher", error);
      return res.serverError({ error: "Server Error" });
    }
  },

  async filterTeachers(req, res) {
    try {
      const { value } = req.query;

      // Construct the criteria object based on the value received
      const criteria = {
        or: [
          { name: { contains: value } },
          { department: { contains: value } },
          { gender: { contains: value } },
          { experience: { contains: value } },
          { designation: { contains: value } },
          { degree: { contains: value } },
          { country: { contains: value } },
          // Add more attributes as needed
        ],
      };

      // Find teachers based on the constructed criteria
      const filteredTeachers = await Addteacher.find(criteria);

      // Return the filtered data
      return res.json(filteredTeachers);
    } catch (error) {
      // Handle any errors, such as database query errors
      return res.serverError(error.message);
    }
  },

  async teacherFind(req, res) {
    try {
      const { designation } = req.query; // Use req.query to get query parameters
      const teachers = await Addteacher.find({ designation });
      const teacherNames = teachers.map((teacher) => teacher.name);
      return res.json(teacherNames);
    } catch (error) {
      return res.serverError(error);
    }
  },
};
