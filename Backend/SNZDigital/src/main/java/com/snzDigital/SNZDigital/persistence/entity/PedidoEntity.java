package com.snzDigital.SNZDigital.persistence.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedido")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PedidoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PED_SEQ")
    @SequenceGenerator(name = "PED_SEQ", sequenceName = "PED_SEQ", allocationSize = 1)
    @Column(name = "PEDIDOID")
    private Long pedidoId;

    @Column(name = "USUARIOS_USERID", nullable = false)
    private Long usuarioId;

    @Column(name = "COMUNA")
    private String comuna;

    @Column(name = "DIRECCION")
    private String direccion;

    @Column(name = "DETALLE")
    private String detalle;

    @Column(name = "PRECIO", nullable = false)
    private Double precio;

    @Column(name = "CANTIDAD")
    private Integer cantidad;

    @Column(name = "ESTADO")
    private String estado;

    @Column(name = "ORDERID")
    private String orderId;

    @Column(name = "CURRENCY")
    private String currency;

    @Column(name = "URLRETURN")
    private String urlReturn;

    @Column(name = "URLNOTIFY")
    private String urlNotify;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PedidoProductoEntity> detalles = new ArrayList<>();



    public Long getPedidoId() {
        return pedidoId;
    }

    public void setPedidoId(Long pedidoId) {
        this.pedidoId = pedidoId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
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

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
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



    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public List<PedidoProductoEntity> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<PedidoProductoEntity> detalles) {
        this.detalles = detalles;
    }
}
