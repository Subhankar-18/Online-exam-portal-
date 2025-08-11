package com.example.demo.dto;

import lombok.Data;
import java.util.List;

@Data
public class ExamSubmission {
    private Long examId;
    private List<StudentAnswer> answers;
}
