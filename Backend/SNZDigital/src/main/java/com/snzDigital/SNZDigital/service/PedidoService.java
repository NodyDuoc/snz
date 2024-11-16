package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.persistence.entity.PedidoEntity;
import com.snzDigital.SNZDigital.persistence.entity.PedidoProducto;
import com.snzDigital.SNZDigital.persistence.entity.ProductoEntity;
import com.snzDigital.SNZDigital.persistence.repositories.PedidoRepository;
import com.snzDigital.SNZDigital.persistence.repositories.ProductoRepository;
import com.snzDigital.SNZDigital.util.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Transactional
    public PedidoEntity crearPedidoConProductos(Long usuarioId, String comuna, String direccion, String detalle,
                                                List<Long> productoIds, List<Integer> cantidades,
                                                Double precio, String currency, String estado,
                                                String urlReturn, String urlNotify) {

        // Crear la entidad Pedido
        PedidoEntity pedido = new PedidoEntity();
        pedido.setUsuariosUserId(usuarioId);
        pedido.setComuna(comuna);
        pedido.setDireccion(direccion);
        pedido.setDetalle(detalle);
        pedido.setPrecio(precio);
        pedido.setCurrency(currency);
        pedido.setEstado(estado);
        pedido.setUrlReturn(urlReturn);
        pedido.setUrlNotify(urlNotify);

        // Asignar los productos al pedido
        List<PedidoProducto> pedidoProductos = new ArrayList<>();
        for (int i = 0; i < productoIds.size(); i++) {
            Long productoId = productoIds.get(i);
            Integer cantidad = cantidades.get(i);

            ProductoEntity producto = productoRepository.findById(productoId)
                    .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + productoId));

            PedidoProducto pedidoProducto = new PedidoProducto();
            pedidoProducto.setPedido(pedido);
            pedidoProducto.setProducto(producto);
            pedidoProducto.setCantidad(cantidad);

            pedidoProductos.add(pedidoProducto);
        }

        // Asignar la lista de productos al pedido y guardar en la base de datos
        pedido.setProductos(pedidoProductos);
        PedidoEntity nuevoPedido = pedidoRepository.save(pedido);

        return nuevoPedido;
    }

    public List<PedidoEntity> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    public Optional<PedidoEntity> getPedidoById(Long id) {
        return pedidoRepository.findById(id);
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
