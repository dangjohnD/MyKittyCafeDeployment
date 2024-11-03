package ca.bluenose.backend.beans;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "cats_db")
public class Cat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "birthday", nullable = false)
    //this specifies date only and not time
    @Temporal(TemporalType.DATE)
    private Date birthday;

    @Column(name = "colour", nullable = false)
    private String colour;

    @Column(name = "description")
    private String desc;

    @Column(name = "is_disabled", nullable = false)
    private boolean disabled;

    @Column(name = "note")
    private String note;

    @Column(name = "image")
    private String image;
}
