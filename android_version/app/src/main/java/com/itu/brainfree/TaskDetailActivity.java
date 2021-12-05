package com.itu.brainfree;

import android.app.Activity;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class TaskDetailActivity extends AppCompatActivity{
    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.task_detail);

        Bundle b = getIntent().getExtras();

        TextView name = findViewById(R.id.task_detail_name);
        TextView description = findViewById(R.id.task_detail_description);
        TextView priority = findViewById(R.id.task_detail_priority);
        TextView deadline = findViewById(R.id.task_detail_deadline);


        name.setText(b.getString("name"));
        description.setText(b.getString("description"));
        priority.setText(b.getString("priority"));

        LocalDateTime date = LocalDateTime.parse(b.getString("deadline"));
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        String formatDate = date.format(format);
        deadline.setText(formatDate);


    }

    public void editTask (View view) {
        Bundle b = getIntent().getExtras();
        Intent intent = new Intent(this, EditTaskActivity.class);
        intent.putExtras(b);
        startActivity(intent);
    }

    public void completeTask(View view) throws JSONException {
        Bundle b = getIntent().getExtras();

        String url = "http://wedevs.sk:8080/tasks/" + b.getString("id");
        JSONObject reqBody = new JSONObject();
        reqBody.put("name", b.getString("name"));
        reqBody.put("description", b.getString("description"));
        reqBody.put("priority", b.getString("priority"));
        reqBody.put("deadline", b.getString("deadline"));
        reqBody.put("complete", 1);
        reqBody.put("user", b.getString("token"));//

        System.out.println(reqBody);

        RequestQueue queue = Volley.newRequestQueue(this);
        JsonObjectRequest request= new JsonObjectRequest(Request.Method.PUT, url, reqBody, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                System.out.println(response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
            }
        });
        queue.add(request);
        Intent intent = new Intent(this, MainActivity.class);
        intent.putExtra("token", b.getString("token"));
        startActivity(intent);
        finish();
    }

}
