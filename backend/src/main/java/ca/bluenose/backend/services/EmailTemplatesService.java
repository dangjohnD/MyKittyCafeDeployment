package ca.bluenose.backend.services;

import ca.bluenose.backend.beans.Appointment;
import ca.bluenose.backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EmailTemplatesService {


    @Autowired
    private AppointmentRepository appointmentRepository; // Inject your appointment repository

    @Autowired
    private EmailService emailService; // Inject your email service


    public String generateAppointmentConfirmationEmail(Appointment appointment) {
        return  "Dear " + appointment.getFirstName() + " " + appointment.getLastName() + ",\n\n" +
                "This is a reminder of your upcoming appointment.\n\n" +
                "Details:\n" +
                "Date: " + appointment.getDate() + "\n" +
                "Persons involved: " + appointment.getPersons() + "\n" +
                "Contact Phone: " + appointment.getPhone() + "\n" +
                "Email: " + appointment.getEmail() + "\n\n" +
                "We look forward to seeing you!\n\n" +
                "Best regards,\n" +
                "My Kitty Cafe";
    }
    public String generateCancellationEmail(Appointment appointment) {
        return "<html>" +
                "<body>" +
                "<h2>Dear " + appointment.getFirstName() + " " + appointment.getLastName() + ",</h2>" +
                "<p>We have successfully processed your request to cancel the following appointment at <strong>My Kitty Cafe</strong>:</p>" +
                "<table style='border: 1px solid black; padding: 10px;'>" +
                "<tr><td><strong>Date</strong>:</td><td>" + appointment.getDate() + "</td></tr>" +
                "<tr><td><strong>Persons Involved</strong>:</td><td>" + appointment.getPersons() + "</td></tr>" +
                "<tr><td><strong>Contact Phone</strong>:</td><td>" + appointment.getPhone() + "</td></tr>" +
                "<tr><td><strong>Email</strong>:</td><td>" + appointment.getEmail() + "</td></tr>" +
                "</table>" +
                "<p>We’re sorry to see you cancel, but we hope to see you soon. If you would like to reschedule, please visit our <a href='https://mykittycafe.com'>website</a> or contact us directly.</p>" +
                "<p>Thank you for choosing <strong>My Kitty Cafe</strong>. We look forward to serving you in the future!</p>" +
                "<p>Best regards,</p>" +
                "<p>The My Kitty Cafe Team</p>" +
                "</body>" +
                "</html>";
    }

    //@Scheduled(cron = "0 0 * * * ?") // checks every hour on the hour
    @Scheduled(cron = "0 */5 * * * ?") // Runs every 5 minutes for testing
    public void sendAppointmentReminder() {
        LocalDateTime now = LocalDateTime.now();

        // test code to make it only send once (checks if its between 23 and 24 hours ,
        // it only checks once per hour, should work
        LocalDateTime startReminderTime = now.plusHours(23);
        LocalDateTime endReminderTime = now.plusHours(24);

        // Find all appointments scheduled for the next 24 hours
        List<Appointment> appointments = appointmentRepository.findByDateBetween(startReminderTime, endReminderTime);

        for (Appointment appointment : appointments) {
            // Send email reminder template
            String message = "Hey " + appointment.getFirstName() + ",\n\n" +
                    "You have an appointment tomorrow!.\n" +
                    "Details:\n" +
                    "Date: " + appointment.getDate() + "\n" +
                    "Persons involved: " + appointment.getPersons() + "\n" +
                    "Contact Phone: " + appointment.getPhone() + "\n" +
                    "Email: " + appointment.getEmail() + "\n\n" +
                    "We look forward to seeing you!\n" +
                    "Best regards,\n" +
                    "My Kitty Cafe";

            emailService.sendEmail(appointment.getEmail(),
                    "Reminder: Your Appointment at My Kitty Cafe",
                    message);
        }

        emailService.sendEmail("farmusfresh@gmail.com", "test scheduled email", "hi lmao time is: " + now);
    }

}
