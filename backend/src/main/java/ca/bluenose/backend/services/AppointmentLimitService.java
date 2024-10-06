package ca.bluenose.backend.services;

import ca.bluenose.backend.beans.ApptLimit;
import ca.bluenose.backend.repository.AppointmentLimitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AppointmentLimitService {
    @Autowired
    private AppointmentLimitRepository apptLimitRepository;

    public ApptLimit addLimit(ApptLimit apptLimit) {
        ApptLimit existingLimit = apptLimitRepository.findByDate(apptLimit.getDate());
        if (existingLimit != null) {
            existingLimit.setLimit(apptLimit.getLimit());
            return apptLimitRepository.save(existingLimit);
        }
        return apptLimitRepository.save(apptLimit);
    }

    public ApptLimit getLimitByDate(Date date) {
        return apptLimitRepository.findByDate(date);
    }

    public List<ApptLimit> getLimits() {
        return apptLimitRepository.findAll();
    }
}
