package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.persistence.entity.PedidoEntity;
import com.snzDigital.SNZDigital.persistence.entity.ProductoEntity;
import com.snzDigital.SNZDigital.persistence.repositories.PedidoRepository;
import com.snzDigital.SNZDigital.persistence.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public List<PedidoEntity> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    public Optional<PedidoEntity> getPedidoById(Long id) {
        return pedidoRepository.findById(id);
    }

    // Método actualizado para crear un pedido con productos asociados
    public PedidoEntity createPedido(PedidoEntity pedido, List<Long> productoIds) {
        // Busca productos por sus IDs y añade la lista de productos al pedido
        List<ProductoEntity> productos = productoIds.stream()
                .map(id -> productoRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id)))
                .collect(Collectors.toList());

        // Asigna la lista de productos al pedido
        pedido.setProductos(productos);

        // Guarda el pedido con sus productos asociados
        return pedidoRepository.save(pedido);
    }

    public PedidoEntity updatePedido(Long id, PedidoEntity pedido) {
        pedido.setPedidoId(id);
        return pedidoRepository.save(pedido);
    }

    public void deletePedido(Long id) {
        pedidoRepository.deleteById(id);
    }

    public PedidoEntity crearPedidoConPago(PedidoEntity pedido) {
        pedido.setEstado("Pendiente"); // Estado inicial del pedido
        return pedidoRepository.save(pedido);
    }

    public PedidoEntity actualizarEstadoPedido(Long pedidoId, String nuevoEstado) {
        PedidoEntity pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        pedido.setEstado(nuevoEstado);
        return pedidoRepository.save(pedido);
    }

}
