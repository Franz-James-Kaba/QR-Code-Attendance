package com.example.attendance_system.user;

import com.example.attendance_system.exceptions.UnauthorizedUserException;
import com.example.attendance_system.exceptions.UserNotFoundException;
import com.example.attendance_system.role.FacilitatorRole;
import com.example.attendance_system.role.Role;
import com.example.attendance_system.role.UserRole;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAnyAuthority('admin:create', 'admin:update', 'admin:read', 'admin:delete')")
@RequiredArgsConstructor
public class AdminController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) throws MessagingException {
        userService.createUser(request, new UserRole());
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/create-facilitator")
    public ResponseEntity<String> createFacilitator(@Valid @RequestBody RegisterRequest request) throws MessagingException {
        return ResponseEntity.ok(userService.createUser(request, new FacilitatorRole()));
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable("userId") Long userId, @RequestBody UpdateUserRequest request) {
        return ResponseEntity.ok(userService.updateUser(userId, request));
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") Long userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok("User deleted successfully");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"); // Return 404 if user not found
        } catch (UnauthorizedUserException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to perform this action");
        }
    }

    // get a user by using a user email
    @GetMapping("/users")
    public ResponseEntity<?> getUser(@RequestParam("email") @Valid String email) {
        try{
            var user = userService.getUserByEmail(email);
            return ResponseEntity.ok(user);
        }catch (UserNotFoundException e) {
            return buildErrorResponse("User not found", HttpStatus.NOT_FOUND);
        }catch (UnauthorizedUserException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to perform this action");
        }
    }


    //get all nsps
    @GetMapping("/users/nsps")
    public ResponseEntity<?> getAllUsers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by("email").ascending());
            Page<User> users = userService.getAllUsers(pageable);
            return ResponseEntity.ok(users);
        }catch (UserNotFoundException e) {
            return buildErrorResponse("User not found", HttpStatus.NOT_FOUND);
        }catch (UnauthorizedUserException e) {
            return buildErrorResponse("You are not authorized to perform this action", HttpStatus.FORBIDDEN);
        }

    }

    // Get all facilitator
    @GetMapping("/users/facilitators")
    public  ResponseEntity<?> getAllFacilitators(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by("email").ascending());
            Page<User> users = userService.getAllFacilitators(pageable);
            return ResponseEntity.ok(users);
        }catch (UserNotFoundException e) {
            return buildErrorResponse("There are no facilitators", HttpStatus.NOT_FOUND);
        }catch (UnauthorizedUserException e) {
            return buildErrorResponse("You are not authorized to perform this action", HttpStatus.FORBIDDEN);
        }

    }

    //Helper method to handle error messages
      private ResponseEntity<Map<String, String>> buildErrorResponse(String message, HttpStatus status) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", message);
        return ResponseEntity.status(status).body(errorResponse);
    }
}
