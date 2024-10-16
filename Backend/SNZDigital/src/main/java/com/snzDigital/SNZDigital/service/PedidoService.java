package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.persistence.entity.PedidoEntity;
import com.snzDigital.SNZDigital.persistence.repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public List<PedidoEntity> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    public Optional<PedidoEntity> getPedidoById(Long id) {
        return pedidoRepository.findById(id);
    }

    public PedidoEntity createPedido(PedidoEntity pedido) {
        return pedidoRepository.save(pedido);
    }

    public PedidoEntity updatePedido(Long id, PedidoEntity pedido) {
        pedido.setPedidoId(id);
        return pedidoRepository.save(pedido);
    }

    public void deletePedido(Long id) {
        pedidoRepository.deleteById(id);
    }
}
