package ca.bluenose.backend.restfulcontrollers;

import ca.bluenose.backend.beans.ApptLimit;
import ca.bluenose.backend.services.AppointmentLimitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<ApptLimit> getLimitByDate(@PathVariable Date date) {
        ApptLimit limit = apptLimitService.getLimitByDate(date);
        return ResponseEntity.ok(limit);
    }

    @GetMapping
    public ResponseEntity<List<ApptLimit>> getLimits() {
        List<ApptLimit> limits = apptLimitService.getLimits();
        return ResponseEntity.ok(limits);
    }
}
