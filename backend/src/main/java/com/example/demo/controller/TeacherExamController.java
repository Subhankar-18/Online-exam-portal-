package com.example.demo.controller;

import com.example.demo.model.Exam;
import com.example.demo.service.TeacherExamService;
import com.example.demo.dto.ExamRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher/exams")
@CrossOrigin(
    origins = "http://localhost:3000",
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)

public class TeacherExamController {

    @Autowired
    private TeacherExamService teacherExamService;
    
@PostMapping("/create")
public ResponseEntity<Exam> createExam(@RequestBody ExamRequest request) {
    return ResponseEntity.ok(teacherExamService.createExam(request.getTeacherId(), request.getTitle()));
}


    @GetMapping("/by-teacher/{teacherId}")
    public ResponseEntity<List<Exam>> getExamsByTeacher(@PathVariable Long teacherId) {
        return ResponseEntity.ok(teacherExamService.getExamsByTeacher(teacherId));
    }
}
