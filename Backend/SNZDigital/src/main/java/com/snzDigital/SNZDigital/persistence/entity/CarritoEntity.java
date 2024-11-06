package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "CARRITO")
public class CarritoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "car_seq")
    @SequenceGenerator(name = "car_seq", sequenceName = "CAR_SEQ", allocationSize = 1)
    @Column(name = "ID_CARRITO")
    private Integer idCarrito; // Cambiado a Integer

    @Column(name = "USUARIO_ID_USER")
    private Integer usuarioIdUser; // Cambiado a Integer

    @Column(name = "COSTO_TOTAL_CARRITO")
    private Double costoTotalCarrito;

    // Getters and Setters
    public Integer getIdCarrito() {
        return idCarrito;
    }

    public void setIdCarrito(Integer idCarrito) {
        this.idCarrito = idCarrito;
    }

    public Integer getUsuarioIdUser() {
        return usuarioIdUser;
    }

    public void setUsuarioIdUser(Integer usuarioIdUser) {
        this.usuarioIdUser = usuarioIdUser;
    }

    public Double getCostoTotalCarrito() {
        return costoTotalCarrito;
    }

    public void setCostoTotalCarrito(Double costoTotalCarrito) {
        this.costoTotalCarrito = costoTotalCarrito;
    }
}
