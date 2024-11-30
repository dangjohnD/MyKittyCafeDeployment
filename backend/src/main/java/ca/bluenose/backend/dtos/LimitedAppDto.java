package ca.bluenose.backend.dtos;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class LimitedAppDto {
    private Long id;
    private int persons;
    private Date date;
}