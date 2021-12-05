package com.itu.brainfree;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

import java.nio.BufferUnderflowException;

public class TaskSetup extends AppCompatActivity{

    private final String [] urgencies = {
            "urgent - important",
            "urgent - not important" ,
            "not urgent - important",
            "not urgent - not important"
    };

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.task_setup);

        Button btn1 = findViewById(R.id.urgency_btn_1);
        Button btn2 = findViewById(R.id.urgency_btn_2);
        Button btn3 = findViewById(R.id.urgency_btn_3);
        Button btn4 = findViewById(R.id.urgency_btn_4);

        btn1.setText(urgencies[0]);
        btn2.setText(urgencies[1]);
        btn3.setText(urgencies[2]);
        btn4.setText(urgencies[3]);

    }

    public void pickUrgency(View view) {
        Bundle b = getIntent().getExtras();

        System.out.println(view.getResources().getResourceName(view.getId()).split("/")[1]);

        Intent intent = new Intent(this, NewTaskActivity.class);
        intent.putExtra("button", getBtnId(view.getResources().getResourceName(view.getId()).split("/")[1]));
        intent.putExtra("token", b.getString("token"));
        startActivity(intent);
        finish();
    }

    protected int getBtnId(String btnId){
        if (btnId.equals("urgency_btn_1")) {
            return 0;
        } else if (btnId.equals("urgency_btn_2")) {
            return 1;
        } else if (btnId.equals("urgency_btn_3")) {
            return 2;
        } else if (btnId.equals("urgency_btn_4")){
            return 3;
        }
        return -1;
    }
}
