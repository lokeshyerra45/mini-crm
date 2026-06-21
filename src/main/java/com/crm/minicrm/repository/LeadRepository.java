package com.crm.minicrm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crm.minicrm.entity.Lead;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {

    List<Lead> findByStatus(String status);

    List<Lead> findByAssignedTo(String assignedTo);

    long countByStatus(String status);
}