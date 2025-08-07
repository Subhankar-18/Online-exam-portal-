package com.example.demo.service;

import com.example.demo.model.Exam;
import com.example.demo.model.User;
import com.example.demo.repository.ExamRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TeacherExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private UserRepository userRepository;

   public Exam createExam(Long teacherId, String examTitle) {
    User teacher = userRepository.findById(teacherId)
        .orElseThrow(() -> new RuntimeException("User not found with id: " + teacherId));

    Exam exam = new Exam();
    exam.setTitle(examTitle);
    exam.setTeacher(teacher);
    exam.setCreatedAt(LocalDateTime.now());

    return examRepository.save(exam);
}


    public List<Exam> getExamsByTeacher(Long teacherId) {
        return examRepository.findByTeacherId(teacherId);
    }
}
