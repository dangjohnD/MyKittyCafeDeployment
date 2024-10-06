package ca.bluenose.backend.services;

import ca.bluenose.backend.beans.Appointment;
import org.springframework.stereotype.Service;

@Service
public class EmailTemplatesService {

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
}
