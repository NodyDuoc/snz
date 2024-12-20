package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.controller.dto.PedidoRequest;
import com.snzDigital.SNZDigital.controller.dto.ProductoDetalleRequest;
import com.snzDigital.SNZDigital.persistence.entity.PedidoEntity;
import com.snzDigital.SNZDigital.persistence.entity.PedidoProductoEntity;
import com.snzDigital.SNZDigital.persistence.entity.KardexEntity;
import com.snzDigital.SNZDigital.persistence.entity.ProductoEntity;
import com.snzDigital.SNZDigital.persistence.repositories.KardexRepository;
import com.snzDigital.SNZDigital.persistence.repositories.PedidoProductoRepository;
import com.snzDigital.SNZDigital.persistence.repositories.PedidoRepository;
import com.snzDigital.SNZDigital.persistence.repositories.ProductoRepository;
import com.snzDigital.SNZDigital.util.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class PedidoService {

    private static final Logger logger = LoggerFactory.getLogger(PedidoService.class);

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoProductoRepository pedidoProductoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private KardexService kardexService;

    @Transactional
    public PedidoEntity crearPedido(PedidoRequest pedidoRequest) {
        logger.info("Iniciando creación del pedido para usuario ID: {}", pedidoRequest.getUsuarioId());

        // Validar que el pedidoRequest no sea nulo y que contenga productos
        if (pedidoRequest == null || pedidoRequest.getProductos() == null || pedidoRequest.getProductos().isEmpty()) {
            logger.error("El pedido no contiene productos o el request es inválido.");
            throw new IllegalArgumentException("El pedido debe contener al menos un producto.");
        }

        // Crear el pedido principal
        PedidoEntity pedido = new PedidoEntity();
        pedido.setUsuarioId(pedidoRequest.getUsuarioId());
        pedido.setComuna(pedidoRequest.getComuna());
        pedido.setDireccion(pedidoRequest.getDireccion());
        pedido.setDetalle(pedidoRequest.getDetalle());
        pedido.setPrecio(pedidoRequest.getPrecio());
        pedido.setCantidad(pedidoRequest.getCantidad());
        pedido.setEstado(pedidoRequest.getEstado());
        pedido.setOrderId(pedidoRequest.getOrderId());
        pedido.setCurrency(pedidoRequest.getCurrency());
        pedido.setUrlReturn(pedidoRequest.getUrlReturn());
        pedido.setUrlNotify(pedidoRequest.getUrlNotify());

        logger.info("Guardando pedido principal...");
        PedidoEntity pedidoGuardado = pedidoRepository.save(pedido);
        logger.info("Pedido guardado con ID: {}", pedidoGuardado.getPedidoId());

        // Crear los detalles del pedido (pedido_producto)
        List<PedidoProductoEntity> detalles = new ArrayList<>();
        for (ProductoDetalleRequest detalleRequest : pedidoRequest.getProductos()) {
            logger.info("Buscando producto con ID: {}", detalleRequest.getProductoId());
            ProductoEntity producto = productoRepository.findById(detalleRequest.getProductoId())
                    .orElseThrow(() -> {
                        logger.error("Producto no encontrado con ID: {}", detalleRequest.getProductoId());
                        return new ResourceNotFoundException("Producto no encontrado con ID: " + detalleRequest.getProductoId());
                    });

            PedidoProductoEntity detalle = new PedidoProductoEntity();
            detalle.setPedido(pedidoGuardado); // Asociar el detalle con el pedido
            detalle.setProducto(producto);    // Asociar el producto al detalle
            detalle.setCantidad(detalleRequest.getCantidad());
            detalle.setPrecioUnitario(detalleRequest.getPrecioUnitario());
            detalle.setTotalPrecio(detalleRequest.getTotalPrecio());



            KardexEntity kardex = new KardexEntity();


            kardex.setEntrada(BigDecimal.valueOf(0));
            kardex.setSalida(BigDecimal.valueOf(detalleRequest.getCantidad()));
            kardex.setPrecioUnitario(BigDecimal.valueOf(0));
            kardex.setMovimientoKarMovId(1);
            kardex.setProductoProductId(producto.getProductId().intValue());
            kardex.setSaldo(BigDecimal.valueOf(0));
            kardex.setPrecioActualizado(BigDecimal.valueOf(0));
            // Establecer la fecha actual
            kardex.setFecha(new Date());
            // Establecer la hora actual
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
            String horaActual = LocalTime.now().format(timeFormatter);

            kardex.setHora(horaActual);

            kardexService.createKardex(kardex);

            logger.info("Creando detalle del pedido para producto ID: {}, cantidad: {}, precio unitario: {}, precio total: {}",
                    detalleRequest.getProductoId(), detalleRequest.getCantidad(), detalleRequest.getPrecioUnitario(), detalleRequest.getTotalPrecio());
            detalles.add(detalle);
        }

        // Guardar todos los detalles en la base de datos
        logger.info("Guardando detalles del pedido...");
        pedidoProductoRepository.saveAll(detalles);
        logger.info("Detalles del pedido guardados correctamente.");

        // Retornar el pedido guardado con detalles
        pedidoGuardado.setDetalles(detalles);
        logger.info("Pedido creado exitosamente con ID: {}", pedidoGuardado.getPedidoId());
        return pedidoGuardado;
    }

    // Método para obtener todos los pedidos
    public List<PedidoEntity> obtenerTodosLosPedidos() {
        logger.info("Obteniendo todos los pedidos...");
        List<PedidoEntity> pedidos = pedidoRepository.findAll();
        logger.info("Se encontraron {} pedidos.", pedidos.size());
        return pedidos;
    }

    public List<PedidoEntity> obtenerPedidosPorUsuario(Long usuarioId) {
        logger.info("Obteniendo pedidos para el usuario con ID: {}", usuarioId);
        List<PedidoEntity> pedidos = pedidoRepository.findByUsuarioId(usuarioId);
        if (pedidos.isEmpty()) {
            logger.warn("No se encontraron pedidos para el usuario con ID: {}", usuarioId);
        }
        return pedidos;
    }

    public List<PedidoProductoEntity> obtenerDetallesPorPedidoId(Long pedidoId) {
        logger.info("Obteniendo detalles del pedido con ID: {}", pedidoId);
        List<PedidoProductoEntity> detalles = pedidoProductoRepository.findByPedido_PedidoId(pedidoId);
        if (detalles.isEmpty()) {
            logger.warn("No se encontraron detalles para el pedido con ID: {}", pedidoId);
        }
        return detalles;
    }

    public PedidoEntity obtenerPedidoPorId(Long pedidoId) {
        logger.info("Buscando el pedido con ID: {}", pedidoId);

        // Buscar el pedido principal
        PedidoEntity pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> {
                    logger.error("Pedido no encontrado con ID: {}", pedidoId);
                    return new ResourceNotFoundException("Pedido no encontrado con ID: " + pedidoId);
                });

        // Cargar los detalles asociados al pedido
        List<PedidoProductoEntity> detalles = pedidoProductoRepository.findByPedido_PedidoId(pedidoId);
        if (detalles.isEmpty()) {
            logger.warn("El pedido con ID {} no tiene detalles asociados.", pedidoId);
        }
        pedido.setDetalles(detalles); // Asignar los detalles al pedido

        logger.info("Pedido con ID {} cargado correctamente.", pedidoId);
        return pedido;
    }


}
