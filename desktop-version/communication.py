import requests
import json

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
def load_user_tasks(username: str):  # zmenit navratovy typ
    response = requests.get(f"{url}/tasks/{username}")

    print(response)
    print(response.text)
    json_data = "NotFound"
    if response.text != "NotFound":
        json_data = json.loads(response.text)
    print(json_data)
    if response.status_code == 200:
        return json_data  # response.content
    else:
        return "Error"  # chyba

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
    json_data = json.loads(response.text)
    print(json_data)
    if response.status_code == 200:
        return json_data
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
def update_task(task_id: int, name: str, info: str, prior: str, date: str, complete: int, username: str):
    task_data = {\
        "name": name,\
        "description": info,\
        "priority": prior,\
        "deadline": date,\
        "complete": str(complete),\
        "user": username\
    }

    response = requests.put(f"{url}/tasks/{task_id}", json=task_data, headers=headers, verify=False)

    print(response)
    json_data = json.loads(response.text)
    print(json_data)
    if response.status_code == 200:
        return json_data
    else:
        return "Error"


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

    if response.text == "NotFound":
        return response.text
    elif response.status_code == 200:
        json_data = json.loads(response.text)
        return json_data
    else:
        return "Error"

