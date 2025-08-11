package com.example.demo.service;
import com.example.demo.model.Exam;
import com.example.demo.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentExamService {

    @Autowired
    private ExamRepository examRepository;

    public Exam getExamWithQuestions(Long exam_id) {
        return examRepository.findById(exam_id)
                .orElseThrow(() -> new RuntimeException("Exam not found with id: " + exam_id));
    }
}
