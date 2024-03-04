package ca.bluenose.backend.restfulcontrollers;

import ca.bluenose.backend.beans.Appointment;
import ca.bluenose.backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8100")
@RequestMapping("/api/appointments")
public class AppointmentApi {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments(@RequestParam(required =
            false) String appt) {
        List<Appointment> appointments = new ArrayList<>();

        if (appt == null)
            appointments.addAll(appointmentRepository.findAll());
        if (appointments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }
}
