package com.example.demo.service;

import com.example.demo.dto.QuestionRequest;
import com.example.demo.model.Exam;
import com.example.demo.model.Question;
import com.example.demo.repository.ExamRepository;
import com.example.demo.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherQuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ExamRepository examRepository;

    public Question addQuestionToExam(QuestionRequest request) {
        Optional<Exam> examOpt = examRepository.findById(request.getExamId());
        if (examOpt.isEmpty()) {
            throw new RuntimeException("Exam not found");
        }

        Question question = new Question();
        question.setQuestionText(request.getQuestionText());
        question.setOptionA(request.getOptionA());
        question.setOptionB(request.getOptionB());
        question.setOptionC(request.getOptionC());
        question.setOptionD(request.getOptionD());
        question.setCorrectAnswer(request.getCorrectAnswer());
        question.setExam(examOpt.get());

        return questionRepository.save(question);
    }

    public List<Question> getQuestionsByExam(Long examId) {
        Optional<Exam> examOpt = examRepository.findById(examId);
        if (examOpt.isEmpty()) {
            throw new RuntimeException("Exam not found");
        }

        return questionRepository.findByExam(examOpt.get());
    }
}
