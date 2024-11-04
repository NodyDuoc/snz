package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.controller.dto.AuthCreateUserRequest;
import com.snzDigital.SNZDigital.controller.dto.AuthResponse;
import com.snzDigital.SNZDigital.persistence.entity.UserEntity;
import com.snzDigital.SNZDigital.persistence.entity.RoleEnum;
import com.snzDigital.SNZDigital.persistence.entity.RoleEntity;
import com.snzDigital.SNZDigital.persistence.repositories.RoleRepository;
import com.snzDigital.SNZDigital.persistence.repositories.UserRepositories;
import com.snzDigital.SNZDigital.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserDetailServiceImp implements UserDetailsService {

    @Autowired
    private UserRepositories userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtils;

    @Override
    public UserDetails loadUserByUsername(String email) {

        // Buscar el usuario por email
        UserEntity userEntity = userRepository.findUserEntityByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("El usuario con email " + email + " no existe."));

        // Crear la autoridad basada en el rol único del usuario
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_".concat(userEntity.getRole().getRoleEnum().name()));

        // Crear la lista de autoridades (solo una en este caso)
        List<SimpleGrantedAuthority> authorityList = Collections.singletonList(authority);

        // Retornar el objeto User de Spring Security con los detalles del usuario
        return new User(userEntity.getEmail(),
                userEntity.getPassword(),
                userEntity.isActivated(),
                true,  // isAccountNonExpired
                true,  // isCredentialsNonExpired
                true,  // isAccountNonLocked
                authorityList);
    }


    // Método para crear un usuario
    public AuthResponse createUser(AuthCreateUserRequest authCreateUserRequest) {
        String email = authCreateUserRequest.email();
        String password = authCreateUserRequest.password();
        String roleName = authCreateUserRequest.authCreateRoleRequest().roleListName().get(0);

        // Verificar si el correo ya existe
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Este correo ya está registrado. Intenta con otro.");
        }

        // Convertir el nombre del rol a RoleEnum
        RoleEnum roleEnum;
        try {
            roleEnum = RoleEnum.valueOf(roleName);  // Convertir String a RoleEnum
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("El rol especificado no existe.");
        }

        // Buscar el rol en la base de datos usando el método actualizado
        Optional<RoleEntity> roleEntityOptional = roleRepository.findByRoleEnum(roleEnum);

        if (roleEntityOptional.isEmpty()) {
            throw new IllegalArgumentException("El rol especificado no existe.");
        }

        RoleEntity roleEntity = roleEntityOptional.get();

        // Crear y guardar el usuario
        UserEntity userEntity = UserEntity.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .firstName(authCreateUserRequest.firstName())
                .secondName(authCreateUserRequest.secondName())
                .firstLastName(authCreateUserRequest.firstLastName())
                .secondLastName(authCreateUserRequest.secondLastName())
                .isActivated(true)  // Aquí el valor de 'isActivated' no proviene de la solicitud
                .phone(authCreateUserRequest.phone())
                .role(roleEntity)  // Asignar el rol al usuario
                .build();

        // Guardar el usuario en la base de datos
        UserEntity userSaved = userRepository.save(userEntity);

        // Devolver una respuesta simple sin token
        return new AuthResponse(email, "Usuario creado exitosamente", null, true);
    }


    // Método para actualizar un usuario
    public AuthResponse updateUser(Long userId, AuthCreateUserRequest authCreateUserRequest) {
        Optional<UserEntity> userEntityOptional = userRepository.findById(userId);

        if (userEntityOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        UserEntity userEntity = userEntityOptional.get();

        if (authCreateUserRequest.password() != null &&
                !authCreateUserRequest.password().isEmpty() &&
                !passwordEncoder.matches(authCreateUserRequest.password(), userEntity.getPassword())) {

            userEntity.setPassword(passwordEncoder.encode(authCreateUserRequest.password()));
        }


        System.out.println("Activo:"+authCreateUserRequest.isActivated());
        // Actualizar los campos del usuario
        userEntity.setEmail(authCreateUserRequest.email());
        userEntity.setFirstName(authCreateUserRequest.firstName());
        userEntity.setSecondName(authCreateUserRequest.secondName());
        userEntity.setFirstLastName(authCreateUserRequest.firstLastName());
        userEntity.setSecondLastName(authCreateUserRequest.secondLastName());
        userEntity.setPhone(authCreateUserRequest.phone());
        userEntity.setActivated(authCreateUserRequest.isActivated());

        String roleName = authCreateUserRequest.authCreateRoleRequest().roleListName().get(0);
        RoleEnum roleEnum;
        try {
            roleEnum = RoleEnum.valueOf(roleName);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("The specified role does not exist.");
        }

        Optional<RoleEntity> roleEntityOptional = roleRepository.findByRoleEnum(roleEnum);

        if (roleEntityOptional.isEmpty()) {
            throw new IllegalArgumentException("The specified role does not exist.");
        }

        userEntity.setRole(roleEntityOptional.get());

        // Guardar los cambios en el usuario
        userRepository.save(userEntity);

        return new AuthResponse(userEntity.getEmail(), "User updated successfully", null, true);
    }

    public void deactivateUser(Long userId) {
        Optional<UserEntity> userEntityOptional = userRepository.findById(userId);

        if (userEntityOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        UserEntity userEntity = userEntityOptional.get();
        userEntity.setActivated(false);  // Marcar el usuario como no activado

        userRepository.save(userEntity);  // Guardar los cambios
    }

    public UserEntity getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("El usuario con email " + email + " no existe."));
    }

    public List<UserEntity> getAllUsuarios() {
        // Convertir el Iterable que devuelve CrudRepository a una lista
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public Page<UserEntity> getAllUsersPaginados(int page, int size) {
        // Definir la paginación y ordenación por el primer nombre en orden descendente
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "firstName"));

        // Llamar al método del repositorio que implementa la paginación
        return userRepository.findAllUserPaginado(pageable);
    }

    public UserEntity getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("El usuario con ID " + id + " no existe."));
    }

}
