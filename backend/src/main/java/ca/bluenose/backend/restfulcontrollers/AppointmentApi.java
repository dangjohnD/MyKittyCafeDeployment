package ca.bluenose.backend.restfulcontrollers;

import ca.bluenose.backend.beans.Appointment;
import ca.bluenose.backend.exception.ErrorMessage;
import ca.bluenose.backend.repository.AppointmentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
//https://mykittycafe.azurewebsites.net
@CrossOrigin(origins = {"http://localhost:8100", "https://mykittycafe.azurewebsites.net"})
@RequestMapping("/api/appointments")
public class AppointmentApi {

    private final AppointmentRepository appointmentRepository;

    public AppointmentApi(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    // creating appointment function
    @PostMapping()
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
        Appointment _tutorial =
                appointmentRepository.save(new Appointment(appointment.getId(),
                        appointment.getFirstName(),
                        appointment.getLastName(),
                        appointment.getPersons(),
                        appointment.getPhone(),
                        appointment.getEmail(),
                        appointment.getDate()));
        return new ResponseEntity<>(_tutorial, HttpStatus.CREATED);
    }

    // grabs each current appointment in the database
    // if there are no appointments, HTTP STATUS NO CONTENT is given
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

    // view specific appointment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable(value = "id") Long id) {
        if (appointmentRepository.findById(id).isPresent()) {
            Appointment appointment = appointmentRepository.findById(id).get();
            return new ResponseEntity<>(appointment, HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // delete review based on ID value
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable("id") long id) {
        if (appointmentRepository.findById(id).isPresent()) {
            appointmentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorMessage("There is no review with this ID"));
        }
    }

    // adds an appointment after filling out form on webpage


}
