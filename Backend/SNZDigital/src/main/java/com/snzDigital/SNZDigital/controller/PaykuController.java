package com.snzDigital.SNZDigital.controller;

import org.springframework.web.bind.annotation.*;

import com.snzDigital.SNZDigital.service.PaykuService;
import com.snzDigital.SNZDigital.controller.dto.PagoRequest;

@RestController
@RequestMapping("/api/payku")
public class PaykuController {

    private final PaykuService paykuService;

    public PaykuController(PaykuService paykuService) {
        this.paykuService = paykuService;
    }

    @PostMapping("/pago")
    public String generarPago(@RequestBody PagoRequest pagoRequest) {
        return paykuService.generarPago(pagoRequest);
    }
}
