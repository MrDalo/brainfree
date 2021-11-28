import requests

url = "http://wedevs.sk:8080"
headers = {'Content-Type': 'application/json; charset=utf-8'}


# Check response code
def check_response_code(code: int) -> bool:
    if code == 200:
        return True
    elif code == 404:  # TODO: vypisat nejaku hlasku
        return False
    elif code == 500:  # TODO: vypisat nejaku hlasku
        return False


# Create new user
# POST http://localhost:8080/users    body: {
#                                         username : "example",
#                                         password : "example",
#                                         email : "example"
#                                     }
def create_new_user(username: str, password: str, email: str):
    new_user = {\
        "username": username,\
        "password": password,\
        "email": email\
    }

    response = requests.post(f"{url}/users", json=new_user, headers=headers, verify=False)

    print(response)
    print(response.text)
    if response.status_code == 200:
        return response.text
    else:
        return "Error"


# Log in user
# POST http://localhost:8080/login    body: {
#                                         username: "example"
#                                         password: "example"
#                                     }
def log_in_user(username: str, password: str):
    user_data = {\
        "username": username,\
        "password": password\
    }

    response = requests.post(f"{url}/login", json=user_data, headers=headers, verify=False)

    print(response)
    print(response.text)
    # TODO: uzivatel sa prihlasi, mozno nieco vratit z funkcie
    if response.status_code == 200:
        return response.text
    # TODO: vypisat chybovu hlasku, uzivatel sa neprihlasi
    else:
        return "Error"


# Find user by username /users/{username}
# GET http://localhost:8080/users/example
def find_user(username : str) -> None:
    response = requests.get(f"{url}/users/{username}")

    print(response)
    print(response.text)
    if response.status_code == 200:
        pass
    else:
        pass


# Delete user
# DELETE http://localhost:8080/users/example
def delete_user(username: str) -> None:
    response = requests.delete(f"{url}/users/{username}")

    print(response)
    print(response.text)
    if response.status_code == 200:
        pass
    else:
        pass


# Load user tasks /tasks
# GET http://localhost:8080/tasks/example
def load_user_tasks(username: str) -> None:  # zmenit navratovy typ
    response = requests.get(f"{url}/tasks/{username}")

    print(response)
    print(response.text)
    if response.status_code == 200:
        return response.text  # response.content
    else:
        return -1  # chyba


# Create new tasks
# POST http://localhost:8080/tasks    body: {
#                                         "name" : "example",
#                                         "description" : "example",
#                                         "priority" : "example",
#                                         "deadline" : "1111-11-11",
#                                         "complete" : 0,
#                                         "user" : "example"
#                                     }
def create_new_task(name: str, info: str, prior: str, date: str, complete: int, username: str) -> None:
    task_data = {\
        "name": name,\
        "description": info,\
        "priority": prior,\
        "deadline": date,\
        "complete": str(complete),\
        "user": username\
    }

    response = requests.post(f"{url}/tasks", json=task_data, headers=headers, verify=False)

    print(response)
    print(response.text)
    if response.status_code == 200:
        return response.text
    else:
        return "Error"


# Update task
#PUT http://localhost:8080/tasks/1   body: {
#                                        "name" : "example",
#                                        "description" : "example",
#                                        "priority" : "example",
#                                        "deadline" : "1111-11-11",
#                                        "complete" : 0
#                                        "user" : "example"
#                                    }
def update_task(user_id: int, name: str, info: str, prior: str, date: str, complete: int, username: str) -> None:
    task_data = {\
        "name": name,\
        "description": info,\
        "priority": prior,\
        "deadline": date,\
        "complete": str(complete),\
        "user": username\
    }

    response = requests.put(f"{url}/tasks/{user_id}", json=task_data, headers=headers, verify=False)

    print(response)
    print(response.text)
    if response.status_code == 200:
        pass
    else:
        pass


# Delete all tasks by user
# DELETE http://localhost:8080/taskByUser/example
def delete_user_tasks(username : str) -> None:
    response = requests.delete(f"{url}/taskByUser/{username}")

    print(response)
    print(response.text)
    if response.status_code == 200:
        pass
    else:
        pass



# Delete task by id
#DELETE http://localhost:8080/taskById/1
def delete_task_by_id(id: str) -> None:
    response = requests.delete(f"{url}/taskById/{id}")

    print(response)
    print(response.text)
    if response.status_code == 200:
        pass
    else:
        pass


"""---------- Testy ----------"""
"""
print("### LOG IN with unknown account: ")
log_in_user("example0", "example0")
print("### CREATE new user (example0): ")
create_new_user("example0", "example0", "example0")
print("### FIND user account: ")
find_user("example0")
print("### LOG IN to new account (example0): ")
log_in_user("example0", "example0")
print("### LOAD user tasks: ")
load_user_tasks("example0")
print("### CREATE new task: ")
create_new_task("nova", "toto je novy task od pata", "do", "1111-11-11", 1, "example0")
print("### CREATE new task: ")
create_new_task("nove2", "task na vymazanie", "do", "9999-11-11", 1, "example0")
print("### DELETE task by id: ")
delete_task_by_id(24)
print("### UPDATE new task: ")
update_task(23, "update sprava", "toto je novy task od pata", "do", "1111-11-11", 1, "example0")
print("### LOAD user tasks: ")
load_user_tasks("example0")
print("### DELETE all user tasks: ")
delete_user_tasks("example0")
print("### LOAD user tasks: ")
load_user_tasks("example0")
print("### DELETE user: ")
delete_user("example0")
print("### FIND user: ")
find_user("example0")

"""