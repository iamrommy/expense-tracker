package com.example.demo.config; // <- CHANGE to match package

import java.io.IOException;
import java.util.Collections;
import java.util.logging.Logger;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final Logger logger = Logger.getLogger(JwtFilter.class.getName());
    private final UserService userService;

    public JwtFilter(JwtUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {

        String path = req.getRequestURI();
        logger.fine("Incoming request: " + req.getMethod() + " " + path);

        // Skip JWT handling for public auth endpoints (redundant but safe)
        if (path.startsWith("/api/auth/") || path.equals("/public-test") || path.equals("/")) {
            chain.doFilter(req, res);
            return;
        }

        String authHeader = req.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                if (jwtUtil.validate(token)) {
                    String email = jwtUtil.extractEmail(token);
                    User user = userService.findByEmail(email);
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, null,
                            Collections.emptyList());
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    logger.fine("JWT accepted for user: " + user);
                } else {
                    logger.fine("JWT invalid for request: " + path);
                }
            } catch (Exception e) {
                logger.warning("JWT validation error (ignored): " + e.getMessage());
                // DO NOT throw — continue without auth; Spring will return 401 for protected
                // endpoints
            }
        } else {
            logger.fine("No Authorization header for: " + path);
        }

        chain.doFilter(req, res);
    }
}
