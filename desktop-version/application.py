##
#   @file application.py
#
#   @brief Contains functionality of GUI
#   @author Partik Sehnoutek, xsehno01
#

from PyQt5 import QtWidgets, QtCore, QtGui
from PyQt5.QtWidgets import QApplication, QStackedWidget
import datetime
import sys
from PySide2.QtWidgets import QColorDialog

from responsive import Ui_Window
from login import Ui_LoginPage
from communication import *


##
# @brief Class Window contains initialization and button methods
#
class Window(QtWidgets.QMainWindow, Ui_Window):
    ## Method __init__
    # @brief Function for initialization
    #
    # @param self The object pointer.
    def __init__(self):
        super().__init__()
        self.setupUi(self)

        # RIGHT BAR - TAB ORDER
        self.RightBar.setTabOrder(self.taskNameInput, self.taskDescription)
        self.RightBar.setTabOrder(self.taskDescription, self.choosePriority)
        self.RightBar.setTabOrder(self.choosePriority, self.dateEdit)
        self.RightBar.setTabOrder(self.dateEdit, self.saveTaskButton)
        self.RightBar.setTabOrder(self.saveTaskButton, self.deleteTaskButton)

        # TAB FOCUS - QTEXTEDIT
        self.taskDescription.setTabChangesFocus(True)

        # BUTTONS - HOME, TASK LIST, GUIDE, LOG OUT, SAVE, DELETE
        self.logOutButton.clicked.connect(self.log_out)
        self.saveTaskButton.clicked.connect(self.save_task)
        self.deleteTaskButton.clicked.connect(self.delete_task)

        self.homeButton.clicked.connect(lambda: self.change_stack_widget(0))
        self.myTaskButton.clicked.connect(lambda: self.change_stack_widget(1))
        self.guideButton.clicked.connect(lambda: self.change_stack_widget(2))

        # COLOR PICKERS
        self.colorsDoTasks.clicked.connect(lambda: self.color_picker("do"))
        self.colorsScheduleTasks.clicked.connect(lambda: self.color_picker("schedule"))
        self.colorsDelegateTasks.clicked.connect(lambda: self.color_picker("delegate"))
        self.colorsDeleteTasks.clicked.connect(lambda: self.color_picker("delete"))

        # ADD TASKS (+) BUTTONS
        self.addDoTask.clicked.connect(lambda: self.add_prior_task("do"))
        self.addScheduleTask.clicked.connect(lambda: self.add_prior_task("schedule"))
        self.addDelegateTask.clicked.connect(lambda: self.add_prior_task("delegate"))
        self.addDeleteTask.clicked.connect(lambda: self.add_prior_task("delete"))

        # TASKS BUTTONS
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
        self.dateEdit.setDate(datetime.datetime.now().date())

        # INIT MATRIX
        self.init_matrix()

        # BUTTONS IN TASK LIST
        self.task_btn_1.clicked.connect(lambda: self.load_list_task_data(self.task_btn_1.property("ID")))
        self.task_btn_2.clicked.connect(lambda: self.load_list_task_data(self.task_btn_2.property("ID")))
        self.task_btn_3.clicked.connect(lambda: self.load_list_task_data(self.task_btn_3.property("ID")))
        self.task_btn_4.clicked.connect(lambda: self.load_list_task_data(self.task_btn_4.property("ID")))
        self.task_btn_5.clicked.connect(lambda: self.load_list_task_data(self.task_btn_5.property("ID")))
        self.task_btn_6.clicked.connect(lambda: self.load_list_task_data(self.task_btn_6.property("ID")))
        self.task_btn_7.clicked.connect(lambda: self.load_list_task_data(self.task_btn_7.property("ID")))
        self.task_btn_8.clicked.connect(lambda: self.load_list_task_data(self.task_btn_8.property("ID")))
        self.task_btn_9.clicked.connect(lambda: self.load_list_task_data(self.task_btn_9.property("ID")))
        self.task_btn_10.clicked.connect(lambda: self.load_list_task_data(self.task_btn_10.property("ID")))
        self.task_btn_11.clicked.connect(lambda: self.load_list_task_data(self.task_btn_11.property("ID")))
        self.task_btn_12.clicked.connect(lambda: self.load_list_task_data(self.task_btn_12.property("ID")))
        self.task_btn_13.clicked.connect(lambda: self.load_list_task_data(self.task_btn_13.property("ID")))
        self.task_btn_14.clicked.connect(lambda: self.load_list_task_data(self.task_btn_14.property("ID")))
        self.task_btn_15.clicked.connect(lambda: self.load_list_task_data(self.task_btn_15.property("ID")))
        self.task_btn_16.clicked.connect(lambda: self.load_list_task_data(self.task_btn_16.property("ID")))
        self.task_btn_17.clicked.connect(lambda: self.load_list_task_data(self.task_btn_17.property("ID")))
        self.task_btn_18.clicked.connect(lambda: self.load_list_task_data(self.task_btn_18.property("ID")))
        self.task_btn_19.clicked.connect(lambda: self.load_list_task_data(self.task_btn_19.property("ID")))
        self.task_btn_20.clicked.connect(lambda: self.load_list_task_data(self.task_btn_20.property("ID")))
        self.task_btn_21.clicked.connect(lambda: self.load_list_task_data(self.task_btn_21.property("ID")))
        self.task_btn_22.clicked.connect(lambda: self.load_list_task_data(self.task_btn_22.property("ID")))
        self.task_btn_23.clicked.connect(lambda: self.load_list_task_data(self.task_btn_23.property("ID")))
        self.task_btn_24.clicked.connect(lambda: self.load_list_task_data(self.task_btn_24.property("ID")))

        # TASK LIST EMPTY
        self.empty_task_list()

        # ERROR LABEL
        self.errorMessageLabel.setStyleSheet("background-color: rgba(0,0,0,0); border: 0px;")
        self.errorMessageLabel.setText("")

        # MATRIX COLORS
        self.change_matrix_colors()

    ## Method empty_task_list
    # @brief Hides tasks from the Task List
    #
    # @param self The object pointer.
    def empty_task_list(self):
        for i in range(1, 25):
            eval(f"self.task_color_{i}.setVisible(False)")
            eval(f"self.task_btn_{i}.setVisible(False)")
            eval(f"self.taskdate_{i}.setVisible(False)")

    ## Method init_matrix
    # @brief Disables all buttons in the matrix
    #
    # @param self The object pointer.
    def init_matrix(self):
        for i in range(1, 7):
            style = "\"border: 1px dashed;\" \"border-color: red;\" \"border-radius: 10px;\""

            eval(f"self.do_task{i}.setStyleSheet({style})")
            eval(f"self.do_task{i}.setEnabled(False)")
            eval(f"self.do_task{i}_button.setEnabled(False)")
            eval(f"self.do_task{i}_button.setText(\"\")")

            eval(f"self.schedule_task{i}.setStyleSheet({style})")
            eval(f"self.schedule_task{i}.setEnabled(False)")
            eval(f"self.schedule_task{i}_button.setEnabled(False)")
            eval(f"self.schedule_task{i}_button.setText(\"\")")

            eval(f"self.delegate_task{i}.setStyleSheet({style})")
            eval(f"self.delegate_task{i}.setEnabled(False)")
            eval(f"self.delegate_task{i}_button.setEnabled(False)")
            eval(f"self.delegate_task{i}_button.setText(\"\")")

            eval(f"self.delete_task{i}.setStyleSheet({style})")
            eval(f"self.delete_task{i}.setEnabled(False)")
            eval(f"self.delete_task{i}_button.setEnabled(False)")
            eval(f"self.delete_task{i}_button.setText(\"\")")

    ## Static Method date_format
    # @brief Changes date format to database's date format
    #
    # @param date String representation of a date
    @staticmethod
    def date_format(date):
        new_format = f"{date[-4:]}-{date[3:5]}-{date[0:2]}"
        return new_format

    ## Method error_message
    # @brief Displays messages to user
    #
    # @param self The object pointer.
    # @param error True if error, False if not
    # @param text Error message
    def error_message(self, error, text):
        if error:
            style = "background-color: rgba(255,0,0,1);"
        else:
            style = "background-color: rgba(0,255,0,1);"

        self.errorMessageLabel.setStyleSheet(style)
        self.errorMessageLabel.setText(text)

    ## Method change_stack_widget
    # @brief Changes the middle widget of Main Window
    #
    # @param self The object pointer.
    # @param index Index of a window from the StackedWidget
    def change_stack_widget(self, index):
        if index == 1:
            self.empty_task_list()
            self.load_task_list()
        elif index == 0:
            self.change_matrix_colors()
            self.init_matrix()
            self.load_tasks_data()
        self.stackedWidget.setCurrentIndex(index)

    ## Method delete_task_from_matrix
    # @brief Checks available space in matrix with the given priority
    #
    # @param self The object pointer.
    # @param task_prior Task priority
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
            if not result:
                return True, prior, i

        return False, "", -1

    ## Method delete_task_from_matrix
    # @brief Deletes a task from the matrix
    #
    # @param self The object pointer.
    def delete_task_from_matrix(self):
        eval(f"self.{controller.prior}_task{controller.position}.setEnabled(False)")
        eval(f"self.{controller.prior}_task{controller.position}_button.setEnabled(False)")

        style = "\"border: 1px dashed;\" \"border-color: red;\" \"border-radius: 10px;\""
        eval(f"self.{controller.prior}_task{controller.position}.setStyleSheet({style})")
        eval(f"self.{controller.prior}_task{controller.position}_button.setStyleSheet(\"color: black;\")")
        eval(f"self.{controller.prior}_task{controller.position}_button.setText(\"\")")

        func = f"self.{controller.prior}_task{controller.position}_button.setProperty"
        eval(func)("ID", -1)

    ## Method delete_task
    # @brief Collects data about a particular task and sends them to
    # communication.py in order to delete the task in the database
    #
    # @param self The object pointer.
    def delete_task(self):
        self.error_message(True, "Firstly select a task\nyou wish to delete")

        if controller.id != -1:
            message = delete_task_by_id(controller.id)
            if message == "Error":
                self.error_message(True, "Internal Error")
                return
            elif message == "NotFound":
                self.error_message(True, "Unable to delete task")
                return
            else:
                if self.stackedWidget.currentIndex() == 0:
                    self.get_pos(controller.prior, controller.id)
                    eval(f"self.{controller.prior}_task{controller.position}.setEnabled(False)")
                    eval(f"self.{controller.prior}_task{controller.position}_button.setEnabled(False)")

                    style = "\"border: 1px dashed;\" \"border-color: red;\" \"border-radius: 10px;\""
                    eval(f"self.{controller.prior}_task{controller.position}.setStyleSheet({style})")
                    eval(f"self.{controller.prior}_task{controller.position}_button.setStyleSheet(\"color: black;\")")
                    eval(f"self.{controller.prior}_task{controller.position}_button.setText(\"\")")

                    func = f"self.{controller.prior}_task{controller.position}_button.setProperty"
                    eval(func)("ID", -1)
                elif self.stackedWidget.currentIndex() == 1:
                    self.empty_task_list()
                    self.load_task_list()

                self.taskDescription.setText("")
                self.taskNameInput.setText("")
                self.choosePriority.setCurrentIndex(0)
                self.dateEdit.setDate(datetime.datetime.now().date())

                controller.id = -1
                self.error_message(False, "Task was successfully\ndeleted")

    ## Method save_task
    # @brief Collects data about a particular task and sends them to
    # communication.py in order to create or update the task in the database
    #
    # @param self The object pointer.
    def save_task(self):
        task_name = self.taskNameInput.text()
        description = self.taskDescription.toPlainText()
        priority = str(self.choosePriority.currentText())
        date = self.dateEdit.text()
        date = self.date_format(date)

        if task_name == "":
            self.error_message(True, "Enter task name")
            return
        if priority == "None":
            self.error_message(True, "Enter priority")
            return
        if len(description) > 256:
            self.error_message(True, "Maximum length of description\nis 256 characters")
            return

        if controller.id != -1:
            if self.stackedWidget.currentIndex() == 0:
                self.get_pos(controller.prior, controller.id)
                eval(f"self.{controller.prior}_task{controller.position}.setEnabled(False)")
                eval(f"self.{controller.prior}_task{controller.position}_button.setEnabled(False)")
                result, prior, position = self.check_availibility(priority)
                if not result:
                    self.error_message(True, "No available space in\nmatrix with given priority")
                    eval(f"self.{controller.prior}_task{controller.position}.setEnabled(True)")
                    eval(f"self.{controller.prior}_task{controller.position}_button.setEnabled(True)")
                    return

            message = update_task(controller.id, task_name, description, priority, date, 0, controller.token)

            self.taskDescription.setText("")
            self.taskNameInput.setText("")
            self.choosePriority.setCurrentIndex(0)
            self.dateEdit.setDate(datetime.datetime.now().date())

            if self.stackedWidget.currentIndex() == 0:
                self.delete_task_from_matrix()
                eval(f"self.{prior}_task{position}.setEnabled(True)")
                eval(f"self.{prior}_task{position}_button.setEnabled(True)")

                style = "\"background-color: rgb(255, 255, 255);\" \"border: 1px solid;\" \"border-color: red;\" \"border-radius: 10px;\""
                eval(f"self.{prior}_task{position}.setStyleSheet({style})")
                eval(f"self.{prior}_task{position}_button.setStyleSheet(\"color: black;\")")

                if len(task_name) > controller.max_length:
                    task_name = f"{task_name[:17]}..."
                eval(f"self.{prior}_task{position}_button.setText(\"{task_name}\")")

                func = f"self.{prior}_task{position}_button.setProperty"
                eval(func)("ID", controller.id)
            elif self.stackedWidget.currentIndex() == 1:
                self.empty_task_list()
                self.load_task_list()

            controller.id = -1
            self.error_message(False, "Task was successfully\nupdated")
        else:
            result, prior, position = self.check_availibility(priority)

            if not result:
                self.error_message(True, "No available space in\nmatrix with given priority")
                return
            message = create_new_task(task_name, description, priority, date, 0, controller.token)

            if message == "Error":
                self.error_message(True, "Internal Error")
                return
            else:
                self.taskDescription.setText("")
                self.taskNameInput.setText("")
                self.choosePriority.setCurrentIndex(0)
                self.dateEdit.setDate(datetime.datetime.now().date())

                if self.stackedWidget.currentIndex() == 0:
                    eval(f"self.{prior}_task{position}.setEnabled(True)")
                    eval(f"self.{prior}_task{position}_button.setEnabled(True)")

                    style = "\"background-color: rgb(255, 255, 255);\" \"border: 1px solid;\" \"border-color: red;\" \"border-radius: 10px;\""
                    eval(f"self.{prior}_task{position}.setStyleSheet({style})")
                    eval(f"self.{prior}_task{position}_button.setStyleSheet(\"color: black;\")")

                    if len(task_name) > controller.max_length:
                        task_name = f"{task_name[:17]}..."
                    eval(f"self.{prior}_task{position}_button.setText(\"{task_name}\")")

                    func = f"self.{prior}_task{position}_button.setProperty"
                    eval(func)("ID", message["id"])

                elif self.stackedWidget.currentIndex() == 1:
                    self.empty_task_list()
                    self.load_task_list()

                self.error_message(False, "Task was successfully\nsaved")

    ## Method load_task_list
    # @brief Loads all tasks data to Task list
    #
    # @param self The object pointer.
    def load_task_list(self):
        self.empty_task_list()
        message = load_user_tasks(controller.token)

        if message == "Error":
            self.error_message(True, "Internal Error")
            return
        elif message == "NotFound":
            return
        else:
            for i in range(len(message)):
                prior = message[i]["priority"]
                eval(f"self.task_color_{i+1}.setVisible(True)")
                eval(f"self.task_btn_{i+1}.setVisible(True)")
                eval(f"self.taskdate_{i+1}.setVisible(True)")

                if prior == "Urgent - Important":
                    color = controller.do_color
                elif prior == "Urgent - Not Important":
                    color = controller.delegate_color
                elif prior == "Not Urgent - Important":
                    color = controller.schedule_color
                else:
                    color = controller.delete_color

                eval(f"self.task_color_{i+1}.setStyleSheet(\"background-color: {color};\")")
                eval(f"self.task_btn_{i+1}.setVisible(True)")
                eval(f"self.taskdate_{i+1}.setVisible(True)")

                name = message[i]["name"]
                eval(f"self.task_btn_{i+1}.setText(\"{name}\")")

                date = message[i]["deadline"][:10]
                date_format = datetime.date.fromisoformat(date)
                date_format += datetime.timedelta(days=1)
                eval(f"self.taskdate_{i+1}.setText(\"{date_format}\")")

                func = f"self.task_btn_{i+1}.setProperty"
                eval(func)("ID", message[i]["id"])

                func = f"self.task_color_{i+1}.setProperty"
                eval(func)("prior", prior)

    ## Method get_pos
    # @brief Changes position variable in Controller according to task's
    # priority and ID
    #
    # @param self The object pointer.
    # @param prior Task priority
    # @param task_id Integer value of task ID
    def get_pos(self, prior, id):
        for i in range(1, 7):
            if eval(f"{id} == self.{prior}_task{i}_button.property(\"ID\")"):
                controller.position = i

    ## Method load_list_task_data
    # @brief Loads data of a clicked task button to the Left Bar
    #
    # @param self The object pointer.
    # @param task_id Integer value of task ID
    def load_list_task_data(self, task_id):
        message = load_user_tasks(controller.token)

        if message == "Error":
            self.error_message(True, "Internal Error")
            return
        else:
            controller.id = task_id

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

                    controller.task_list = True

                    date = message[i]["deadline"]
                    date_format = datetime.date.fromisoformat(date[:10])
                    date_format += datetime.timedelta(days=1)
                    self.dateEdit.setDate(date_format)
                    break

    ## Method load_task_data
    # @brief Loads task data after a particular task button was clicked
    #
    # @param self The object pointer.
    # @param pos Position of a particular button in the matrix
    # @param task_id Integer value of task ID
    def load_task_data(self, pos, task_id):
        message = load_user_tasks(controller.token)

        if message == "Error":
            self.error_message(True, "Internal Error")
            return
        else:
            controller.id = task_id

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

                    date = message[i]["deadline"]
                    date_format = datetime.date.fromisoformat(date[:10])
                    date_format += datetime.timedelta(days=1)
                    self.dateEdit.setDate(date_format)
                    controller.position = pos
                    break

    ## Method color_picker
    # @brief Loads all tasks data to matrix
    #
    # @param self The object pointer.
    def load_tasks_data(self):
        message = load_user_tasks(controller.token)

        if message == "Error":
            self.error_message(True, "Internal Error")
            return
        elif message == "NotFound":
            return
        else:
            for i in range(len(message)):
                prior = message[i]["priority"]
                result, prior, position = self.check_availibility(prior)
                if not result:
                    return

                eval(f"self.{prior}_task{position}.setEnabled(True)")
                eval(f"self.{prior}_task{position}_button.setEnabled(True)")

                style = "\"background-color: rgb(255, 255, 255);\" \"border: 1px solid;\" \"border-color: red;\" \"border-radius: 10px;\""
                eval(f"self.{prior}_task{position}.setStyleSheet({style})")
                eval(f"self.{prior}_task{position}_button.setStyleSheet(\"color: black;\")")

                task_name = message[i]['name']
                if len(task_name) > controller.max_length:
                    task_name = task_name[:17] + "..."

                eval(f"self.{prior}_task{position}_button.setText(\"{task_name}\")")

                func = f"self.{prior}_task{position}_button.setProperty"
                eval(func)("ID", message[i]["id"])

    ## Method add_prior_task
    # @brief Autocompletes a priority in Left Bar
    #
    # @param self The object pointer.
    # @param msg Button's parameter
    def add_prior_task(self, msg):
        controller.id = -1
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

    ## Method change_matrix_colors
    # @brief Changes colors of backgrounds in a matrix
    #
    # @param self The object pointer.
    def change_matrix_colors(self):
        self.upLeft.setStyleSheet(f"background-color: {controller.do_color};")
        self.upRight.setStyleSheet(f"background-color: {controller.schedule_color};")
        self.downLeft.setStyleSheet(f"background-color: {controller.delegate_color};")
        self.downRight.setStyleSheet(f"background-color: {controller.delete_color};")

    ## Method color_picker
    # @brief Opens a color picker window
    #
    # @param self The object pointer.
    # @param prior Task priority
    def color_picker(self, prior):
        qcolor = QColorDialog.getColor()
        if qcolor.isValid():
            color_hex = qcolor.name()

            if color_hex == "#ffffff" or color_hex == "#000000" or color_hex == "#ff0000":
                self.error_message(True, "Pick a different color")
            else:
                rgb = color_hex.lstrip('#')
                rgb = tuple(int(rgb[i:i + 2], 16) for i in (0, 2, 4))

                if prior == "do":
                    controller.do_color = f"rgb{rgb}"
                elif prior == "schedule":
                    controller.schedule_color = f"rgb{rgb}"
                elif prior == "delegate":
                    controller.delegate_color = f"rgb{rgb}"
                else:
                    controller.delete_color = f"rgb{rgb}"

                self.change_matrix_colors()
                self.error_message(False, "Color was successfully changed")

    ## Static method check_registration
    # @brief Logouts user and loads Login and Registration Page
    @staticmethod
    def log_out():
        multiple_screens.removeWidget(multiple_screens.widget(0))
        loginpage = LoginPage()
        multiple_screens.insertWidget(0, loginpage)
        multiple_screens.setCurrentIndex(0)


##
# @brief Class LoginPage contains initialization and button methods
#
class LoginPage(QtWidgets.QMainWindow, Ui_LoginPage):
    ## Method __init__
    # @brief Function for initialization
    #
    # @param self The object pointer.
    def __init__(self):
        super().__init__()
        self.setupUi(self)

        # ERROR LABELS
        self.loginError.setVisible(False)
        self.registrationError.setVisible(False)

        # BUTTONS - LOGIN, REGISTER
        self.loginBtn.clicked.connect(self.log_in)
        self.registerBtn.clicked.connect(self.register_user)

    ## Method log_in
    # @brief Loads MainWindow if login was successful
    #
    # @param self The object pointer.
    def log_in(self):
        if self.check_login():
            multiple_screens.setMinimumSize(1150, 720)
            multiple_screens.setMaximumSize(1920, 1080)
            multiple_screens.removeWidget(multiple_screens.widget(1))
            window = Window()
            multiple_screens.insertWidget(1, window)
            multiple_screens.setCurrentIndex(1)
            multiple_screens.showMaximized()
            window.load_tasks_data()

    ## Method check_registration
    # @brief Checks if login was successful
    #
    # @param self The object pointer.
    def check_login(self):
        passwd = self.loginPassword.text()
        user_name = self.loginUserName.text()

        if passwd == "" or user_name == "":
            self.loginError.setText("Fill all boxes")
            self.loginError.setVisible(True)
            return False

        message = log_in_user(user_name, passwd)

        if message == "Error":
            self.loginError.setText("Internal Error: 500 :(")
            self.loginError.setVisible(True)
            return False
        elif message == "incorrectPassword":
            self.loginError.setText("Incorrect password")
            self.loginError.setVisible(True)
            return False
        elif message == "notFound":
            self.loginError.setText("User with given\nusername does not exist")
            self.loginError.setVisible(True)
            return False
        else:
            controller.token = message[10:len(message)-2]
            return True

    ## Method register_user
    # @brief Loads MainWindow if registration was successful
    #
    # @param self The object pointer.
    def register_user(self):
        if self.check_registration():
            multiple_screens.setMinimumSize(1150, 720)
            multiple_screens.setMaximumSize(1920, 1080)
            multiple_screens.removeWidget(multiple_screens.widget(1))
            window = Window()
            multiple_screens.insertWidget(1, window)
            multiple_screens.setCurrentIndex(1)
            multiple_screens.showMaximized()
            window.load_tasks_data()

    ## Method check_registration
    # @brief Checks if registration was successful
    #
    # @param self The object pointer.
    def check_registration(self):
        user_name = self.userNameLineEdit.text()
        email = self.registerEmail.text()
        passwd = self.registerPassword.text()
        passwd_again = self.registerPasswordAgain.text()

        if user_name == "" or email == "" or passwd == "" or passwd_again == "":
            self.registrationError.setText("Fill all boxes")
            self.registrationError.setVisible(True)
            return False
        elif passwd != passwd_again:
            self.registrationError.setText("Passwords do not match")
            self.registrationError.setVisible(True)
            return False

        message = create_new_user(user_name, passwd, email)
        if message == "Error":
            self.registrationError.setText("Internal Error 500 :(")
            self.registrationError.setVisible(True)
        elif message == "UserExists":
            self.registrationError.setText("User with given\nusername already exists")
            self.registrationError.setVisible(True)
            return False
        else:
            controller.token = message[10:len(message)-2]
            return True


##
# @brief Class Controller contains variables for controlling
# application
#
class Controller:
    max_length = 20
    token = ""
    id = -1
    prior = ""
    position = -1
    task_list = False

    do_color = "rgb(252, 158, 158)"
    schedule_color = "rgb(166, 166, 255)"
    delegate_color = "rgb(255, 255, 168)"
    delete_color = "rgb(164, 255, 164)"


# Execute application
if __name__ == "__main__":
    app = QApplication(sys.argv)
    controller = Controller()
    login_page = LoginPage()
    window = Window()

    multiple_screens = QStackedWidget()
    multiple_screens.setWindowFlags(QtCore.Qt.WindowType.CustomizeWindowHint | QtCore.Qt.WindowType.WindowCloseButtonHint | QtCore.Qt.WindowType.WindowMinimizeButtonHint)
    multiple_screens.insertWidget(0, login_page)
    multiple_screens.insertWidget(1, window)
    multiple_screens.setCurrentIndex(0)
    multiple_screens.setWindowTitle("Brainfree")
    multiple_screens.setWindowIcon(QtGui.QIcon('user/check.png'))
    multiple_screens.showMaximized()

    sys.exit(app.exec_())
