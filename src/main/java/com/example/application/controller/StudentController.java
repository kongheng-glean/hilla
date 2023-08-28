package com.example.application.controller;

import com.example.application.entity.Student;
import com.example.application.service.StudentService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class StudentController {

    @Autowired
    private StudentService studentService;

    public @Nonnull List<@Nonnull Student> fetchAllStudents() {
        return studentService.fetchAllStudents();
    }

    public Student fetchStudentById(int id) {
        return studentService.fetchStudentById(id);
    }

    public Student modifyStudent(Student student) {
        return studentService.modifyStudent(student);
    }

    public String deleteStudent(int id) {
        return studentService.deleteStudent(id);
    }
}
