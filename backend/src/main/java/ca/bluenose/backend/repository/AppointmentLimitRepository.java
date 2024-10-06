package ca.bluenose.backend.repository;

import ca.bluenose.backend.beans.ApptLimit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Date;


@Repository
public interface AppointmentLimitRepository extends JpaRepository<ApptLimit, Long> {
    ApptLimit findByDate(Date date);
}
