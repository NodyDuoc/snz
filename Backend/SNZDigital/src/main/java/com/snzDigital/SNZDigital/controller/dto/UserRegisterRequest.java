package com.snzDigital.SNZDigital.controller.dto;

import com.snzDigital.SNZDigital.persistence.entity.UserEntity;

public class UserRegisterRequest {
    private String email;
    private String password;
    private String firstName;
    private String secondName;
    private String firstLastName;
    private String secondLastName;
    private String phone;
    private boolean isActivated;
    private String roleName;

    // Getters y setters

    public UserEntity toUserEntity() {
        return UserEntity.builder()
                .email(this.email)
                .password(this.password)
                .firstName(this.firstName)
                .secondName(this.secondName)
                .firstLastName(this.firstLastName)
                .secondLastName(this.secondLastName)
                .phone(this.phone)
                .isActivated(this.isActivated)
                .build();
    }
}
