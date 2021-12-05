package com.itu.brainfree.util;

import static java.time.temporal.ChronoUnit.DAYS;
import static java.time.temporal.ChronoUnit.HOURS;

import android.content.Context;
import android.os.Build;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import androidx.annotation.RequiresApi;

import com.itu.brainfree.R;
import com.itu.brainfree.Task;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class TaskListAdapter extends BaseAdapter {


    private LayoutInflater inflater;
    private List<Task> taskList = new ArrayList<>();

    public TaskListAdapter(Context context) {
        inflater = LayoutInflater.from(context);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public View getView(int position, View view, ViewGroup parent) {
        Task task = (Task) getItem(position);
        if (view == null){
            view = inflater.inflate(R.layout.task, null);
        }
        TextView name = view.findViewById(R.id.task_content);
        TextView priority = view.findViewById(R.id.task_priority);
        TextView deadline = view.findViewById(R.id.task_deadline);
        TextView id = view.findViewById(R.id.task_id);

        System.out.println("TaskListAdapter:" );


        name.setText(task.getName());
        priority.setText(task.getPriority());

        long timeLeft = LocalDateTime.now().until(task.getDeadline(), DAYS);
        String units = " days";

        if (timeLeft == 0){
            timeLeft = LocalDateTime.now().until(task.getDeadline(), HOURS);
            units = " hours";
        }
        deadline.setText(String.valueOf(timeLeft) + units +" left");

        if (timeLeft < 0){
            timeLeft = -timeLeft;
            deadline.setText(String.valueOf(timeLeft) + units +" after deadline");
        }
        id.setText(String.valueOf(position));

        return view;
     }

     @Override
    public Object getItem(int position) {
        return taskList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public int getCount() {
        return taskList.size();
    }

    public void setTaskList(List<Task> taskList) {
        this.taskList = taskList;
        notifyDataSetChanged();
    }
}
