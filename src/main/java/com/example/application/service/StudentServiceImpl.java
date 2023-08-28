package com.example.application.service;

import com.example.application.entity.Student;
import com.example.application.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public List<Student> fetchAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student fetchStudentById(int id) {
        return studentRepository.findById(id).get();
    }

    @Override
    public Student modifyStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public String deleteStudent(int id) {
        studentRepository.deleteById(id);
        return "Student with Id: " + id + " was deleted.";
    }
}
