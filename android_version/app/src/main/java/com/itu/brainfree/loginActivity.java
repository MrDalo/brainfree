package com.itu.brainfree;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.itu.brainfree.util.TaskListAdapter;

import org.json.JSONException;
import org.json.JSONObject;

public class loginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);


    }
    private JSONObject buildBody(String username, String password) throws JSONException {
        JSONObject reqBody = new JSONObject();
        reqBody.put("username", username);
        reqBody.put("password", password);
        return reqBody;
    }

    public void login(View view) {
        EditText username = findViewById(R.id.login_username);
        EditText password = findViewById(R.id.login_password);
        String url = "http://wedevs.sk:8080/login";


        RequestQueue queue = Volley.newRequestQueue(this);
        try {
            JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url, buildBody(username.getText().toString(), password.getText().toString()), new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {

                    try {
                        if (!response.getString("token").isEmpty()) {
                            System.out.println(response.getString("token"));
                            Intent returnIntent = new Intent();
                            returnIntent.putExtra("result", response.getString("token"));
                            setResult(Activity.RESULT_OK, returnIntent);
                            finish();
                        }
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }



                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    error.printStackTrace();

                }
            });
            queue.add(request);
        } catch (JSONException e) {
            System.out.println("fuck");
        }



    }
}
