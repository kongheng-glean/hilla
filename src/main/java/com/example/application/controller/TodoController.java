package com.example.application.controller;

import com.example.application.entity.Todo;
import com.example.application.service.TodoService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class TodoController {

    @Autowired
    private TodoService todoService;

    public @Nonnull List<@Nonnull Todo> fetchTodos() {
        return todoService.fetchTodos();
    }

    public Todo save(Todo todo) {
        return todoService.saveTodo(todo);
    }
}
