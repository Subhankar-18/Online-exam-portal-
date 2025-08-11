package com.example.demo.repository;

import com.example.demo.model.Question;
import com.example.demo.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    // Find questions by exam entity
    List<Question> findByExam(Exam exam);

    // Optional: find by exam ID
    List<Question> findByExamId(Long exam_id);
}
