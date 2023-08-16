package com.example.application.service;

import com.example.application.entity.Todo;

import java.util.List;

public interface TodoService {
    List<Todo> fetchTodos();
    Todo saveTodo(Todo todo);
}
