package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "pedido_producto")
public class PedidoProducto {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ped_prod_seq")
    @SequenceGenerator(name = "ped_prod_seq", sequenceName = "PED_PROD_SEQ", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = false)
    private PedidoEntity pedido;

    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private ProductoEntity producto;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public PedidoEntity getPedido() { return pedido; }
    public void setPedido(PedidoEntity pedido) { this.pedido = pedido; }

    public ProductoEntity getProducto() { return producto; }
    public void setProducto(ProductoEntity producto) { this.producto = producto; }
}
