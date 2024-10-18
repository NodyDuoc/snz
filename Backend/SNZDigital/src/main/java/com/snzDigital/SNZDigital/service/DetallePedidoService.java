package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.controller.dto.DetallePedidoResponse;
import com.snzDigital.SNZDigital.persistence.entity.DetallePedidoEntity;
import com.snzDigital.SNZDigital.persistence.repositories.DetallePedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DetallePedidoService {

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    public List<DetallePedidoResponse> getAll() {
        return detallePedidoRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public DetallePedidoResponse getById(Integer id) {
        DetallePedidoEntity entity = detallePedidoRepository.findById(id).orElse(null);
        return entity != null ? convertToResponse(entity) : null;
    }

    public DetallePedidoResponse create(DetallePedidoEntity detallePedido) {
        DetallePedidoEntity savedEntity = detallePedidoRepository.save(detallePedido);
        return convertToResponse(savedEntity);
    }

    public DetallePedidoResponse update(Integer id, DetallePedidoEntity detallePedido) {
        detallePedido.setDetPedId(id);
        DetallePedidoEntity updatedEntity = detallePedidoRepository.save(detallePedido);
        return convertToResponse(updatedEntity);
    }

    public void delete(Integer id) {
        detallePedidoRepository.deleteById(id);
    }

    private DetallePedidoResponse convertToResponse(DetallePedidoEntity entity) {
        return new DetallePedidoResponse(
                entity.getDetPedId(),
                entity.getPrecioUnitario(),
                entity.getCantidad(),
                entity.getPedidoId()
        );
    }
}
