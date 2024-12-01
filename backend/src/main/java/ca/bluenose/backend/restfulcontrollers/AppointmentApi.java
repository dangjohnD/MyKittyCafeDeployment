package ca.bluenose.backend.restfulcontrollers;

import ca.bluenose.backend.beans.Appointment;
import ca.bluenose.backend.dtos.LimitedAppDto;
import ca.bluenose.backend.exception.ErrorMessage;
import ca.bluenose.backend.repository.AppointmentRepository;
import ca.bluenose.backend.services.EmailService;
import ca.bluenose.backend.services.EmailTemplatesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
// add values to config file and read the values after deployment
@CrossOrigin(origins = { "http://localhost:8100", "https://mykittycafe.azurewebsites.net" })
@RequestMapping("/api/appointments")
public class AppointmentApi {

    private final AppointmentRepository appointmentRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailTemplatesService emailTemplateService;

    public AppointmentApi(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    // grabs each current appointment in the database
    // if there are no appointments, HTTP STATUS NO CONTENT is given
    @PreAuthorize("hasRole('ADMIN')")
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

    // User endpoint for limited appointment details
    @GetMapping("/user")
    public ResponseEntity<List<LimitedAppDto>> getLimitedAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();

        if (appointments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        // Map Appointment to LimitedAppDto
        List<LimitedAppDto> limitedAppointments = appointments.stream()
                .map(appointment -> LimitedAppDto.builder()
                        .id(appointment.getId())
                        .persons(appointment.getPersons())
                        .date(appointment.getDate())
                        .build())
                .collect(Collectors.toList());

        return ResponseEntity.ok(limitedAppointments);
    }


    @GetMapping("email/{email}")
    public ResponseEntity<List<Appointment>> getAppointmentsByEmail(@PathVariable("email") String email) {
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

        // Uses Template Service to generate a confirmation template, can be changed via EmailTemplatesService
        String confirmationMessage = emailTemplateService.generateAppointmentConfirmationEmail(appointment);
        emailService.sendEmail(appointment.getEmail(), "My Kitty Cafe Appointment For: "
                + appointment.getFirstName(), confirmationMessage);

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
            Appointment appointment = appointmentRepository.findById(id).get();
            appointmentRepository.deleteById(id);


            // Uses Template Service to generate a cancellation template, can be changed via EmailTemplatesService
            // Send Email
            String cancellationMessage = emailTemplateService.generateCancellationEmail(appointment);
            emailService.sendHtmlEmail(appointment.getEmail(), "My Kitty Cafe Appointment Cancellation Confirmation",
                    cancellationMessage);

            return new ResponseEntity<>(HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorMessage("There is no appointment with this ID"));
    }

    // delete appt based on ID value
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteAppointmentAdmin(@PathVariable("id") long id) {
        if (appointmentRepository.findById(id).isPresent()) {
            Appointment appointment = appointmentRepository.findById(id).get();
            appointmentRepository.deleteById(id);


            // Uses Template Service to generate a cancellation template, can be changed via EmailTemplatesService
            // Send Email
            String cancellationMessage = emailTemplateService.generateAdminCancellationEmail(appointment);
            emailService.sendHtmlEmail(appointment.getEmail(), "My Kitty Cafe Appointment Cancellation Notice",
                    cancellationMessage);

            return new ResponseEntity<>(HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorMessage("There is no appointment with this ID"));
    }
}
