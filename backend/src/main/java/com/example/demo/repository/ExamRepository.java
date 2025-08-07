package com.example.demo.repository;
import com.example.demo.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByTeacherId(Long teacherId);
}
