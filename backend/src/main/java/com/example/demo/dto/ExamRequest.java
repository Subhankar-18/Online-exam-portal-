package com.example.demo.dto; 

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExamRequest {
    private Long teacherId;
    private String title;
}
