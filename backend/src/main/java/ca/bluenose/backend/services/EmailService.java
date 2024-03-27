package ca.bluenose.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service
public class EmailService extends JavaMailSenderImpl {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String recipient, String subject, String body) {
        System.out.println("Sending message...");

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(recipient);
        msg.setSubject(subject);
        msg.setText(body);

        try {
            mailSender.send(msg);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        System.out.println("Done");
    }
}
