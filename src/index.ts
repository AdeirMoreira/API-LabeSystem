import { app } from "./app";
import Student from "./EndPoints/Student";
import TeacherSchool from "./EndPoints/Student";
import ClassSchool from "./EndPoints/Class";

const student = new Student()
const teacher = new TeacherSchool()
const classSchool = new ClassSchool()

app.get('/estudantes', student.getAll)

app.get('/estudantes/search', student.search)

app.get("/docentes", teacher.getAll );

app.get('/turma', classSchool.getAll)

app.get('/turma/active', classSchool.getActive)

app.get('/turma/data/:turma_id', classSchool.getData)

app.put('/estudantes', student.ChangeClass)

app.put("/docentes", teacher.ChangeClass)

app.put("/turma", classSchool.changeModule)

app.post('/estudantes', student.create)

app.post("/docentes", teacher.create);

app.post('/turma', classSchool.create)






