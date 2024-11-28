package com.snzDigital.SNZDigital.config;

import com.snzDigital.SNZDigital.config.filter.JwtValidation;
import com.snzDigital.SNZDigital.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
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
import org.springframework.web.client.RestTemplate;
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
                    // Para bloquear el acceso .hasAnyRole("ADMINISTRADOR", "EJECUTIVO");
                    // Permitir acceso público al endpoint de inicio de sesión
                    http.requestMatchers(HttpMethod.POST, "/api/users/log-in").permitAll();
                    // Permitir acceso público al endpoint de registro de usuarios
                    http.requestMatchers(HttpMethod.POST, "/api/users/create").permitAll();
                    // Imagenes de productos
                    http.requestMatchers(HttpMethod.GET, "/api/imagenes-productos/getall").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/api/imagenes-productos/get/{id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/imagenes-productos/create").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/api/imagenes-productos/update/{id}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/imagenes-productos/delete/{id}").permitAll();

                    // Endpoints de usuarios
                    http.requestMatchers(HttpMethod.PUT, "/api/users/update/{id}").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/api/users/deactivate/{id}").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/api/users/find/{id}").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/api/users/findById/{id}").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/api/users/getAll").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/api/users/userAllPaginado").permitAll();

                    // Endpoints de detalle de pedidos
                    http.requestMatchers(HttpMethod.GET, "/api/detalle-pedidos/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/detalle-pedidos/get/{id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/detalle-pedidos/create").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/api/detalle-pedidos/update/{id}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/detalle-pedidos/delete/{id}").permitAll();

                    // Endpoints de direcciones
                    http.requestMatchers(HttpMethod.GET, "/api/direcciones/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/direcciones/get/{id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/direcciones/create").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/api/direcciones/update/{id}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/direcciones/delete/{id}").permitAll();

                    // Endpoints de categorías
                    http.requestMatchers(HttpMethod.GET, "/api/categorias/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/categorias/get/{id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/categorias/create").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/api/categorias/update/{id}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/categorias/delete/{id}").permitAll();

                    // Endpoints de productos
                    http.requestMatchers(HttpMethod.GET, "/api/productos/getall/activos").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/productos/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/productos/get/{id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/productos/create").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/api/productos/update/{id}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/productos/delete/{id}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/categoria/{categoriaId}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/categoria/paginado/{categoriaId}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/categoria/paginado").permitAll();


                    // Endpoints de valoraciones
                    http.requestMatchers(HttpMethod.GET, "/api/valoraciones/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/valoraciones/get/{id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/valoraciones/create").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/api/valoraciones/update/{id}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/valoraciones/delete/{id}").permitAll();

                    // Endpoints de carritos
                    http.requestMatchers(HttpMethod.GET, "/api/carritos/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/carritos/get/{id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/carritos/create").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/api/carritos/update/{id}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/carritos/delete/{id}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/carritos/updateStatus/{id}").permitAll();

                    // Endpoints de detalle de carritos
                    http.requestMatchers(HttpMethod.GET, "/api/detallecarritos/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/detallecarritos/get/{id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/detallecarritos/create").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/api/detallecarritos/update/{id}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/detallecarritos/delete/{id}").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/api/detallecarritos/getbyuser/{id}").permitAll();


                    // Endpoints de movimientos de kardex
                    http.requestMatchers(HttpMethod.GET, "/api/movimientos/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/movimientos/get/{id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/movimientos/create").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/api/movimientos/update/{id}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/movimientos/delete/{id}").permitAll();

                    // Endpoints de kardex
                    http.requestMatchers(HttpMethod.GET, "/api/kardex/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/kardex/get/{id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/kardex/create").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/api/kardex/update/{id}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/kardex/delete/{id}").permitAll();


                    // Endpoints de pedidos
                    http.requestMatchers(HttpMethod.POST, "/api/pedidos/crear").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/pedidos/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/pedidos/usuario/{usuarioId}").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/pedidos/{pedidoId}/detalles").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/pedidos/get/{id}").permitAll(); // Permitir acceso público



                    http.requestMatchers(HttpMethod.POST, "/api/pedidos/crear-pedido-con-pago").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/api/pedidos/{pedidoId}/actualizar-estado").permitAll();
                    // Endpoints de Pago
                    http.requestMatchers(HttpMethod.POST, "/api/payku/create-transaction").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.POST, "/api/payku/response").permitAll(); // Permitir acceso público

                    // Endpoints de etiquetas
                    http.requestMatchers(HttpMethod.GET, "/api/etiquetas/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/etiquetas/get/{id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/etiquetas/create").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/api/etiquetas/update/{id}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/etiquetas/delete/{id}").permitAll();

                    // Endpoints de etiqueta_producto
                    http.requestMatchers(HttpMethod.GET, "/api/etiqueta_producto/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/etiqueta_producto/get/{id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/etiqueta_producto/create").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/api/etiqueta_producto/update/{id}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/etiqueta_producto/delete/{id}").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/api/etiqueta_producto/verificar/{productId}/{etiquetaId}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/etiqueta_producto/eliminar/{productId}/{etiquetaId}").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/api/etiqueta_producto/producto/{productId}").permitAll(); // Nuevo endpoint
                    http.requestMatchers(HttpMethod.GET, "/api/etiqueta_producto/producto/{productId}/detalles").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/api/etiqueta_producto/etiqueta/{etiquetaId}").permitAll(); // Nuevo endpoint
                    http.requestMatchers(HttpMethod.GET, "/api/etiqueta_producto/etiqueta/{etiquetaId}/detalles").permitAll(); // Nuevo endpoint


                    // Endpoints de guias
                    http.requestMatchers(HttpMethod.GET, "/api/guias/getall").permitAll(); // Permitir acceso público
                    http.requestMatchers(HttpMethod.GET, "/api/guias/get/{id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/guias/create").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/api/guias/update/{id}").permitAll();
                    http.requestMatchers(HttpMethod.DELETE, "/api/guias/delete/{id}").permitAll();



                    http.anyRequest().permitAll(); // Requiere autenticación para cualquier otra solicitud




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

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
        return restTemplate;
    }


    @Bean
    public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter() {
        return new MappingJackson2HttpMessageConverter();
    }

}
