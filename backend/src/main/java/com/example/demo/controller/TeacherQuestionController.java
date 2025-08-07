package com.example.demo.controller;

import com.example.demo.dto.QuestionRequest;
import com.example.demo.model.Question;
import com.example.demo.service.TeacherQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher/questions")
@CrossOrigin(origins = "http://localhost:3000") 
public class TeacherQuestionController {

    @Autowired
    private TeacherQuestionService teacherQuestionService;

    @PostMapping("/add")
    public ResponseEntity<Question> addQuestion(@RequestBody QuestionRequest request) {
        return ResponseEntity.ok(teacherQuestionService.addQuestionToExam(request));
    }

    @GetMapping("/by-exam/{examId}")
    public ResponseEntity<List<Question>> getQuestionsByExam(@PathVariable Long examId) {
        return ResponseEntity.ok(teacherQuestionService.getQuestionsByExam(examId));
    }
}
