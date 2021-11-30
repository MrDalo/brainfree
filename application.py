from PyQt5 import QtWidgets, QtCore
from login import Ui_LoginPage
import datetime
import sys
from PyQt5.QtWidgets import QApplication, QStackedWidget

from responsive import Ui_Window
from communication import *
from task_list import Ui_TaskList

from PyQt5 import QtGui
from PyQt5.QtGui import *


class Window(QtWidgets.QMainWindow, Ui_Window):
    def __init__(self):
        super().__init__()
        self.setupUi(self)

        # BUTTONS - HOME, TASK LIST, GUIDE, LOG OUT, SAVE, DELETE
        self.logOutButton.clicked.connect(self.log_out)
        self.saveTaskButton.clicked.connect(self.save_task)
        self.deleteTaskButton.clicked.connect(self.delete_task)

        self.homeButton.clicked.connect(lambda: self.change_stack_widget(0))
        self.myTaskButton.clicked.connect(lambda: self.change_stack_widget(1))
        self.guideButton.clicked.connect(lambda: self.change_stack_widget(2))

        # ADD TASKS (+) BUTTONS
        self.addDoTask.clicked.connect(lambda: self.add_prior_task("do"))
        self.addScheduleTask.clicked.connect(lambda: self.add_prior_task("schedule"))
        self.addDelegateTask.clicked.connect(lambda: self.add_prior_task("delegate"))
        self.addDeleteTask.clicked.connect(lambda: self.add_prior_task("delete"))

        # TASKs BUTTONS
        self.do_task1_button.clicked.connect(lambda: self.load_task_data(1, self.do_task1_button.property("ID")))
        self.do_task2_button.clicked.connect(lambda: self.load_task_data(2, self.do_task2_button.property("ID")))
        self.do_task3_button.clicked.connect(lambda: self.load_task_data(3, self.do_task3_button.property("ID")))
        self.do_task4_button.clicked.connect(lambda: self.load_task_data(4, self.do_task4_button.property("ID")))
        self.do_task5_button.clicked.connect(lambda: self.load_task_data(5, self.do_task5_button.property("ID")))
        self.do_task6_button.clicked.connect(lambda: self.load_task_data(6, self.do_task6_button.property("ID")))

        self.schedule_task1_button.clicked.connect(lambda: self.load_task_data(1, self.schedule_task1_button.property("ID")))
        self.schedule_task2_button.clicked.connect(lambda: self.load_task_data(2, self.schedule_task2_button.property("ID")))
        self.schedule_task3_button.clicked.connect(lambda: self.load_task_data(3, self.schedule_task3_button.property("ID")))
        self.schedule_task4_button.clicked.connect(lambda: self.load_task_data(4, self.schedule_task4_button.property("ID")))
        self.schedule_task5_button.clicked.connect(lambda: self.load_task_data(5, self.schedule_task5_button.property("ID")))
        self.schedule_task6_button.clicked.connect(lambda: self.load_task_data(6, self.schedule_task6_button.property("ID")))

        self.delegate_task1_button.clicked.connect(lambda: self.load_task_data(1, self.delegate_task1_button.property("ID")))
        self.delegate_task2_button.clicked.connect(lambda: self.load_task_data(2, self.delegate_task2_button.property("ID")))
        self.delegate_task3_button.clicked.connect(lambda: self.load_task_data(3, self.delegate_task3_button.property("ID")))
        self.delegate_task4_button.clicked.connect(lambda: self.load_task_data(4, self.delegate_task4_button.property("ID")))
        self.delegate_task5_button.clicked.connect(lambda: self.load_task_data(5, self.delegate_task5_button.property("ID")))
        self.delegate_task6_button.clicked.connect(lambda: self.load_task_data(6, self.delegate_task6_button.property("ID")))

        self.delete_task1_button.clicked.connect(lambda: self.load_task_data(1, self.delete_task1_button.property("ID")))
        self.delete_task2_button.clicked.connect(lambda: self.load_task_data(2, self.delete_task2_button.property("ID")))
        self.delete_task3_button.clicked.connect(lambda: self.load_task_data(3, self.delete_task3_button.property("ID")))
        self.delete_task4_button.clicked.connect(lambda: self.load_task_data(4, self.delete_task4_button.property("ID")))
        self.delete_task5_button.clicked.connect(lambda: self.load_task_data(5, self.delete_task5_button.property("ID")))
        self.delete_task6_button.clicked.connect(lambda: self.load_task_data(6, self.delete_task6_button.property("ID")))

        # DATE
        # TODO: set minimum date
        self.dateEdit.setDate(datetime.datetime.now().date())

        # LOAD MATRIX
        for i in range(1, 7):
            style = "\"border: 1px dashed;\" \"border-color: red;\" \"border-radius: 10px;\""

            # TODO: styleSheet QAbstractButton
            eval(f"self.do_task{i}.setStyleSheet({style})")
            eval(f"self.do_task{i}.setEnabled(False)")
            eval(f"self.do_task{i}_button.setEnabled(False)")

            eval(f"self.schedule_task{i}.setStyleSheet({style})")
            eval(f"self.schedule_task{i}.setEnabled(False)")
            eval(f"self.schedule_task{i}_button.setEnabled(False)")

            eval(f"self.delegate_task{i}.setStyleSheet({style})")
            eval(f"self.delegate_task{i}.setEnabled(False)")
            eval(f"self.delegate_task{i}_button.setEnabled(False)")

            eval(f"self.delete_task{i}.setStyleSheet({style})")
            eval(f"self.delete_task{i}.setEnabled(False)")
            eval(f"self.delete_task{i}_button.setEnabled(False)")

        # TASK LIST EMPTY
        self.empty_task_list()

    def empty_task_list(self):
        for i in range(1, 25):
            eval(f"self.task_color_{i}.setVisible(False)")
            eval(f"self.task_btn_{i}.setVisible(False)")
            eval(f"self.taskdate_{i}.setVisible(False)")

    @staticmethod
    def date_format(date):
        new_format = f"{date[-4:]}-{date[3:5]}-{date[0:2]}"
        return new_format

    def load_task_list(self):
        self.empty_task_list()
        message = load_user_tasks(controller.token)

        if message == "Error":
            # TODO: chyba
            return
        elif message == "NotFound":
            # TODO: asi nic netreba robit
            return
        else:
            for i in range(len(message)):
                prior = message[i]["priority"]
                eval(f"self.task_color_{i+1}.setVisible(True)")
                eval(f"self.task_btn_{i+1}.setVisible(True)")
                eval(f"self.taskdate_{i+1}.setVisible(True)")

                if prior == "Urgent - Important":
                    color = "rgb(252, 158, 158)"
                elif prior == "Urgent - Not Important":
                    color = "rgb(255, 255, 168)"
                elif prior == "Not Urgent - Important":
                    color = "rgb(166, 166, 255)"
                else:
                    color = "rgb(164, 255, 164)"

                eval(f"self.task_color_{i+1}.setStyleSheet(\"background-color: {color};\")")
                eval(f"self.task_btn_{i+1}.setVisible(True)")
                eval(f"self.taskdate_{i+1}.setVisible(True)")

                name = message[i]["name"]
                eval(f"self.task_btn_{i+1}.setText(\"{name}\")")

                date = message[i]["deadline"][:10]
                eval(f"self.taskdate_{i+1}.setText(\"{date}\")")

                func = f"self.task_btn_{i+1}.setProperty"
                eval(func)("ID", message[i]["id"])

    def change_stack_widget(self, index):
        if index == 1:
            self.load_task_list()
        self.stackedWidget.setCurrentIndex(index)

    def check_availibility(self, task_prior):
        prior = ""
        if task_prior == "Urgent - Important":
            prior = "do"
        elif task_prior == "Not Urgent - Important":
            prior = "schedule"
        elif task_prior == "Urgent - Not Important":
            prior = "delegate"
        else:
            prior = "delete"

        for i in range(1, 7):
            result = eval(f"self.{prior}_task{i}.isEnabled()")
            available = result
            if not result:
                return True, prior, i

        return False, "", -1

    def delete_task(self):
        self.taskDescription.setText("")
        self.taskNameInput.setText("")
        self.choosePriority.setCurrentIndex(0)
        self.dateEdit.setDate(datetime.datetime.now().date())

        if controller.id != -1:
            message = delete_task_by_id(controller.id)
            if message == "Error":
                # TODO: chyba
                return
            else:
                eval(f"self.{controller.prior}_task{controller.position}.setEnabled(False)")
                eval(f"self.{controller.prior}_task{controller.position}_button.setEnabled(False)")

                style = "\"border: 1px dashed;\" \"border-color: red;\" \"border-radius: 10px;\""
                eval(f"self.{controller.prior}_task{controller.position}.setStyleSheet({style})")
                eval(f"self.{controller.prior}_task{controller.position}_button.setStyleSheet(\"color: black;\")")
                eval(f"self.{controller.prior}_task{controller.position}_button.setText(\"\")")

                func = f"self.{controller.prior}_task{controller.position}_button.setProperty"
                eval(func)("ID", -1)

                controller.change_id(-1)

    def save_task(self):
        task_name = self.taskNameInput.text()
        description = self.taskDescription.toPlainText()
        priority = str(self.choosePriority.currentText())
        date = self.dateEdit.text()
        date = self.date_format(date)

        if priority == "None" or task_name == "":
            # TODO: chyba
            print("Vyplnte vsetky potrebne informacie")
            return

        if len(description) > 256:
            # TODO: chyba
            print("Opis tasku je moc dlhy")
            return

        message = ""
        result, prior = "", ""
        position = -1

        if controller.id != -1:
            print(controller.id)
            message = update_task(controller.id, task_name, description, priority, date, 0, controller.token)
            prior = controller.prior
            position = controller.position

            self.taskDescription.setText("")
            self.taskNameInput.setText("")
            self.choosePriority.setCurrentIndex(0)
            self.dateEdit.setDate(datetime.datetime.now().date())
            eval(f"self.{prior}_task{position}_button.setText(\"{task_name}\")")

            controller.change_id(-1)
        else:
            message = create_new_task(task_name, description, priority, date, 0, controller.token)

            result, prior, position = self.check_availibility(priority)
            print(result, prior, position)
            if not result:
                # TODO: chyba
                return

            if message == "Error":
                # TODO: chyba
                pass
            else:
                self.taskDescription.setText("")
                self.taskNameInput.setText("")
                self.choosePriority.setCurrentIndex(0)
                self.dateEdit.setDate(datetime.datetime.now().date())

                eval(f"self.{prior}_task{position}.setEnabled(True)")
                eval(f"self.{prior}_task{position}_button.setEnabled(True)")

                style = "\"background-color: rgb(255, 255, 255);\" \"border: 1px solid;\" \"border-color: red;\" \"border-radius: 10px;\""
                eval(f"self.{prior}_task{position}.setStyleSheet({style})")
                eval(f"self.{prior}_task{position}_button.setStyleSheet(\"color: black;\")")
                eval(f"self.{prior}_task{position}_button.setText(\"{task_name}\")")

                func = f"self.{prior}_task{position}_button.setProperty"
                eval(func)("ID", message["id"])

    def load_task_data(self, pos, task_id):
        message = load_user_tasks(controller.token)

        if message == "Error":
            # TODO: chyba
            return
        else:
            controller.change_id(task_id)

            for i in range(len(message)):
                if message[i]["id"] == task_id:
                    self.taskDescription.setText(message[i]["description"])
                    self.taskNameInput.setText(message[i]["name"])
                    prior = message[i]["priority"]
                    if prior == "Urgent - Important":
                        controller.prior = "do"
                        self.choosePriority.setCurrentIndex(1)
                    elif prior == "Urgent - Not Important":
                        controller.prior = "delegate"
                        self.choosePriority.setCurrentIndex(2)
                    elif prior == "Not Urgent - Important":
                        controller.prior = "schedule"
                        self.choosePriority.setCurrentIndex(3)
                    else:
                        controller.prior = "delete"
                        self.choosePriority.setCurrentIndex(4)
                    # TODO complete
                    date = message[i]["deadline"]
                    date_format = datetime.date.fromisoformat(date[:10])
                    self.dateEdit.setDate(date_format)
                    controller.position = pos
                    break

    def load_tasks_data(self):
        message = load_user_tasks(controller.token)

        if message == "Error":
            # TODO: chyba
            return
        elif message == "NotFound":
            # TODO: asi nic netreba robit
            return
        else:
            for i in range(len(message)):
                prior = message[i]["priority"]
                result, prior, position = self.check_availibility(prior)
                print(result, prior, position)
                if not result:
                    # TODO: chyba
                    return

                eval(f"self.{prior}_task{position}.setEnabled(True)")
                eval(f"self.{prior}_task{position}_button.setEnabled(True)")

                style = "\"background-color: rgb(255, 255, 255);\" \"border: 1px solid;\" \"border-color: red;\" \"border-radius: 10px;\""
                eval(f"self.{prior}_task{position}.setStyleSheet({style})")
                eval(f"self.{prior}_task{position}_button.setStyleSheet(\"color: black;\")")
                eval(f"self.{prior}_task{position}_button.setText(\"{message[i]['name']}\")")

                func = f"self.{prior}_task{position}_button.setProperty"
                eval(func)("ID", message[i]["id"])

    def add_prior_task(self, msg):
        self.taskDescription.setText("")
        self.taskNameInput.setText("")

        if msg == "do":
            self.choosePriority.setCurrentIndex(1)
        elif msg == "schedule":
            self.choosePriority.setCurrentIndex(3)
        elif msg == "delegate":
            self.choosePriority.setCurrentIndex(2)
        else:
            self.choosePriority.setCurrentIndex(4)

    # TODO: mozno pred log out ulozit vypisat nejaku hlasku, ak nema user
    # TODO: ulozenu aktivitu
    def log_out(self):
        multiple_screens.setMinimumSize(600, 600)
        multiple_screens.setMaximumSize(600, 600)
        multiple_screens.removeWidget(multiple_screens.widget(0))
        loginpage = LoginPage()
        multiple_screens.insertWidget(0, loginpage)
        multiple_screens.setCurrentIndex(0)


class LoginPage(QtWidgets.QMainWindow, Ui_LoginPage):

    def __init__(self):
        super().__init__()
        self.setupUi(self)

        # ERROR LABELS
        self.loginError.setVisible(False)
        self.registrationError.setVisible(False)

        # BUTTONS - LOGIN, REGISTER
        self.loginBtn.clicked.connect(self.log_in)
        self.registerBtn.clicked.connect(self.register_user)

    def log_in(self):
        if self.check_login():
            multiple_screens.setMinimumSize(1150, 720)
            multiple_screens.setMaximumSize(1920, 1080)
            multiple_screens.removeWidget(multiple_screens.widget(1))
            window = Window()
            #print(controller.token)
            multiple_screens.insertWidget(1, window)
            multiple_screens.setCurrentIndex(1)
            multiple_screens.showMaximized()
            window.load_tasks_data()

    def check_login(self):
        passwd = self.loginPassword.text()
        user_name = self.loginUserName.text()

        if passwd == "" or user_name == "":
            self.loginError.setText("Vyplňte všetky potrebné informácie")
            self.loginError.setVisible(True)
            return False

        message = log_in_user(user_name, passwd)

        if message == "Error":
            self.loginError.setText("Internal Error: 500 :(")
            self.loginError.setVisible(True)
            return False
        elif message == "incorrectPassword":
            self.loginError.setText("Nesprávne heslo")
            self.loginError.setVisible(True)
            return False
        elif message == "notFound":
            self.loginError.setText("Užívateľ so zadaným \nmenom neexistuje")
            self.loginError.setVisible(True)
            return False
        else:
            controller.change_token(message[10:len(message)-2])
            return True

    def register_user(self):
        if self.check_registration():
            print("Bol si uspesne registrovany")

    def check_registration(self):
        user_name = self.userNameLineEdit.text()
        email = self.registerEmail.text()
        passwd = self.registerPassword.text()
        passwd_again = self.registerPasswordAgain.text()

        if user_name == "" or email == "" or passwd == "" or passwd_again == "":
            self.registrationError.setText("Vyplňte všetky potrebné informácie")
            self.registrationError.setVisible(True)
            return False
        elif passwd != passwd_again:
            self.registrationError.setText("Heslá sa nezhodujú")
            self.registrationError.setVisible(True)
            return False

        message = create_new_user(user_name, passwd, email)
        if message == "Error":
            self.registrationError.setText("Internal Error 500 :(")
            self.registrationError.setVisible(True)
        elif message == "UserExists":
            self.registrationError.setText("Užívateľ so zadaným \nmenom už existuje")
            self.registrationError.setVisible(True)
            return False
        else:
            # TODO: token
            return True


# Application Controller
class Controller:
    token = ""
    id = -1
    prior = ""
    position = -1

    def change_token(self, token):
        self.token = token

    def change_id(self, id):
        self.id = id


controller = Controller()

# Spustenie aplikacie
app = QApplication(sys.argv)

login_page = LoginPage()
window = Window()
multiple_screens = QStackedWidget()
multiple_screens.insertWidget(0, login_page)
multiple_screens.insertWidget(1, window)
multiple_screens.setCurrentIndex(0)

## TODO: problem s poziciou a velkostou okien
## TODO: resizable = True
#multiple_screens.setMinimumSize(600, 600)
#multiple_screens.setMaximumSize(600, 600)
if multiple_screens.currentIndex() == 0:
    multiple_screens.show()
else:
    multiple_screens.showMaximized()
sys.exit(app.exec_())