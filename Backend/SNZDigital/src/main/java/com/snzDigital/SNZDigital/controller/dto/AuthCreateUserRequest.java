package com.snzDigital.SNZDigital.controller.dto;

import jakarta.validation.Valid;

public record AuthCreateUserRequest(@Valid String firstName,
                                    @Valid String secondName,
                                    @Valid String firstLastName,
                                    @Valid String secondLastName,
                                    @Valid String email,
                                    @Valid String password,
                                    @Valid String phone,
                                    @Valid boolean isActivated,
                                    @Valid AuthCreateRoleRequest authCreateRoleRequest
) {
}