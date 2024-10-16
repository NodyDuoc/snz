package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.persistence.entity.ImagenProductoEntity;
import com.snzDigital.SNZDigital.persistence.repositories.ImagenProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImagenProductoService {

    @Autowired
    private ImagenProductoRepository imagenProductoRepository;

    public List<ImagenProductoEntity> getAllImagenes() {
        return imagenProductoRepository.findAll();
    }

    public Optional<ImagenProductoEntity> getImagenById(Long id) {
        return imagenProductoRepository.findById(id);
    }

    public ImagenProductoEntity createImagenProducto(ImagenProductoEntity imagenProducto) {
        return imagenProductoRepository.save(imagenProducto);
    }

    public ImagenProductoEntity updateImagenProducto(Long id, ImagenProductoEntity imagenProducto) {
        imagenProducto.setImagenId(id);
        return imagenProductoRepository.save(imagenProducto);
    }

    public void deleteImagenProducto(Long id) {
        imagenProductoRepository.deleteById(id);
    }
}
