var http = require("http");
var url = require("url");
var fs = require("fs");

var faculty = require("./models/faculty");
var pulpit = require("./models/pulpit");
var teacher = require("./models/teacher");
var subject = require("./models/subject");
var auditorium_type = require("./models/auditorium_type");
var auditorium = require("./models/auditorium");

http.createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  if ((req.method == "GET") && (req.url.toString().split("/")[1] == "api")) {
    if (req.url.toString().split("/")[2] == "faculties") {
      faculty.selectFaculty(req, res);
    }
    else if (req.url.toString().split("/")[2] == "pulpits") {
      pulpit.selectPulpit(req, res);
    }
    else if (req.url.toString().split("/")[2] == "teachers") {
      teacher.selectTeacher(req, res);
    }
    else if (req.url.toString().split("/")[2] == "subjects") {
      subject.selectSubject(req, res);
    }
    else if (req.url.toString().split("/")[2] == "auditorium_types") {
      auditorium_type.selectAuditoriumType(req, res);
    }
    else if (req.url.toString().split("/")[2] == "auditoriums") {
      auditorium.selectAuditorium(req, res);
    }
  }

  if ((req.method == "POST") && (req.url.toString().split("/")[1] == "api")) {
    var body = {};
    if (req.url.toString().split("/")[2] == "faculties") {
      req.on("data", (chunk) => {
        body = chunk.toString();
        body = eval("(" + body + ")");
        faculty.insertFaculty(req, res, body.faculty, body.faculty_name)
      })
    }
    else if (req.url.toString().split("/")[2] == "pulpits") {
      req.on("data", (chunk) => {
        body = chunk.toString();
        body = eval("(" + body + ")");
        pulpit.insertPulpit(req, res, body.pulpit, body.pulpit_name, body.faculty)
      })
    }
    else if (req.url.toString().split("/")[2] == "teachers") {
      req.on("data", (chunk) => {
        body = chunk.toString();
        body = eval("(" + body + ")");
        teacher.insertTeacher(req, res, body.teacher, body.teacher_name, body.pulpit)
      })
    }
    else if (req.url.toString().split("/")[2] == "subjects") {
      req.on("data", (chunk) => {
        body = chunk.toString();
        body = eval("(" + body + ")");
        subject.insertSubject(req, res, body.subject, body.subject_name, body.pulpit)
      })
    }
    else if (req.url.toString().split("/")[2] == "auditorium_types") {
      req.on("data", (chunk) => {
        body = chunk.toString();
        body = eval("(" + body + ")");
        auditorium_type.insertAuditoriumType(req, res, body.auditorium_type, body.auditorium_typename)
      })
    }
    else if (req.url.toString().split("/")[2] == "auditoriums") {
      req.on("data", (chunk) => {
        body = chunk.toString();
        body = eval("(" + body + ")");
        auditorium.insertAuditorium(req, res, body.auditorium, body.auditorium_name, body.auditorium_capacity, body.auditorium_type)
      })
    }
  }

  if ((req.method == "PUT") && (req.url.toString().split("/")[1] == "api")) {
    var body = {};
    if (req.url.toString().split("/")[2] == "faculties") {
      req.on("data", (chunk) => {
        body = chunk.toString();
        body = eval("(" + body + ")");
        faculty.updateFaculty(req, res, body.faculty, body.faculty_name)
      })
    }
    else if (req.url.toString().split("/")[2] == "pulpits") {
      req.on("data", (chunk) => {
        body = chunk.toString();
        body = eval("(" + body + ")");
        pulpit.updatePulpit(req, res, body.pulpit, body.pulpit_name, body.faculty)
      })
    }
    else if (req.url.toString().split("/")[2] == "teachers") {
      req.on("data", (chunk) => {
        body = chunk.toString();
        body = eval("(" + body + ")");
        teacher.updateTeacher(req, res, body.teacher, body.teacher_name, body.pulpit)
      })
    }
    else if (req.url.toString().split("/")[2] == "subjects") {
      req.on("data", (chunk) => {
        body = chunk.toString();
        body = eval("(" + body + ")");
        subject.updateSubject(req, res, body.subject, body.subject_name, body.pulpit)
      })
    }
    else if (req.url.toString().split("/")[2] == "auditorium_types") {
      req.on("data", (chunk) => {
        body = chunk.toString();
        body = eval("(" + body + ")");
        auditorium_type.updateAuditoriumType(req, res, body.auditorium_type, body.auditorium_typename)
      })
    }
    else if (req.url.toString().split("/")[2] == "auditoriums") {
      req.on("data", (chunk) => {
        body = chunk.toString();
        body = eval("(" + body + ")");
        auditorium.updateAuditorium(req, res, body.auditorium, body.auditorium_name, body.auditorium_capacity, body.auditorium_type)
      })
    }
  }

  else if ((req.method == "DELETE") && (req.url.toString().split("/")[1] == "api")) {
    var xyz = req.url.toString().split("/")[3];
    if (req.url.toString().split("/")[2] == "faculties") {
      faculty.deletePulpit(req, res, xyz);
    }
    else if (req.url.toString().split("/")[2] == "pulpits") {
      pulpit.deletePulpit(req, res, xyz);
    }
    else if (req.url.toString().split("/")[2] == "teachers") {
      teacher.deleteTeacher(req, res, xyz);
    }
    else if (req.url.toString().split("/")[2] == "subjects") {
      subject.deleteTeacher(req, res, xyz);
    }
    else if (req.url.toString().split("/")[2] == "auditorium_types") {
      auditorium_type.deleteAuditoriumType(req, res, xyz);
    }
    else if (req.url.toString().split("/")[2] == "auditoriums") {
      auditorium.deleteAuditorium(req, res, xyz);
    }
  }
  else if (url.parse(req.url).pathname == "/") {
    var html = fs.readFileSync("./index.html");
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.end(html);
  }
}).listen(3000);
  
console.log("Server start on localhost:3000");