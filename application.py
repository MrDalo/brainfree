from PyQt5 import QtWidgets, QtCore
from login import Ui_LoginPage
from responsive import Ui_Window
from communication import *

import sys
from PyQt5.QtWidgets import QApplication, QStackedWidget

from PyQt5 import QtGui
from PyQt5.QtGui import *


class Window(QtWidgets.QMainWindow, Ui_Window):
    def __init__(self):
        super().__init__()
        self.setupUi(self)

        self.logOutButton.clicked.connect(self.log_out)
        self.saveTaskButton.clicked.connect(self.save_task)

    @staticmethod
    def date_format(date):
        new_format = f"{date[-4:]}-{date[3:5]}-{date[0:2]}"
        return new_format

    def save_task(self):
        # TODO: asi vymazat
        completed = self.completeCheckBox.isChecked()
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

        message = create_new_task(task_name, description, priority, date, int(completed), controller.token)

        if message == "Error":
            # TODO: chyba
            pass


    # TODO: mozno pred log out ulozit vypisat nejaku hlasku, ak nema user
    # ulozenu aktivitu
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

        self.loginError.setVisible(False)
        self.registrationError.setVisible(False)
        self.loginBtn.clicked.connect(self.log_in)
        self.registerBtn.clicked.connect(self.register_user)

    def log_in(self):
        if self.check_login():
            print("Bol si uspesne prihlaseny")
            multiple_screens.setMinimumSize(1150, 720)
            multiple_screens.setMaximumSize(1920, 1080)
            multiple_screens.removeWidget(multiple_screens.widget(1))
            window = Window()
            multiple_screens.insertWidget(1, window)
            multiple_screens.setCurrentIndex(1)
            multiple_screens.showMaximized()


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

    def change_token(self, token):
        self.token = token;


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
multiple_screens.setMinimumSize(600, 600)
multiple_screens.setMaximumSize(600, 600)
if multiple_screens.currentIndex() == 0:
    multiple_screens.show()
else:
    multiple_screens.showMaximized()
sys.exit(app.exec_())