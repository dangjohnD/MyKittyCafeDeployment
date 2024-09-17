package ca.bluenose.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService{

    @Autowired
    @Lazy
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

    // New method to send HTML email
    public void sendHtmlEmail(String recipient, String subject, String htmlBody) {
        System.out.println("Sending HTML message...");

        MimeMessage mimeMessage = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setTo(recipient);
            helper.setSubject(subject);
            helper.setText(htmlBody, true); // HTML content

            mailSender.send(mimeMessage);
        } catch (MessagingException ex) {
            ex.printStackTrace();
        }

        System.out.println("Done");
    }
}
