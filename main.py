import sys
from PyQt5.QtWidgets import QApplication
from application import LoginPage

app = QApplication(sys.argv)

login_poge = LoginPage()

sys.exit(app.exec_())