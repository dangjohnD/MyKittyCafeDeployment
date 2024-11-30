package ca.bluenose.backend.config;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import ca.bluenose.backend.beans.User;
import ca.bluenose.backend.dtos.UserDto;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class UserAuthenticationProvider {

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(User user) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3_600_000);

        // Assign roles based on username
        List<String> roles = new ArrayList<>();
        if ("admin@gmail.com".equalsIgnoreCase(user.getUsername())) {
            System.out.println("Admin sign");
            roles.add("ROLE_ADMIN");
        } else {
            roles.add("ROLE_USER");
        }

        return JWT.create()
                .withIssuer("mkc-backend")
                .withSubject(user.getUsername())
                .withClaim("roles", roles) // Add roles to token
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateToken(String token) {
        DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC256(secretKey))
                .build()
                .verify(token);

        String username = decodedJWT.getSubject();
        List<String> roles = decodedJWT.getClaim("roles").asList(String.class);

        List<GrantedAuthority> authorities = roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        return new UsernamePasswordAuthenticationToken(username, null, authorities);
    }
}
