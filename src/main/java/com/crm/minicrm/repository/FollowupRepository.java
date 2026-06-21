package com.crm.minicrm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crm.minicrm.entity.Followup;

@Repository
public interface FollowupRepository extends JpaRepository<Followup, Long> {

    List<Followup> findByLeadId(Long leadId);

}