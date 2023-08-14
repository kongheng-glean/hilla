package com.example.application.service;

import com.example.application.entity.Todo;

import java.util.List;

public interface TodoService {
    public List<Todo> fetchTodos();
    public Todo saveTodo(Todo todo);
}
