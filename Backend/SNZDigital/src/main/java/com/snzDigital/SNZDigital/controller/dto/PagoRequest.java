package com.snzDigital.SNZDigital.controller.dto;

import lombok.Data;

@Data
public class PagoRequest {
    private String amount;
    private String currency;
    private String description;
}