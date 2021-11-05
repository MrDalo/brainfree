import json
from typing import List
import datetime

filename = "database.json"


def user_database_template(username : str, number : int) -> dict:     
    database  = {
        f"{username}" : {  # prerobit na list
            f"week{number}" : {
                "urg-imp" : [],
                "urg-notImp" : [],
                "notUrg-imp" : [],
                "notUrg-notImp" : []
            },
            "colors" : {
                "urg-imp" : ("#FF0000", "#FFFFFF"), 
                "urg-notImp" : ("#FFFF00", "#FFFFFF"), 
                "notUrg-imp" : ("#00FF00", "#FFFFFF"), 
                "notUrg-notImp" : ("#0000FF", "#FFFFFF")}
        }
    }

    return database


def task_template(name : str, info : List[str]) -> dict:
    task = {
        "name" : f"{name}",
        "info" : info,
    }

    return task


def get_current_week() -> int:
    today = datetime.date.today()
    return today.isocalendar().week


def create_new_user(username : str) -> None:
    database = user_database_template(username, get_current_week())
    
    with open(filename, 'w') as file:
        json.dump(database, file)



def load_user_data() -> None:
    with open(filename, 'r') as file:
        data = json.load(file)
        print(data)


def save_user_data():
    
    pass

## Tests
get_current_week()
create_new_user("Adam Malik")

# End of file json-generator.py
