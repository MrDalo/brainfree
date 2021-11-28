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

        self.loginBtn.clicked.connect(self.log_in)
        self.registerBtn.clicked.connect(self.register_user)

    def log_in(self):
        if self.check_login():
            print("Bol si uspesne prihlaseny")
            print(self.token)
        else: # TODO vymazat
            print("Nieco sa pokazilo")

    def check_login(self):
        passwd = self.loginPassword.text()
        user_name = self.loginUserName.text()

        if passwd == "" or user_name == "":
            return False

        message = log_in_user(user_name, passwd)

        if message == "Error":
            return False
        elif message == "incorrectPassword":
            self.loginUserName.setText("Incorrect Password")
            self.loginPassword.setText("")
            return False
        elif message == "notFound":
            self.loginUserName.setText("User does not exists")
            self.loginPassword.setText("")
            return False
        else:
            # TODO: prebrat format tejto spravy
            self.token = message[10:len(message)-2]
            return True

    def register_user(self):
        print("siomtu")
        if self.check_registration():
            print("Bol si uspesne registrovany")
        else: # TODO: vymazat
            print("Nieco sa pokazilo")

    def check_registration(self):
        user_name = self.userNameLineEdit.text()
        email = self.registerEmail.text()
        passwd = self.registerPassword.text()
        passwd_again = self.registerPasswordAgain.text()

        if user_name == "" or email == "" or passwd == "" or passwd_again == "":
            return False
        elif passwd != passwd_again:
            self.userNameLineEdit.setText("Hesla sa nezhoduju")
            self.registerEmail.setText("")
            self.registerPassword.setText("")
            self.registerPasswordAgain.setText("")
            return False

        message = create_new_user(user_name, passwd, email)
        if message == "Error":
            self.userNameLineEdit.setText("500 Internal Error")
            self.registerEmail.setText("")
            self.registerPassword.setText("")
            self.registerPasswordAgain.setText("")
        elif message == "UserExists":
            self.userNameLineEdit.setText("Uzivatel so zadanym menom uz existuje")
            self.registerEmail.setText("")
            self.registerPassword.setText("")
            self.registerPasswordAgain.setText("")
            return False
        else:
            return True


