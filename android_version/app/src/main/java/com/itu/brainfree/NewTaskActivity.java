package com.itu.brainfree;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class NewTaskActivity extends  AppCompatActivity {

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.new_task);

            Bundle b = getIntent().getExtras();
            Spinner priority = findViewById(R.id.new_task_priority);

            priority.setSelection(b.getInt("button"));

        }

        public void addTask(View view) throws JSONException {

            Bundle b = getIntent().getExtras();

            EditText name = findViewById(R.id.new_task_name);
            EditText description = findViewById(R.id.new_task_description);
            Spinner priority = findViewById(R.id.new_task_priority);
            EditText deadline = findViewById(R.id.new_task_deadline);


            String url = "http://wedevs.sk:8080/tasks";
            JSONObject reqBody = new JSONObject();
            reqBody.put("name", name.getText().toString());
            reqBody.put("description", description.getText());
            reqBody.put("priority", priority.getSelectedItem().toString());
            reqBody.put("deadline", deadline.getText());
            reqBody.put("complete", 0);
            reqBody.put("user", b.getString("token"));//


            RequestQueue queue = Volley.newRequestQueue(this);
            JsonObjectRequest request= new JsonObjectRequest(Request.Method.POST, url, reqBody, new Response.Listener<JSONObject>() {
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
