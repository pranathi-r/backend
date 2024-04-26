/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },

  "GET /articles/list": "ArticlesController.list",
  "POST /signup": "UsignupController.signup",
  "POST /signin": "UsigninController.signin",
  "POST /create": "AddTeacherController.create",
  "GET /teacher": "AddTeacherController.teacher",
  "DELETE /del/:id": "AddTeacherController.del",
  "PUT /update/:id": "AddTeacherController.update",
  "GET /find/:id": "AddTeacherController.findy",
  "GET /count": "DashboardController.getCount",
  "GET /countByDepartment": "DashboardController.getCountByDepartment",

  "POST /creating": "AddStudentController.creating",
  "GET /fetchAllstudent": "AddStudentController/fetchAllstudent",
  "DELETE /delStudent/:id": "AddStudentController/delStudent",
  "PUT /updateStudent/:id": "AddStudentController/updateStudent",
  "GET /findOneStudent/:id": "AddStudentController/findOneStudent",

  "GET /getCountStudent": "DashboardControllerStudent.getCountStudent",
  "GET /getCountByDepartmentStudent/dept":
    "DashboardStudentController.getCountByDepartmentStudent",

  "GET /findUser/:id": "UsigninController.findUser",

  "GET /findDegree/:id": "AddTeacherController.findDegree",
  "GET /studentBacklog": "AddStudentController.studentBacklog",

  "GET /filterTeachers/filter": "AddTeacherController.filterTeachers",
  "GET /students/byDepartment": "AddStudentController.students",
  "GET /teacherFind/byDesignation": "AddTeacherController.teacherFind",
  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
