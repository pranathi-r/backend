

module.exports = {
  // async creating(req, res) {
  //   try {
  //     const student = await Addstudent.create(req.body).fetch();
  //     return res.status(201).json(student);
  //   } catch (error) {
  //     return res.status(500).json({ error: "Server Error" });
  //   }
  // },

  async creating(req, res) {
    try {
      // Check if the provided USN already exists in the database
      const existingStudent = await Addstudent.findOne({ usn: req.body.usn });
      if (existingStudent) {
        return res.status(400).json({ error: "USN already exists" });
      }

      // If the USN is unique, create the new student record
      const student = await Addstudent.create(req.body).fetch();
      return res.status(201).json(student);
    } catch (error) {
      return res.status(500).json({ error: "Server Error" });
    }
  },

  async fetchAllstudent(req, res) {
    try {
      const student = await Addstudent.find();
      return res.json(student);
    } catch (error) {
      console.error("Error Fetching Students", error);
      return res.status(500).json({ error: "Server Error" });
    }
  },

  async delStudent(req, res) {
    try {
      const studentId = req.param("id"); // Assuming you're passing the teacher ID as a parameter

      // Delete the teacher record from the database
      await Addstudent.destroy({ id: studentId });

      return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Server Error" });
    }
  },

  async updateStudent(req, res) {
    try {
      const existingStudent = await Addstudent.findOne({ usn: req.body.usn });

      if (existingStudent && existingStudent.id !== req.params.id) {
        return res.status(400).json({ error: "USN must be unique." });
      }

      const updatedStudent = await Addstudent.updateOne({
        id: req.params.id,
      }).set(req.body);
      if (!updatedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.status(200).json(updatedStudent);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the student." });
    }
  },

  async findOneStudent(req, res) {
    try {
      const studentId = req.param("id");
      const student = await Addstudent.findOne({ id: studentId });

      if (!student) {
        return res.notFound({ error: "Student not found" });
      }

      return res.ok(student);
    } catch (error) {
      console.error("Error Fetching Student", error);
      return res.serverError({ error: "Server Error" });
    }
  },

  async studentBacklog(req, res) {
    try {
      const studentsWithBacklogs = await Addstudent.find({
        backlogs: { ">": 0 }, // Find students with backlogs greater than zero
      });
      return res.json(studentsWithBacklogs);
    } catch (error) {
      return res.serverError(error);
    }
  },

 async students(req, res) {
    try {
      const { dept } = req.query;
      if (!dept) {
        return res.status(400).json({ error: "Department name is required." });
      }
      const students = await Addstudent.find({ department: dept });
      if (students.length === 0) {
        return res.status(404).json({ error: "No students found in this department." });
      }
      return res.json(students.map((student) => student.name));
    } catch (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).json({ error: "Internal server error." });
    }
  },
}


 // async updateStudent(req, res) {
  //   try {
  //     const updatedStudent = await Addstudent.updateOne({
  //       id: req.params.id,
  //     }).set(req.body);
  //     if (!updatedStudent) {
  //       return res.status(404).json({ error: "Student not found" });
  //     }
  //     res.status(200).json(updatedStudent);
  //   } catch (error) {
  //     res
  //       .status(500)
  //       .json({ error: "An error occurred while updating the student." });
  //   }
  // },