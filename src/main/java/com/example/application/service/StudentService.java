package com.example.application.service;

import com.example.application.entity.Student;

import java.util.List;

public interface StudentService {
    List<Student> fetchAllStudents();
    Student fetchStudentById(int id);
    Student modifyStudent(Student student);
    String deleteStudent(int id);
}
