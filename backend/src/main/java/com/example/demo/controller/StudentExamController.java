package com.example.demo.controller;
import com.example.demo.dto.ExamSubmission;
import com.example.demo.model.Exam;
import com.example.demo.model.Question;
import com.example.demo.service.ExamEvaluationService;
import com.example.demo.service.StudentExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/exams")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentExamController {

    @Autowired
    private StudentExamService studentExamService;

    @Autowired
    private ExamEvaluationService evaluationService;

    // Existing: Get exam with questions embedded (if needed)
    @GetMapping("/{exam_id}")
    public ResponseEntity<Exam> getExamWithQuestions(@PathVariable Long exam_id) {
        return ResponseEntity.ok(studentExamService.getExamWithQuestions(exam_id));
    }

    // New: Get only the questions for an exam
    @GetMapping("/{exam_id}/questions")
    public ResponseEntity<List<Question>> getQuestionsForExam(@PathVariable Long exam_id) {
        return ResponseEntity.ok(studentExamService.getQuestionsForExam(exam_id));
    }


    @PostMapping("/submit")
    public ResponseEntity<?> submitExam(@RequestBody ExamSubmission submission) {
        return ResponseEntity.ok(evaluationService.evaluateExam(submission));
    }
}
