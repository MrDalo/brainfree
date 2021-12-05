package com.itu.brainfree;

import java.time.LocalDateTime;


public class Task {
    private final String id;
    private final String name;
    private final String description;
    private final String priority;
    private final LocalDateTime deadline;
    private final String complete;
    private final String user;

    Task(String id, String name, String description, String priority, LocalDateTime deadline, String complete, String user){
        this.id = id;
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.deadline = deadline;
        this.complete = complete;
        this.user = user;
    }

    public String getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getDescription() {
        return description;
    }
    public String getPriority() {
        return priority;
    }
    public LocalDateTime getDeadline() {
        return deadline;
    }
    public String getComplete() {
        return complete;
    }
    public String getUser() {
        return user;
    }

    public int size = 5; // number of values without id and user

}
