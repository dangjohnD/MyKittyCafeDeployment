package ca.bluenose.backend.restfulcontrollers;

import ca.bluenose.backend.beans.ApptLimit;
import ca.bluenose.backend.services.AppointmentLimitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
// add values to config file and read the values after deployment
@CrossOrigin(origins = { "http://localhost:8100", "https://mykittycafe.azurewebsites.net" })
@RequestMapping("/api/limit")
public class AppointmentLimitsApi {

    @Autowired
    private AppointmentLimitService apptLimitService;

    @PostMapping
    public ResponseEntity<ApptLimit> addLimit(@RequestBody ApptLimit apptLimit) {
        ApptLimit createdLimit = apptLimitService.addLimit(apptLimit);
        return ResponseEntity.ok(createdLimit);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<ApptLimit> getLimitByDate(@PathVariable String date) {
        try {
            // Parse the date string to a Date object
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            Date parsedDate = formatter.parse(date);
            
            // Call the service with the parsed date
            ApptLimit limit = apptLimitService.getLimitByDate(parsedDate);
            return ResponseEntity.ok(limit);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Handle parsing error
        }
    }


    @GetMapping
    public ResponseEntity<List<ApptLimit>> getLimits() {
        List<ApptLimit> limits = apptLimitService.getLimits();
        return ResponseEntity.ok(limits);
    }
}
