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
                    // Imagenes de productos
                    http.requestMatchers(HttpMethod.GET, "/api/imagenes-productos/getall").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/api/imagenes-productos/get/{id}").hasAnyRole("ADMINISTRADOR", "EJECUTIVO");
                    http.requestMatchers(HttpMethod.POST, "/api/imagenes-productos/create").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.PUT, "/api/imagenes-productos/update/{id}").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.DELETE, "/api/imagenes-productos/delete/{id}").hasAnyRole("ADMINISTRADOR");

                    // Endpoints de usuarios
                    http.requestMatchers(HttpMethod.PUT, "/api/users/update/{id}").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.PUT, "/api/users/deactivate/{id}").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.GET, "/api/users/find/{id}").hasAnyRole("ADMINISTRADOR", "EJECUTIVO");
                    http.requestMatchers(HttpMethod.GET, "/api/users/findById/{id}").hasAnyRole("ADMINISTRADOR", "EJECUTIVO");
                    http.requestMatchers(HttpMethod.GET, "/api/users/getAll").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.GET, "/api/users/userAllPaginado").hasAnyRole("ADMINISTRADOR");

                    // Endpoints de detalle de pedidos
                    http.requestMatchers(HttpMethod.GET, "/api/detalle-pedidos/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/detalle-pedidos/get/{id}").hasAnyRole("ADMINISTRADOR", "EJECUTIVO");
                    http.requestMatchers(HttpMethod.POST, "/api/detalle-pedidos/create").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.PUT, "/api/detalle-pedidos/update/{id}").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.DELETE, "/api/detalle-pedidos/delete/{id}").hasAnyRole("ADMINISTRADOR");

                    // Endpoints de direcciones
                    http.requestMatchers(HttpMethod.GET, "/api/direcciones/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/direcciones/get/{id}").hasAnyRole("ADMINISTRADOR", "EJECUTIVO");
                    http.requestMatchers(HttpMethod.POST, "/api/direcciones/create").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.PUT, "/api/direcciones/update/{id}").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.DELETE, "/api/direcciones/delete/{id}").hasAnyRole("ADMINISTRADOR");

                    // Endpoints de categorías
                    http.requestMatchers(HttpMethod.GET, "/api/categorias/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/categorias/get/{id}").hasAnyRole("ADMINISTRADOR", "EJECUTIVO");
                    http.requestMatchers(HttpMethod.POST, "/api/categorias/create").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.PUT, "/api/categorias/update/{id}").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.DELETE, "/api/categorias/delete/{id}").hasAnyRole("ADMINISTRADOR");

                    // Endpoints de productos
                    http.requestMatchers(HttpMethod.GET, "/api/productos/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/productos/get/{id}").hasAnyRole("ADMINISTRADOR", "EJECUTIVO");
                    http.requestMatchers(HttpMethod.POST, "/api/productos/create").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.PUT, "/api/productos/update/{id}").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.DELETE, "/api/productos/delete/{id}").hasAnyRole("ADMINISTRADOR");

                    // Endpoints de valoraciones
                    http.requestMatchers(HttpMethod.GET, "/api/valoraciones/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/valoraciones/get/{id}").hasAnyRole("ADMINISTRADOR", "EJECUTIVO");
                    http.requestMatchers(HttpMethod.POST, "/api/valoraciones/create").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.PUT, "/api/valoraciones/update/{id}").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.DELETE, "/api/valoraciones/delete/{id}").hasAnyRole("ADMINISTRADOR");


                    // Endpoints de pedidos
                    http.requestMatchers(HttpMethod.GET, "/api/pedidos/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/pedidos/get/{id}").hasAnyRole("ADMINISTRADOR", "EJECUTIVO");
                    http.requestMatchers(HttpMethod.POST, "/api/pedidos/create").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.PUT, "/api/pedidos/update/{id}").hasAnyRole("ADMINISTRADOR");
                    http.requestMatchers(HttpMethod.DELETE, "/api/pedidos/delete/{id}").hasAnyRole("ADMINISTRADOR");

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
