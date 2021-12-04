##
#   @file communication.py
#
#   @brief Contains communication with server and database
#   @author Partik Sehnoutek, xsehno01
#

import requests
import json

url = "http://wedevs.sk:8080"
headers = {'Content-Type': 'application/json; charset=utf-8'}


## Function find_user
# @brief Sends request to create a new user in database
#
# @param username User name
# @param password User Password
# @param email User email address
#
# @return Returns response text or Error if request was not successful
def create_new_user(username: str, password: str, email: str):
    new_user = {\
        "username": username,\
        "password": password,\
        "email": email\
    }

    response = requests.post(f"{url}/users", json=new_user, headers=headers, verify=False)

    if response.status_code == 200:
        return response.text
    else:
        return "Error"


## Function log_in_user
# @brief Sends request to log user to application
#
# @param username User name
# @param password User password
#
# @return Returns response text or Error if request was not successful
def log_in_user(username: str, password: str):
    user_data = {\
        "username": username,\
        "password": password\
    }

    response = requests.post(f"{url}/login", json=user_data, headers=headers, verify=False)

    if response.status_code == 200:
        return response.text
    else:
        return "Error"


## Function find_user
# @brief Sends request to find user from database
#
# @param username User name
#
# @return Returns response text or Error if request was not successful
def find_user(username: str):
    response = requests.get(f"{url}/users/{username}")

    if response.status_code == 200:
        return response.text
    else:
        "Error"


## Function delete_user
# @brief Sends request to delete user from database
#
# @param username User name
#
# @return Returns response text or Error if request was not successful
def delete_user(username: str):
    response = requests.delete(f"{url}/users/{username}")

    if response.status_code == 200:
        return response.text
    else:
        "Error"


## Function load_user_tasks
# @brief Sends request to load all user tasks data
#
# @param username User name
# @param password User password
#
# @return Returns response text in a json format or Error
# if request was not successful
def load_user_tasks(username: str):
    response = requests.get(f"{url}/tasks/{username}")

    json_data = "NotFound"
    if response.text != "NotFound":
        json_data = json.loads(response.text)
    if response.status_code == 200:
        return json_data
    else:
        return "Error"


## Function create_new_task
# @brief Sends request to create a new task in database
#
# @param name Task name
# @param info Task Description
# @param prior Task priority
# @param date Task deadline
# @param complete Completed/Incompleted task
# @param username User name
#
# @return Returns response text in a json format or Error
# if request was not successful
def create_new_task(name: str, info: str, prior: str, date: str, complete: int, username: str):
    task_data = {\
        "name": name,\
        "description": info,\
        "priority": prior,\
        "deadline": date,\
        "complete": str(complete),\
        "user": username\
    }

    response = requests.post(f"{url}/tasks", json=task_data, headers=headers, verify=False)

    if response.status_code == 200:
        json_data = json.loads(response.text)
        return json_data
    else:
        return "Error"


## Function update_task
# @brief Sends request to update task data in database
#
# @param task_id Task ID
# @param name Task name
# @param info Task Description
# @param prior Task priority
# @param date Task deadline
# @param complete Completed/Incompleted task
# @param username User name
#
# @return Returns response text in a json format or Error
# if request was not successful
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

    if response.status_code == 200:
        json_data = json.loads(response.text)
        return json_data
    else:
        return "Error"


## Function delete_user_tasks
# @brief Sends request to delete all user tasks
#
# @param username User name
#
# @return Returns response text or Error if request was not successful
def delete_user_tasks(username: str):
    response = requests.delete(f"{url}/taskByUser/{username}")

    if response.status_code == 200:
        return response.text
    else:
        return "Error"


## Function delete_task_by_id
# @brief Sends request to delete a task with the given ID
#
# @param task_id Task ID
#
# @return Returns response text in a json format or Error
# if request was not successful
def delete_task_by_id(task_id: int):
    response = requests.delete(f"{url}/taskById/{task_id}")

    if response.text == "NotFound":
        return response.text
    elif response.status_code == 200:
        json_data = json.loads(response.text)
        return json_data
    else:
        return "Error"

