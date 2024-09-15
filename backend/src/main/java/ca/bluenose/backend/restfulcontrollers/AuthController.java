package ca.bluenose.backend.restfulcontrollers;

import java.util.Optional;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ca.bluenose.backend.beans.User;
import ca.bluenose.backend.repository.UserRepository;
import ca.bluenose.backend.dtos.UserDto;

@RestController
@CrossOrigin(origins = { "http://localhost:8100", "https://mykittycafe.azurewebsites.net" })
public class AuthController {

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    @Autowired
    private UserRepository userRepository;


    // create password encoder bean and autowire to make it easier for dependency injection
    // use lazy to prevent circular references [it will break otherwise]
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Autowired
    @Lazy
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/api/users")
    public ResponseEntity<String> createUser(@RequestBody UserDto userDto) {
        try {
            // Check if the username already exists
            if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
                // If the username exists, return a conflict res 409
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
            }

            // Map UserDto to User entity
            User user = User.builder()
                            .firstName(userDto.getFirstName())
                            .lastName(userDto.getLastName())
                            .username(userDto.getUsername())
                            .build();
            
            // Encrypt the password using our autowired passwordEncoder
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));

            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\": \"success\"}");
        } catch (Exception e) {
            System.out.println(e);
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
            if (passwordEncoder.matches(password, user.getPassword())) {
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
@Getter
class LoginRequest {
    private String username;
    private String password;
}
