package com.example.demo.dto;

import lombok.Data;

@Data
public class StudentAnswer {
    private Long questionId;
    private String answer; // The option student chose
}
