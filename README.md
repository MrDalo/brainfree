# BrainFree
ITU project 2021/2022

Createdd by:
Dalibor Králik (xkrali20)
Patrik Sehnoutek (xsehno01)
Adam Kulla (xkulla01)


node.js inštalácia: https://expressjs.com/en/starter/installing.html
inšpirácia: https://codeshack.io/basic-login-system-nodejs-express-mysql/


API refference:

post /users //create new user

    POST http://localhost:8080/users    body: {
                                            username : "example",
                                            password : "example",
                                            email : "example"
                                        }


get /users/:username //find user by username

    GET http://localhost:8080/users/example



delete /users/:username //delete user by username

    DELETE http://localhost:8080/users/example


post /login //check user credentials, returns token when correct

    POST http://localhost:8080/login    body: {
                                            username: "example"
                                            password: "example"
                                        }

post /tasks //create new task

    POST http://localhost:8080/tasks    body: {
                                            "name" : "example",
                                            "description" : "example",
                                            "priority" : "example",
                                            "deadline" : "1111-11-11",
                                            "complete" : 0,
                                            "user" : "example"
                                        }


get /tasks/:user //find all tasks from user

    GET http://localhost:8080/tasks/example

put /tasks/:taskId //update properties of task by id

    PUT http://localhost:8080/tasks/1   body: {
                                            "name" : "example",
                                            "description" : "example",
                                            "priority" : "example",
                                            "deadline" : "1111-11-11",
                                            "complete" : 0
                                        }


delete /taskById/:taskId //delete a task by id

    DELETE http://localhost:8080/taskById/1

delete /taskByUser/:user //delete all tasks created by user

    DELETE http://localhost:8080/taskById/example