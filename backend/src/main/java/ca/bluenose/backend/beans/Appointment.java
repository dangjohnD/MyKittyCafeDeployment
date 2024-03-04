package ca.bluenose.backend.beans;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "realappointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "first_name")
    private String firstName;

    @Column(nullable = false, name = "last_name")
    private String lastName;

    @Column(nullable = false, name = "persons")
    private Integer persons;

    @Column(nullable = false, name = "phone")
    private String phone;

    @Column(nullable = false, name = "email")
    private String email;

    @Column(nullable = false, name = "date")
    private Date date;
}
