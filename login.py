# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'login.ui'
#
# Created by: PyQt5 UI code generator 5.15.4
#
# WARNING: Any manual changes made to this file will be lost when pyuic5 is
# run again.  Do not edit this file unless you know what you are doing.


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_LoginPage(object):
    def setupUi(self, LoginPage):
        LoginPage.setObjectName("LoginPage")
        LoginPage.resize(600, 600)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Fixed, QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(LoginPage.sizePolicy().hasHeightForWidth())
        LoginPage.setSizePolicy(sizePolicy)
        LoginPage.setMaximumSize(QtCore.QSize(600, 600))
        LoginPage.setStyleSheet("\n"
"background-color: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:0, stop:0 rgba(174, 145, 255, 255), stop:1 rgba(255, 145, 145, 255));\n"
"\n"
"QStatusBar{\n"
"background-color: rgb(255, 255, 255);\n"
"}\n"
"\n"
"")
        self.main = QtWidgets.QWidget(LoginPage)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Preferred, QtWidgets.QSizePolicy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.main.sizePolicy().hasHeightForWidth())
        self.main.setSizePolicy(sizePolicy)
        self.main.setMinimumSize(QtCore.QSize(602, 600))
        self.main.setMaximumSize(QtCore.QSize(602, 600))
        self.main.setStyleSheet("")
        self.main.setObjectName("main")
        self.gridLayout = QtWidgets.QGridLayout(self.main)
        self.gridLayout.setContentsMargins(0, 0, 0, 0)
        self.gridLayout.setObjectName("gridLayout")
        self.mottoText = QtWidgets.QTextEdit(self.main)
        self.mottoText.setEnabled(True)
        self.mottoText.viewport().setProperty("cursor", QtGui.QCursor(QtCore.Qt.ArrowCursor))
        self.mottoText.setStyleSheet("border: 0px;")
        self.mottoText.setReadOnly(True)
        self.mottoText.setObjectName("mottoText")
        self.gridLayout.addWidget(self.mottoText, 5, 0, 1, 1)
        spacerItem = QtWidgets.QSpacerItem(20, 40, QtWidgets.QSizePolicy.Minimum, QtWidgets.QSizePolicy.Expanding)
        self.gridLayout.addItem(spacerItem, 1, 0, 1, 1)
        self.horizontalLayout = QtWidgets.QHBoxLayout()
        self.horizontalLayout.setSpacing(7)
        self.horizontalLayout.setObjectName("horizontalLayout")
        spacerItem1 = QtWidgets.QSpacerItem(120, 20, QtWidgets.QSizePolicy.Minimum, QtWidgets.QSizePolicy.Minimum)
        self.horizontalLayout.addItem(spacerItem1)
        self.tabWidget = QtWidgets.QTabWidget(self.main)
        self.tabWidget.setEnabled(True)
        self.tabWidget.setStyleSheet("background-color: rgb(255, 255, 255);\n"
"QLineEdit{\n"
"    background-color: rgb(255, 255, 255);\n"
"}\n"
"QLabel{\n"
"    background-color: rgb(255, 255, 255);\n"
"}\n"
"")
        self.tabWidget.setObjectName("tabWidget")
        self.login = QtWidgets.QWidget()
        self.login.setObjectName("login")
        self.horizontalLayout_3 = QtWidgets.QHBoxLayout(self.login)
        self.horizontalLayout_3.setObjectName("horizontalLayout_3")
        self.loginFormatLayout = QtWidgets.QFormLayout()
        self.loginFormatLayout.setObjectName("loginFormatLayout")
        self.loginUserNameLabel = QtWidgets.QLabel(self.login)
        self.loginUserNameLabel.setIndent(10)
        self.loginUserNameLabel.setObjectName("loginUserNameLabel")
        self.loginFormatLayout.setWidget(1, QtWidgets.QFormLayout.LabelRole, self.loginUserNameLabel)
        self.loginUserName = QtWidgets.QLineEdit(self.login)
        self.loginUserName.setStyleSheet("")
        self.loginUserName.setObjectName("loginUserName")
        self.loginFormatLayout.setWidget(1, QtWidgets.QFormLayout.FieldRole, self.loginUserName)
        self.loginPasswordLabel = QtWidgets.QLabel(self.login)
        self.loginPasswordLabel.setIndent(10)
        self.loginPasswordLabel.setObjectName("loginPasswordLabel")
        self.loginFormatLayout.setWidget(2, QtWidgets.QFormLayout.LabelRole, self.loginPasswordLabel)
        self.loginPassword = QtWidgets.QLineEdit(self.login)
        self.loginPassword.setStyleSheet("")
        self.loginPassword.setEchoMode(QtWidgets.QLineEdit.Password)
        self.loginPassword.setObjectName("loginPassword")
        self.loginFormatLayout.setWidget(2, QtWidgets.QFormLayout.FieldRole, self.loginPassword)
        self.loginBtn = QtWidgets.QPushButton(self.login)
        self.loginBtn.setObjectName("loginBtn")
        self.loginFormatLayout.setWidget(3, QtWidgets.QFormLayout.LabelRole, self.loginBtn)
        self.loginError = QtWidgets.QLabel(self.login)
        self.loginError.setStyleSheet("border-radius: 10px;\n"
"background-color: rgb(255, 0, 0);")
        self.loginError.setAlignment(QtCore.Qt.AlignCenter)
        self.loginError.setObjectName("loginError")
        self.loginFormatLayout.setWidget(3, QtWidgets.QFormLayout.FieldRole, self.loginError)
        self.horizontalLayout_3.addLayout(self.loginFormatLayout)
        self.tabWidget.addTab(self.login, "")
        self.register_2 = QtWidgets.QWidget()
        self.register_2.setObjectName("register_2")
        self.horizontalLayout_2 = QtWidgets.QHBoxLayout(self.register_2)
        self.horizontalLayout_2.setObjectName("horizontalLayout_2")
        self.registerFormatLayout = QtWidgets.QFormLayout()
        self.registerFormatLayout.setObjectName("registerFormatLayout")
        self.userNameLabel = QtWidgets.QLabel(self.register_2)
        self.userNameLabel.setIndent(10)
        self.userNameLabel.setObjectName("userNameLabel")
        self.registerFormatLayout.setWidget(2, QtWidgets.QFormLayout.LabelRole, self.userNameLabel)
        self.userNameLineEdit = QtWidgets.QLineEdit(self.register_2)
        self.userNameLineEdit.setObjectName("userNameLineEdit")
        self.registerFormatLayout.setWidget(2, QtWidgets.QFormLayout.FieldRole, self.userNameLineEdit)
        self.registerEmailLabel = QtWidgets.QLabel(self.register_2)
        self.registerEmailLabel.setIndent(10)
        self.registerEmailLabel.setObjectName("registerEmailLabel")
        self.registerFormatLayout.setWidget(3, QtWidgets.QFormLayout.LabelRole, self.registerEmailLabel)
        self.registerEmail = QtWidgets.QLineEdit(self.register_2)
        self.registerEmail.setObjectName("registerEmail")
        self.registerFormatLayout.setWidget(3, QtWidgets.QFormLayout.FieldRole, self.registerEmail)
        self.registerPasswordLabel = QtWidgets.QLabel(self.register_2)
        self.registerPasswordLabel.setIndent(10)
        self.registerPasswordLabel.setObjectName("registerPasswordLabel")
        self.registerFormatLayout.setWidget(4, QtWidgets.QFormLayout.LabelRole, self.registerPasswordLabel)
        self.registerPassword = QtWidgets.QLineEdit(self.register_2)
        self.registerPassword.setEchoMode(QtWidgets.QLineEdit.Password)
        self.registerPassword.setObjectName("registerPassword")
        self.registerFormatLayout.setWidget(4, QtWidgets.QFormLayout.FieldRole, self.registerPassword)
        self.registerPasswordAgainLabel = QtWidgets.QLabel(self.register_2)
        self.registerPasswordAgainLabel.setIndent(10)
        self.registerPasswordAgainLabel.setObjectName("registerPasswordAgainLabel")
        self.registerFormatLayout.setWidget(6, QtWidgets.QFormLayout.LabelRole, self.registerPasswordAgainLabel)
        self.registerPasswordAgain = QtWidgets.QLineEdit(self.register_2)
        self.registerPasswordAgain.setEchoMode(QtWidgets.QLineEdit.Password)
        self.registerPasswordAgain.setObjectName("registerPasswordAgain")
        self.registerFormatLayout.setWidget(6, QtWidgets.QFormLayout.FieldRole, self.registerPasswordAgain)
        self.registerBtn = QtWidgets.QPushButton(self.register_2)
        self.registerBtn.setObjectName("registerBtn")
        self.registerFormatLayout.setWidget(7, QtWidgets.QFormLayout.LabelRole, self.registerBtn)
        self.widget = QtWidgets.QWidget(self.register_2)
        self.widget.setObjectName("widget")
        self.registerFormatLayout.setWidget(1, QtWidgets.QFormLayout.FieldRole, self.widget)
        self.registrationError = QtWidgets.QLabel(self.register_2)
        self.registrationError.setStyleSheet("border-radius: 10px;\n"
"background-color: rgb(255, 0, 0);")
        self.registrationError.setAlignment(QtCore.Qt.AlignCenter)
        self.registrationError.setObjectName("registrationError")
        self.registerFormatLayout.setWidget(7, QtWidgets.QFormLayout.FieldRole, self.registrationError)
        self.horizontalLayout_2.addLayout(self.registerFormatLayout)
        self.tabWidget.addTab(self.register_2, "")
        self.horizontalLayout.addWidget(self.tabWidget)
        spacerItem2 = QtWidgets.QSpacerItem(120, 20, QtWidgets.QSizePolicy.Minimum, QtWidgets.QSizePolicy.Minimum)
        self.horizontalLayout.addItem(spacerItem2)
        self.gridLayout.addLayout(self.horizontalLayout, 2, 0, 1, 1)
        spacerItem3 = QtWidgets.QSpacerItem(20, 30, QtWidgets.QSizePolicy.Minimum, QtWidgets.QSizePolicy.Expanding)
        self.gridLayout.addItem(spacerItem3, 4, 0, 1, 1)
        self.brainfreeTitle = QtWidgets.QLabel(self.main)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Preferred, QtWidgets.QSizePolicy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.brainfreeTitle.sizePolicy().hasHeightForWidth())
        self.brainfreeTitle.setSizePolicy(sizePolicy)
        self.brainfreeTitle.setMinimumSize(QtCore.QSize(0, 0))
        font = QtGui.QFont()
        font.setPointSize(54)
        self.brainfreeTitle.setFont(font)
        self.brainfreeTitle.setStyleSheet("color:black;\n"
"background-color: rgb(255, 255, 255);")
        self.brainfreeTitle.setTextFormat(QtCore.Qt.AutoText)
        self.brainfreeTitle.setAlignment(QtCore.Qt.AlignLeading|QtCore.Qt.AlignLeft|QtCore.Qt.AlignVCenter)
        self.brainfreeTitle.setIndent(30)
        self.brainfreeTitle.setObjectName("brainfreeTitle")
        self.gridLayout.addWidget(self.brainfreeTitle, 0, 0, 1, 1)
        LoginPage.setCentralWidget(self.main)

        self.retranslateUi(LoginPage)
        self.tabWidget.setCurrentIndex(0)
        QtCore.QMetaObject.connectSlotsByName(LoginPage)

    def retranslateUi(self, LoginPage):
        _translate = QtCore.QCoreApplication.translate
        LoginPage.setWindowTitle(_translate("LoginPage", "MainWindow"))
        self.mottoText.setHtml(_translate("LoginPage", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:\'MS Shell Dlg 2\'; font-size:7.8pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"center\" style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:28pt; color:#ffffff;\">Manage your time<br />effectively<br />Keep your </span><span style=\" font-size:30pt; font-weight:600; color:#ffffff;\">Brain Free</span></p></body></html>"))
        self.loginUserNameLabel.setText(_translate("LoginPage", "Prihlasovacie meno"))
        self.loginPasswordLabel.setText(_translate("LoginPage", "Heslo"))
        self.loginBtn.setText(_translate("LoginPage", "Log in"))
        self.loginError.setText(_translate("LoginPage", "TextLabel"))
        self.tabWidget.setTabText(self.tabWidget.indexOf(self.login), _translate("LoginPage", "LOG IN"))
        self.userNameLabel.setText(_translate("LoginPage", "Prihlasovacie meno"))
        self.registerEmailLabel.setText(_translate("LoginPage", "E-mailová adresa"))
        self.registerPasswordLabel.setText(_translate("LoginPage", "Heslo"))
        self.registerPasswordAgainLabel.setText(_translate("LoginPage", "Heslo znovu"))
        self.registerBtn.setText(_translate("LoginPage", "Register"))
        self.registrationError.setText(_translate("LoginPage", "TextLabel"))
        self.tabWidget.setTabText(self.tabWidget.indexOf(self.register_2), _translate("LoginPage", "REGISTER"))
        self.brainfreeTitle.setText(_translate("LoginPage", "BrainFree"))

if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_LoginPage()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())