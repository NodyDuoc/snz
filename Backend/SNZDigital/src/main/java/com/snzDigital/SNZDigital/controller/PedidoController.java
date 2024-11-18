package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.PedidoRequest;
import com.snzDigital.SNZDigital.controller.dto.PedidoResponse;
import com.snzDigital.SNZDigital.persistence.entity.PedidoEntity;
import com.snzDigital.SNZDigital.persistence.entity.PedidoProductoEntity;
import com.snzDigital.SNZDigital.service.PedidoService;
import com.snzDigital.SNZDigital.util.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crearPedido(@RequestBody PedidoRequest pedidoRequest) {
        try {
            PedidoEntity nuevoPedido = pedidoService.crearPedido(pedidoRequest);
            return new ResponseEntity<>(nuevoPedido, HttpStatus.CREATED);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al crear el pedido", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/getall")
    public ResponseEntity<List<PedidoEntity>> getAllPedidos() {
        List<PedidoEntity> pedidos = pedidoService.obtenerTodosLosPedidos();
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<PedidoEntity>> obtenerPedidosPorUsuario(@PathVariable Long usuarioId) {
        List<PedidoEntity> pedidos = pedidoService.obtenerPedidosPorUsuario(usuarioId);
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/{pedidoId}/detalles")
    public ResponseEntity<List<PedidoProductoEntity>> obtenerDetallesPorPedido(@PathVariable Long pedidoId) {
        List<PedidoProductoEntity> detalles = pedidoService.obtenerDetallesPorPedidoId(pedidoId);
        return ResponseEntity.ok(detalles);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<PedidoEntity> obtenerPedidoPorId(@PathVariable Long id) {
        PedidoEntity pedido = pedidoService.obtenerPedidoPorId(id);
        return ResponseEntity.ok(pedido);
    }

}
