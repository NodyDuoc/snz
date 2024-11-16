package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedido")
public class PedidoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ped_seq")
    @SequenceGenerator(name = "ped_seq", sequenceName = "PED_SEQ", allocationSize = 1)
    @Column(name = "PEDIDOID")
    private Long pedidoId;

    @Column(name = "USUARIOS_USERID", nullable = false)
    private Long usuariosUserId;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PedidoProducto> productos = new ArrayList<>();

    @Column(name = "COMUNA", length = 100)
    private String comuna;

    @Column(name = "DIRECCION", length = 100)
    private String direccion;

    @Column(name = "DETALLE", length = 100)
    private String detalle;

    @Column(name = "PRECIO")
    private Double precio;

    @Column(name = "CANTIDAD", nullable = false)
    private Integer cantidad;

    @Column(name = "ESTADO", length = 100)
    private String estado;

    @Column(name = "ORDERID", length = 40)
    private String orderId;

    @Column(name = "CURRENCY", length = 10, columnDefinition = "VARCHAR2(10) DEFAULT 'CLP'")
    private String currency;

    @Column(name = "URLRETURN", length = 200)
    private String urlReturn;

    @Column(name = "URLNOTIFY", length = 200)
    private String urlNotify;

    // Getters y Setters para todos los campos

    public List<PedidoProducto> getProductos() {
        return productos;
    }

    public void setProductos(List<PedidoProducto> productos) {
        this.productos = productos;
    }

    public Long getPedidoId() {
        return pedidoId;
    }

    public void setPedidoId(Long pedidoId) {
        this.pedidoId = pedidoId;
    }

    public Long getUsuariosUserId() {
        return usuariosUserId;
    }

    public void setUsuariosUserId(Long usuariosUserId) {
        this.usuariosUserId = usuariosUserId;
    }

    public String getComuna() {
        return comuna;
    }

    public void setComuna(String comuna) {
        this.comuna = comuna;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getUrlReturn() {
        return urlReturn;
    }

    public void setUrlReturn(String urlReturn) {
        this.urlReturn = urlReturn;
    }

    public String getUrlNotify() {
        return urlNotify;
    }

    public void setUrlNotify(String urlNotify) {
        this.urlNotify = urlNotify;
    }

    // Getters y Setters
    // Puedes eliminar los métodos getter y setter si estás utilizando Lombok
}
