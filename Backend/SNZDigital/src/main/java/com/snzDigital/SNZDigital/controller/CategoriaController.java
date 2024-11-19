package com.snzDigital.SNZDigital.controller;


import com.snzDigital.SNZDigital.controller.dto.CategoriaResponse;
import com.snzDigital.SNZDigital.persistence.entity.CategoriaEntity;
import com.snzDigital.SNZDigital.persistence.repositories.CategoriaRepository;
import com.snzDigital.SNZDigital.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;
    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping("/getall")
    public List<CategoriaEntity> getAllCategorias() {
        return categoriaService.findAll();
    }

    @GetMapping("/getall/activos")
    public ResponseEntity<List<CategoriaEntity>> getActiveCategories() {
        List<CategoriaEntity> activeCategories = categoriaService.getActiveCategories();
        return ResponseEntity.ok(activeCategories);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<CategoriaEntity> getCategoriaById(@PathVariable Integer id) {
        Optional<CategoriaEntity> categoria = categoriaService.findById(id);
        return categoria.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<CategoriaResponse> createCategoria(
            @RequestParam("catName") String catName,
            @RequestParam("catDetalle") String catDetalle,
            @RequestParam(value = "imagen", required = false) MultipartFile imagen) { // La imagen es opcional

        // Llamar al servicio para crear la categoría
        CategoriaResponse categoriaResponse = categoriaService.createCategoria(catName, catDetalle, imagen);

        // Retornar la respuesta
        return new ResponseEntity<>(categoriaResponse, HttpStatus.CREATED);
    }



    @PutMapping("/update/{id}")
    public ResponseEntity<CategoriaEntity> updateCategoria(@PathVariable Integer id, @RequestBody CategoriaEntity categoria) {
        return ResponseEntity.ok(categoriaService.update(id, categoria));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteCategoria(@PathVariable Integer id) {
        Optional<CategoriaEntity> categoria = categoriaService.findById(id);
        if (categoria.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Categoría no encontrada con ID: " + id));
        }

        categoriaService.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Categoría eliminada con éxito"));
    }


    @PatchMapping("/updateStatus/{id}")
    public ResponseEntity<String> updateCategoriaStatus(@PathVariable Integer id, @RequestParam("status") int status) {
        Optional<CategoriaEntity> categoriaOptional = categoriaService.findById(id);

        if (categoriaOptional.isPresent()) {
            CategoriaEntity categoria = categoriaOptional.get();
            categoria.setStatus(status); // Cambia el estado
            categoriaService.update(id, categoria); // Actualiza en la base de datos
            String statusMessage = status == 1 ? "activada" : "desactivada";
            return ResponseEntity.ok("Categoría " + statusMessage + " con éxito: " + categoria.getCatName());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoría no encontrada con ID: " + id);
        }
    }

}