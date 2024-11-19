package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.controller.dto.CategoriaResponse;
import com.snzDigital.SNZDigital.persistence.entity.CategoriaEntity;
import com.snzDigital.SNZDigital.persistence.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository; // Asegúrate de tener este repositorio inyectado

    public CategoriaResponse createCategoria(String catName, String catDetalle, MultipartFile imagen) {
        CategoriaEntity categoriaEntity = new CategoriaEntity();

        // Asignar valores a la entidad
        categoriaEntity.setCatName(catName);
        categoriaEntity.setCatDetalle(catDetalle);

        // Manejo de la imagen
        if (imagen != null && !imagen.isEmpty()) {
            try {
                // Convertir la imagen a bytes
                categoriaEntity.setImagen(imagen.getBytes()); // Ahora se almacena como byte[]
            } catch (IOException e) {
                e.printStackTrace(); // Manejo de excepciones
                return new CategoriaResponse(null, "Error al procesar la imagen: " + e.getMessage(), false);
            }
        }

        // Guardar la entidad en la base de datos
        CategoriaEntity savedCategoria = categoriaRepository.save(categoriaEntity);

        // Retornar la respuesta
        return new CategoriaResponse(savedCategoria.getCatId(), "Categoría creada exitosamente", true);
    }

    public List<CategoriaEntity> findAll() {
        return categoriaRepository.findAll();
    }

    public Optional<CategoriaEntity> findById(Integer id) {
        return categoriaRepository.findById(id);
    }

    public CategoriaEntity save(CategoriaEntity categoria) {
        return categoriaRepository.save(categoria);
    }

    public CategoriaEntity update(Integer id, CategoriaEntity categoria) {
        return categoriaRepository.save(categoria);
    }

    public void deleteById(Integer id) {
        categoriaRepository.deleteById(id);
    }

    public List<CategoriaEntity> getActiveCategories() {
        return categoriaRepository.findActiveCategories();
    }

}
