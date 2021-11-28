from PyQt5 import QtWidgets, QtCore
from login import Ui_LoginPage
from communication import *

from PyQt5 import QtGui
from PyQt5.QtGui import *


class LoginPage(QtWidgets.QMainWindow, Ui_LoginPage):

    token = ""

    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.show()

        self.loginError.setVisible(False)
        self.registrationError.setVisible(False)
        self.loginBtn.clicked.connect(self.log_in)
        self.registerBtn.clicked.connect(self.register_user)

    def log_in(self):
        if self.check_login():
            print("Bol si uspesne prihlaseny")
            print(self.token)

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
            self.loginError.setText("Užívateľ so zadaným menom neexistuje")
            self.loginError.setVisible(True)
            return False
        else:
            self.token = message[10:len(message)-2]
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
            self.registrationError.setText("Užívateľ so zadaným menom už existuje")
            self.registrationError.setVisible(True)
            return False
        else:
            # TODO: token
            return True


