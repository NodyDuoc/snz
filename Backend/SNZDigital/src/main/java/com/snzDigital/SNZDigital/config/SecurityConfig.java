package com.snzDigital.SNZDigital.config;

import com.snzDigital.SNZDigital.config.filter.JwtValidation;
import com.snzDigital.SNZDigital.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    private JwtUtil jwtUtils;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(Customizer.withDefaults()) // Activar CORS en Spring Security
                .csrf(AbstractHttpConfigurer::disable) // Desactivar CSRF si es necesario
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(http -> {
                    // Permitir acceso público al endpoint de inicio de sesión
                    http.requestMatchers(HttpMethod.POST, "/api/users/log-in").permitAll();
                    // Permitir acceso público al endpoint de registro de usuarios
                    http.requestMatchers(HttpMethod.POST, "/api/users/create").permitAll();

                    // Endpoints de usuarios
                    http.requestMatchers(HttpMethod.PUT, "/api/users/update/**").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.PUT, "/api/users/deactivate/**").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.GET, "/api/users/find/**").hasAnyRole("ADMINISTRADOR", "EJECUTIVO");
                    http.requestMatchers(HttpMethod.GET, "/api/users/findById/{id}").hasAnyRole("ADMINISTRADOR", "EJECUTIVO");
                    http.requestMatchers(HttpMethod.GET, "/api/users/getAll").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.GET, "/api/users/userAllPaginado").hasAnyRole("ADMINISTRADOR");

                    // Endpoints de categorías
                    http.requestMatchers(HttpMethod.GET, "/api/categorias/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/categorias/get/{id}").hasAnyRole("ADMINISTRADOR", "EJECUTIVO");
                    http.requestMatchers(HttpMethod.POST, "/api/categorias/create").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.PUT, "/api/categorias/update/**").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.DELETE, "/api/categorias/delete/**").hasAnyRole("ADMINISTRADOR");

                    // Endpoints de productos
                    http.requestMatchers(HttpMethod.GET, "/api/productos/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/productos/get/{id}").hasAnyRole("ADMINISTRADOR", "EJECUTIVO");
                    http.requestMatchers(HttpMethod.POST, "/api/productos/create").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.PUT, "/api/productos/update/**").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.DELETE, "/api/productos/delete/**").hasAnyRole("ADMINISTRADOR");

                    // Endpoints de direcciones
                    http.requestMatchers(HttpMethod.GET, "/api/direcciones/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/direcciones/get/{id}").hasAnyRole("ADMINISTRADOR", "EJECUTIVO");
                    http.requestMatchers(HttpMethod.POST, "/api/direcciones/create").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.PUT, "/api/direcciones/update/**").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.DELETE, "/api/direcciones/delete/**").hasAnyRole("ADMINISTRADOR");

                    http.anyRequest().authenticated(); // Requiere autenticación para cualquier otra solicitud
                })
                .addFilterBefore(new JwtValidation(jwtUtils), BasicAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults())
                .build();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:8100")); // Permitir solicitudes desde Ionic
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Métodos permitidos
        configuration.setAllowedHeaders(Arrays.asList("*")); // Permitir cualquier encabezado
        configuration.setAllowCredentials(true); // Permitir cookies o autenticación basada en tokens

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Aplicar a todas las rutas
        return new CorsFilter(source);
    }

}
