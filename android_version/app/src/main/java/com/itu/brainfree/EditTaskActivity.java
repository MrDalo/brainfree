package com.itu.brainfree;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.CheckBox;
import android.widget.Checkable;
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

import java.util.Arrays;

public class EditTaskActivity extends  AppCompatActivity {

        private final String [] urgencies = {
                "urgent - important",
                "urgent - not important" ,
                "not urgent - important",
                "not urgent - not important"
        };

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.edit_task);

            Bundle b = getIntent().getExtras();

            EditText name = findViewById(R.id.edit_task_name);
            EditText description = findViewById(R.id.edit_task_description);
            Spinner priority = findViewById(R.id.edit_task_priority);
            EditText deadline = findViewById(R.id.edit_task_deadline);
            CheckBox complete = findViewById(R.id.edit_task_complete);


            complete.setChecked(getBool(b.getString("complete")));
            name.setHint(b.getString("name"));
            description.setHint(b.getString("description"));

            priority.setSelection(Arrays.asList(urgencies).indexOf(b.getString("priority")));
            deadline.setHint(b.getString("deadline").replace("T", " "));

        }

        private Boolean getBool(String intBool) {
            if (intBool.equals("1")) {return true;}
            else {return false;}
        }

        public void saveTask(View view) throws JSONException {
            Bundle b = getIntent().getExtras();

            EditText name = findViewById(R.id.edit_task_name);
            EditText description = findViewById(R.id.edit_task_description);
            Spinner priority = findViewById(R.id.edit_task_priority);
            EditText deadline = findViewById(R.id.edit_task_deadline);
            CheckBox complete = findViewById(R.id.edit_task_complete);


            String url = "http://wedevs.sk:8080/tasks/" + b.getString("id");
            JSONObject reqBody = new JSONObject();
            reqBody.put("name", handleChange(name.getText().toString(), b.getString("name")));
            reqBody.put("description", handleChange(description.getText().toString(), b.getString("description")) );
            reqBody.put("priority", handleChange(priority.getSelectedItem().toString(), b.getString("priority")));
            reqBody.put("deadline", handleChange(deadline.getText().toString().replace(" ", "T"), b.getString("deadline")));
            reqBody.put("complete", complete.isChecked() ? 1 : 0);
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

        private String handleChange(String newStr, String oldStr) {
            if (newStr.isEmpty()){
                return oldStr;
            } else {
                return newStr;
            }
        }



}
