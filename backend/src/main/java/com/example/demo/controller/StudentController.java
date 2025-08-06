package com.example.demo.controller;

// StudentController.java

import com.example.demo.model.Students;
import com.example.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000") // allow React frontend
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Students> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/by-course")
    public Map<String, List<Students>> getStudentsGroupedByCourse() {
        return studentService.getStudentsGroupedByCourse();
    }

    @PostMapping
    public Students addStudent(@RequestBody Students student) {
        return studentService.addStudent(student);
    }

    @PutMapping("/{id}")
    public Students updateStudent(@PathVariable Long id, @RequestBody Students student) {
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }
}

