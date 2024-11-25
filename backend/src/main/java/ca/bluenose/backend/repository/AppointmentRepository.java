package ca.bluenose.backend.repository;

import ca.bluenose.backend.beans.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByEmail(String email);

    List<Appointment> findByDateBetween(LocalDateTime start, LocalDateTime end);
}
