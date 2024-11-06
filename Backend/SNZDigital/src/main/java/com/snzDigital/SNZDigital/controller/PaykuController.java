package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.PagoRequest;
import com.snzDigital.SNZDigital.service.PaykuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payku")
public class PaykuController {

    @Autowired
    private PaykuService paykuService;

    @PostMapping("/create-transaction")
    public ResponseEntity<String> createTransaction(@RequestBody PagoRequest pagoRequest) {
        try {
            String paykuResponse = paykuService.createTransaction(
                    pagoRequest.getAmount().toString(),
                    pagoRequest.getOrder(),
                    pagoRequest.getSubject(),
                    pagoRequest.getEmail(),
                    pagoRequest.getCurrency(),
                    pagoRequest.getUrlreturn(),
                    pagoRequest.getUrlnotify()
            );
            return ResponseEntity.ok(paykuResponse);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }


}