package com.example.application.service;

import com.example.application.entity.Todo;
import com.example.application.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Override
    public List<Todo> fetchTodos() {
        return todoRepository.findAll();
    }

    @Override
    public Todo saveTodo(Todo todo) {
        return todoRepository.save(todo);
    }
}
