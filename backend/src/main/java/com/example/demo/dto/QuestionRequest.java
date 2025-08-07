package com.example.demo.dto;

import lombok.*;

@Data
public class QuestionRequest {
    private Long examId;
    private String questionText;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctAnswer;
}
