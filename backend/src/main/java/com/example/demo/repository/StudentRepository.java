// StudentRepository.java
package com.example.demo.repository;
import com.example.demo.model.Students;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository <Students, Long>{
    List<Students> findByCourse(String course);
}



