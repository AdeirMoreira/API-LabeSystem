import { app } from "./app";
import changeTeacherClass from "./EndPoints/changeTeacherClass";
import createStudent from "./EndPoints/createStudents";
import createTeacher from "./EndPoints/createTeacher";
import getAllTeachers from "./EndPoints/getAllTeachers";
import getAllStudents  from "./EndPoints/getAllStudents";
import searchStudent from "./EndPoints/searchStudent";
import studentChangeClass from "./EndPoints/studentChangeClass";
import getAllClass from "./EndPoints/getAllClass";
import getActiveClass from "./EndPoints/getActiveClass";
import getClassData from "./EndPoints/getClassData";
import changeClassModule from "./EndPoints/changeClassModule";
import CreateClass from "./EndPoints/createClass";



app.get('/estudantes', getAllStudents)

app.get('/estudantes/search', searchStudent)

app.get("/docentes", getAllTeachers );

app.get('/turma', getAllClass)

app.get('/turma/active', getActiveClass)

app.get('/turma/data/:turma_id',getClassData)

app.put('/estudantes', studentChangeClass)

app.put("/docentes", changeTeacherClass)

app.put("/turma", changeClassModule)

app.post('/estudantes', createStudent)

app.post("/docentes", createTeacher);

app.post('/estudantes', createStudent)

app.post('/turma', CreateClass)






