package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.PedidoResponse;
import com.snzDigital.SNZDigital.persistence.entity.PedidoEntity;
import com.snzDigital.SNZDigital.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/crear-pedido-con-pago")
    public ResponseEntity<PedidoEntity> crearPedidoConPago(@RequestBody PedidoEntity pedido) {
        PedidoEntity nuevoPedido = pedidoService.crearPedidoConPago(pedido);
        return ResponseEntity.ok(nuevoPedido);
    }

    @PutMapping("/{pedidoId}/actualizar-estado")
    public ResponseEntity<PedidoEntity> actualizarEstadoPedido(@PathVariable Long pedidoId, @RequestParam String nuevoEstado) {
        PedidoEntity pedidoActualizado = pedidoService.actualizarEstadoPedido(pedidoId, nuevoEstado);
        return ResponseEntity.ok(pedidoActualizado);
    }

    @PostMapping("/crear-pedido-con-productos")
    public ResponseEntity<PedidoEntity> crearPedidoConProductos(
            @RequestBody PedidoEntity pedido,
            @RequestParam List<Long> productoIds) {

        PedidoEntity nuevoPedido = pedidoService.createPedido(pedido, productoIds);
        return ResponseEntity.ok(nuevoPedido);
    }



    @GetMapping("/getall")
    public ResponseEntity<List<PedidoEntity>> getAllPedidos() {
        List<PedidoEntity> pedidos = pedidoService.getAllPedidos();
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<PedidoResponse> getPedidoById(@PathVariable Long id) {
        Optional<PedidoEntity> pedido = pedidoService.getPedidoById(id);
        if (pedido.isPresent()) {
            return ResponseEntity.ok(new PedidoResponse("Pedido encontrado", HttpStatus.OK.value(), pedido.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new PedidoResponse("Pedido no encontrado", HttpStatus.NOT_FOUND.value(), null));
        }
    }

    @PostMapping("/crear")
    public PedidoEntity crearPedido(@RequestBody PedidoEntity pedido, @RequestParam List<Long> productoIds) {
        // Llama a createPedido con ambos argumentos
        return pedidoService.createPedido(pedido, productoIds);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PedidoResponse> updatePedido(@PathVariable Long id, @RequestBody PedidoEntity pedido) {
        PedidoEntity updatedPedido = pedidoService.updatePedido(id, pedido);
        return ResponseEntity.ok(new PedidoResponse("Pedido actualizado con éxito", HttpStatus.OK.value(), updatedPedido));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<PedidoResponse> deletePedido(@PathVariable Long id) {
        pedidoService.deletePedido(id);
        return ResponseEntity.ok(new PedidoResponse("Pedido eliminado con éxito", HttpStatus.NO_CONTENT.value(), null));
    }
}
