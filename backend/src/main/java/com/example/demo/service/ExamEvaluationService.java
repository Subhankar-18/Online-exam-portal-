package com.example.demo.service;

import com.example.demo.dto.ExamSubmission;
import com.example.demo.dto.StudentAnswer;
import com.example.demo.model.Question;
import com.example.demo.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ExamEvaluationService {

    @Autowired
    private QuestionRepository questionRepository;

    public Map<String, Object> evaluateExam(ExamSubmission submission) {
        int score = 0;
        List<Map<String, Object>> results = new ArrayList<>();

        for (StudentAnswer answerDTO : submission.getAnswers()) {
            Question question = questionRepository.findById(answerDTO.getQuestionId())
                    .orElseThrow(() -> new RuntimeException("Question not found"));

            boolean correct = question.getCorrectAnswer().equalsIgnoreCase(answerDTO.getAnswer());

            if (correct) {
                score++;
            }

            Map<String, Object> questionResult = new HashMap<>();
            questionResult.put("questionId", question.getId());
            questionResult.put("yourAnswer", answerDTO.getAnswer());
            questionResult.put("correctAnswer", question.getCorrectAnswer());
            questionResult.put("isCorrect", correct);

            results.add(questionResult);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("score", score);
        response.put("totalQuestions", submission.getAnswers().size());
        response.put("details", results);

        return response;
    }
}
