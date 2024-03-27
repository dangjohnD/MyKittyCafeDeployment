package ca.bluenose.backend.restfulcontrollers;

import java.util.Base64;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import ca.bluenose.backend.beans.User;
import ca.bluenose.backend.repository.UserRepository;
import ca.bluenose.dtos.UserDto;
import jakarta.annotation.PostConstruct;

@RestController
@CrossOrigin(origins = { "http://localhost:8100", "https://mykittycafe.azurewebsites.net" })
public class AuthController {

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    @Autowired
    private UserRepository userRepository;

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @PostMapping("/api/users")
    public ResponseEntity<String> createUser(@RequestBody UserDto userDto) {
        try {
            // Check if the username already exists
            if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
                // If the username exists, return a conflict response
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
            }

            // Map UserDto to User entity
            User user = User.builder()
                            .firstName(userDto.getFirstName())
                            .lastName(userDto.getLastName())
                            .username(userDto.getUsername())
                            .build();
            
            // Encrypt the password using BCryptPasswordEncoder
            user.setPassword(this.passwordEncoder().encode(userDto.getPassword()));

            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\": \"success\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create user");
        }
    }

    @PostMapping("/api/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();

        // Find the user by username in the database
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Compare the passwords
            if (this.passwordEncoder().matches(password, user.getPassword())) {
                // Passwords match, generate JWT token and return it
                String token = generateJwtToken(username);
                return new ResponseEntity<>("{\"message\": \"success\"}", HttpStatus.OK);
            }
        }

        // Return unauthorized response if credentials are invalid
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Invalid username or password\"}");
    }

    // Generate JWT token method
    private String generateJwtToken(String username) {
        // Your JWT token generation logic here
        return "jwt_token_here";
    }
}

// Define a class for the login request payload
class LoginRequest {
    private String username;
    private String password;

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }
}
