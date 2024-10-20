package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "KARDEX")
public class KardexEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "kardex_seq")
    @SequenceGenerator(name = "kardex_seq", sequenceName = "SNZ1.KARDEX_SEQ", allocationSize = 1)
    @Column(name = "KARDEXID")
    private Integer kardexId;

    @Column(name = "FECHA")
    @Temporal(TemporalType.DATE)
    private Date fecha;

    @Column(name = "HORA", length = 8)
    private String hora;

    @Column(name = "ENTRADA")
    private BigDecimal entrada;

    @Column(name = "SALIDA")
    private BigDecimal salida;

    @Column(name = "SALDO")
    private BigDecimal saldo;

    @Column(name = "PRECIOUNITARIO", precision = 10, scale = 2)
    private BigDecimal precioUnitario;

    @Column(name = "PRECIOACTUALIZADO", precision = 10, scale = 2)
    private BigDecimal precioActualizado;

    @Column(name = "MOVIMIENTO_KAR_MOVID")
    private Integer movimientoKarMovId;

    @Column(name = "PRODUCTO_PRODUCTID")
    private Integer productoProductId;

    // Getters and Setters
    public Integer getKardexId() {
        return kardexId;
    }

    public void setKardexId(Integer kardexId) {
        this.kardexId = kardexId;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public BigDecimal getEntrada() {
        return entrada;
    }

    public void setEntrada(BigDecimal entrada) {
        this.entrada = entrada;
    }

    public BigDecimal getSalida() {
        return salida;
    }

    public void setSalida(BigDecimal salida) {
        this.salida = salida;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public BigDecimal getPrecioActualizado() {
        return precioActualizado;
    }

    public void setPrecioActualizado(BigDecimal precioActualizado) {
        this.precioActualizado = precioActualizado;
    }

    public Integer getMovimientoKarMovId() {
        return movimientoKarMovId;
    }

    public void setMovimientoKarMovId(Integer movimientoKarMovId) {
        this.movimientoKarMovId = movimientoKarMovId;
    }

    public Integer getProductoProductId() {
        return productoProductId;
    }

    public void setProductoProductId(Integer productoProductId) {
        this.productoProductId = productoProductId;
    }
}
