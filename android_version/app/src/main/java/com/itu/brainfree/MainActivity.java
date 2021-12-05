package com.itu.brainfree;

import static java.time.temporal.ChronoUnit.DAYS;
import static java.time.temporal.ChronoUnit.HOURS;
import static java.time.temporal.ChronoUnit.MINUTES;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;

import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.util.Log;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.google.android.material.appbar.AppBarLayout;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.navigation.NavigationBarView;
import com.itu.brainfree.util.TaskListAdapter;
import android.content.Intent;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.Spinner;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import androidx.appcompat.app.AlertDialog;

public class MainActivity extends AppCompatActivity implements Response.Listener<JSONArray>, Response.ErrorListener, AdapterView.OnItemSelectedListener {
    private TaskListAdapter taskListAdapter;
    private String filterSelection = "current";
    private String user = null;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        Bundle b = getIntent().getExtras();
        if (b != null && !b.isEmpty()) {
            user = b.getString("token");
        }

        this.taskListAdapter = new TaskListAdapter(this);
        ListView tasksListView = findViewById(R.id.tasks);
        tasksListView.setAdapter(taskListAdapter);

        Spinner filter = (Spinner) findViewById(R.id.filter_select);
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.filters, android.R.layout.simple_spinner_item);
        filter.setAdapter(adapter);
        filter.setOnItemSelectedListener(this);

        if (user == null){
            ActivityResultLauncher<Intent> login = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                    new ActivityResultCallback<ActivityResult>() {
                        @Override
                        public void onActivityResult(ActivityResult result) {
                            Bundle b = result.getData().getExtras();


                            if (b != null)
                                user = b.getString("result");
                                System.out.println(result.getResultCode());
                                getTasks();
                        }
                    });
            login.launch(new Intent(this, loginActivity.class));
        }


    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onItemSelected(AdapterView<?> parent, View view,
                               int pos, long id) {

        String selected = parent.getSelectedItem().toString();

        if (selected.equals("current")){
            filterSelection = "current";
            getTasks();

        } else if (selected.equals("all")) {
            filterSelection = ("all");
            getTasks();
        } else {
            filterSelection = ("complete");
            getTasks();
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }

    protected void getTasks()  {
        String url = "http://wedevs.sk:8080/tasks/" + user;
        RequestQueue queue = Volley.newRequestQueue(this);

        JsonArrayRequest request = new JsonArrayRequest(url, this, this);
        queue.add(request);

    }


    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onResponse(JSONArray response){
        try{
            List<Task> tasks = new ArrayList<>(response.length());
            List<Task> filteredTasks = new ArrayList<>();
            for (int i = 0; i < response.length(); i++){
                JSONObject item = response.getJSONObject(i);

                String id = item.getString("id");
                String name = item.getString("name");
                String description = item.getString("description");
                String priority = item.getString("priority");
                LocalDateTime deadline = LocalDateTime.parse(item.getString("deadline").replace("Z", ""));
                deadline = deadline.plusHours(1);
                String complete = item.getString("complete");
                String user = item.getString("user");


                tasks.add(new Task(id, name, description, priority, deadline, complete, user));
            }

            if (filterSelection.equals("current")) {

                Collections.sort(tasks, new Comparator<Task>() {
                    @RequiresApi(api = Build.VERSION_CODES.O)
                    @Override
                    public int compare(Task o1, Task o2) {
                        return (int) LocalDateTime.now().until(o1.getDeadline(), MINUTES) - (int) LocalDateTime.now().until(o2.getDeadline(), MINUTES);
                    }
                });
                Collections.sort(tasks, new Comparator<Task>() {
                    @Override
                    public int compare(Task o1, Task o2) {
                        return getPriorityValue(o1.getPriority()) - getPriorityValue(o2.getPriority());
                    }
                });
                for (Task t : tasks) {
                    long timeLeft = LocalDateTime.now().until(t.getDeadline(), MINUTES);
                    if (t.getComplete().equals("0") && timeLeft > 0){
                        filteredTasks.add(t);
                    }
                }
            } else if (filterSelection.equals("complete")) {
                for (Task t : tasks) {
                    if (t.getComplete().equals("1")){
                        filteredTasks.add(t);
                    }
                }
            } else {
                filteredTasks = tasks;
            }


            taskListAdapter.setTaskList(filteredTasks);




        } catch (JSONException e) {
            new AlertDialog.Builder(this).setTitle("Error - main").setMessage(e.toString()).show();
        }
    }

    @Override
    public void onErrorResponse(VolleyError e){
        taskListAdapter.setTaskList(new ArrayList<Task>());
        //new AlertDialog.Builder(this).setTitle("Error - myass").setMessage(e.getMessage()).show();
    }
    private int getPriorityValue(String priority) {
        if (priority.equals("urgent - important")){ return 0; }
        else if (priority.equals("urgent - not important")){return 1;}
        else if (priority.equals("not urgent - important")){return 2;}
        else {return 3;}
    }

    public void createTask(View view){
        Intent intent = new Intent(this, TaskSetup.class);
        intent.putExtra("token", user);
        startActivity(intent);
    }

    public void showTask(View view){
        TextView text = view.findViewById(R.id.task_id);
        Task task = (Task) taskListAdapter.getItem(Integer.parseInt(text.getText().toString()));

        Bundle b = new Bundle();
        b.putString("id", task.getId());
        b.putString("name", task.getName());
        b.putString("description", task.getDescription());
        b.putString("priority", task.getPriority());
        b.putString("deadline", task.getDeadline().toString());
        b.putString("complete", task.getComplete());
        b.putString("token", user);

        Intent intent = new Intent(this, TaskDetailActivity.class);
        intent.putExtras(b);
        startActivity(intent);

    }


}