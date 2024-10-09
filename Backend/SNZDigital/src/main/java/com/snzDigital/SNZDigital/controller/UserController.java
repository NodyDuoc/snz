package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.AuthCreateUserRequest;
import com.snzDigital.SNZDigital.controller.dto.AuthResponse;
import com.snzDigital.SNZDigital.controller.dto.LoginRequestDTO;
import com.snzDigital.SNZDigital.persistence.entity.UserEntity;
import com.snzDigital.SNZDigital.service.AuthenticationService;
import com.snzDigital.SNZDigital.service.UserDetailServiceImp;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserDetailServiceImp userService;

    @Autowired
    private AuthenticationService authenticationService;


    @PostMapping("/create")
    public ResponseEntity<AuthResponse> createUser(@RequestBody @Valid AuthCreateUserRequest authCreateUserRequest) {
        // Delegar la creación del usuario al servicio
        AuthResponse authResponse = userService.createUser(authCreateUserRequest);

        // Devolver la respuesta con el token JWT
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/log-in")
    public ResponseEntity<AuthResponse>login(@RequestBody @Valid LoginRequestDTO userRequest){
        return new ResponseEntity<>(this.authenticationService.loginUser(userRequest), HttpStatus.OK);
    }
    @GetMapping("/find/{email}")
    public ResponseEntity<UserEntity> getUserByEmail(@PathVariable String email) {
        UserEntity user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Long id) {
        UserEntity user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<UserEntity>> getAllUsuarios() {
        List<UserEntity> usuarios = userService.getAllUsuarios();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<AuthResponse> updateUser(@PathVariable Long id, @RequestBody @Valid AuthCreateUserRequest authCreateUserRequest) {
        AuthResponse authResponse = userService.updateUser(id, authCreateUserRequest);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PutMapping("/deactivate/{id}")
    public ResponseEntity<Void> deactivateUser(@PathVariable Long id) {
        userService.deactivateUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Método para obtener usuarios paginados
    @GetMapping("/userAllPaginado")
    public ResponseEntity<Map<String, Object>> getAllUsersPaginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<UserEntity> userPage = userService.getAllUsersPaginados(page, size);

        Map<String, Object> response = new HashMap<>();
        response.put("usuarios", userPage.getContent());  // Lista de usuarios
        response.put("currentPage", userPage.getNumber());
        response.put("totalItems", userPage.getTotalElements());
        response.put("totalPages", userPage.getTotalPages());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }




}
