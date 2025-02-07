package com.example.attendance_system.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResetPasswordRequest {
    private String password;
    private String confirmPassword;
}
