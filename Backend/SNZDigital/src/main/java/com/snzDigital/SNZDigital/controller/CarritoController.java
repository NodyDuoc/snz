package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.CarritoResponse;
import com.snzDigital.SNZDigital.persistence.entity.CarritoEntity;
import com.snzDigital.SNZDigital.service.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/carritos")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    // Obtener todos los carritos
    @GetMapping("/getall")
    public ResponseEntity<List<CarritoEntity>> getAllCarritos() {
        List<CarritoEntity> carritos = carritoService.getAll();
        return ResponseEntity.ok(carritos);
    }

    // Obtener un carrito por ID
    @GetMapping("/get/{id}")
    public ResponseEntity<CarritoResponse> getCarritoById(@PathVariable Integer id) {
        Optional<CarritoEntity> carrito = carritoService.getById(id);
        return carrito.map(c -> ResponseEntity.ok(new CarritoResponse(c.getIdCarrito(), c.getUsuarioIdUser(), "Carrito encontrado", true)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new CarritoResponse(null, null, "Carrito no encontrado", false)));
    }

    // Crear un nuevo carrito
    @PostMapping("/create")
    public ResponseEntity<CarritoResponse> createCarrito(@RequestBody CarritoEntity carrito) {
        CarritoEntity createdCarrito = carritoService.create(carrito);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CarritoResponse(createdCarrito.getIdCarrito(), createdCarrito.getUsuarioIdUser(), "Carrito creado con éxito", true));
    }

    // Actualizar un carrito existente
    @PutMapping("/update/{id}")
    public ResponseEntity<CarritoResponse> updateCarrito(@PathVariable Integer id, @RequestBody CarritoEntity carrito) {
        CarritoEntity updatedCarrito = carritoService.update(id, carrito);
        return ResponseEntity.ok(new CarritoResponse(updatedCarrito.getIdCarrito(), updatedCarrito.getUsuarioIdUser(), "Carrito actualizado con éxito", true));
    }

    // Eliminar un carrito por ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CarritoResponse> deleteCarrito(@PathVariable Integer id) {
        carritoService.delete(id);
        return ResponseEntity.ok(new CarritoResponse(id, null, "Carrito eliminado con éxito", true));
    }
}
