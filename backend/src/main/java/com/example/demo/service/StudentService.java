// StudentService.java
package com.example.demo.service;

import com.example.demo.model.Students;
import com.example.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Get all students
    public List<Students> getAllStudents() {
        return studentRepository.findAll();
    }

    // Add a student
    public Students addStudent(Students student) {
        return studentRepository.save(student);
    }

    // Update a student
    public Students updateStudent(Long id, Students updatedStudent) {
        return studentRepository.findById(id)
                .map(student -> {
                    student.setName(updatedStudent.getName());
                    student.setEmail(updatedStudent.getEmail());
                    student.setCourse(updatedStudent.getCourse());
                    return studentRepository.save(student);
                })
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    // Delete a student
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    // Group students by course
    public Map<String, List<Students>> getStudentsGroupedByCourse() {
        List<Students> allStudents = studentRepository.findAll();
        Map<String, List<Students>> groupedByCourse = new HashMap<>();

        for (Students student : allStudents) {
            String course = student.getCourse();
            groupedByCourse
                    .computeIfAbsent(course, k -> new ArrayList<>())
                    .add(student);
        }

        return groupedByCourse;
    }
}