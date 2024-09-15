package ca.bluenose.backend.restfulcontrollers;

import ca.bluenose.backend.beans.Appointment;
import ca.bluenose.backend.exception.ErrorMessage;
import ca.bluenose.backend.repository.AppointmentRepository;
import ca.bluenose.backend.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
// add values to config file and read the values after deployment
@CrossOrigin(origins = { "http://localhost:8100", "https://mykittycafe.azurewebsites.net" })
@RequestMapping("/api/appointments")
public class AppointmentApi {

    private final AppointmentRepository appointmentRepository;

    @Autowired
    private EmailService emailService;

    public AppointmentApi(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    // grabs each current appointment in the database
    // if there are no appointments, HTTP STATUS NO CONTENT is given
    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments(@RequestParam(required = false) String appt) {
        List<Appointment> appointments = new ArrayList<>();

        if (appt == null) {
            appointments.addAll(appointmentRepository.findAll());
        }
        if (appointments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @PostMapping("/email")
    public ResponseEntity<List<Appointment>> getAppointmentsByEmail(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        
        if (email == null || email.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Return 400 if the email is missing
        }
    
        List<Appointment> appointments = appointmentRepository.findByEmail(email);
        
        if (appointments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    // creating appointment function
    // adds an appointment after filling out form on webpage
    @PostMapping()
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {

        System.out.println(appointment.getDate());

        Appointment _appt = appointmentRepository.save(new Appointment(appointment.getId(),
                appointment.getFirstName(),
                appointment.getLastName(),
                appointment.getPersons(),
                appointment.getPhone(),
                appointment.getEmail(),
                appointment.getDate()));

        //find way to not hardcode this

        String message = "Dear " + appointment.getFirstName() + " " + appointment.getLastName() + ",\n\n" +
                "This is a reminder of your upcoming appointment.\n\n" +
                "Details:\n" +
                "Date: " + appointment.getDate() + "\n" +
                "Persons involved: " + appointment.getPersons() + "\n" +
                "Contact Phone: " + appointment.getPhone() + "\n" +
                "Email: " + appointment.getEmail() + "\n\n" +
                "We look forward to seeing you!\n\n" +
                "Best regards,\n" +
                "My Kitty Cafe";
        emailService.sendEmail(appointment.getEmail(), "My Kitty Cafe Appointment For: "
                + appointment.getFirstName(), message);

        return new ResponseEntity<>(_appt, HttpStatus.CREATED);
    }

    // view specific appointment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable(value = "id") Long id) {
        if (appointmentRepository.findById(id).isPresent()) {
            Appointment appointment = appointmentRepository.findById(id).get();
            return new ResponseEntity<>(appointment, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    // delete appt based on ID value
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable("id") long id) {
        if (appointmentRepository.findById(id).isPresent()) {
            appointmentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorMessage("There is no appointment with this ID"));
    }
}
