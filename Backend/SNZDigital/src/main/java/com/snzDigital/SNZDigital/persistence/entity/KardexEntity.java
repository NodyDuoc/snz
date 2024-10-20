package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;
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
    private Integer entrada;

    @Column(name = "SALIDA")
    private Integer salida;

    @Column(name = "SALDO")
    private Integer saldo;

    @Column(name = "PRECIOUNITARIO")
    private Double precioUnitario;

    @Column(name = "PRECIOACTUALIZADO")
    private Double precioActualizado;

    @ManyToOne
    @JoinColumn(name = "MOVIMIENTO_KAR_MOVID", nullable = false)
    private MovimientoKarEntity movimientoKar;

    @ManyToOne
    @JoinColumn(name = "PRODUCTO_PRODUCTID", nullable = false)
    private ProductoEntity producto;

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

    public Integer getEntrada() {
        return entrada;
    }

    public void setEntrada(Integer entrada) {
        this.entrada = entrada;
    }

    public Integer getSalida() {
        return salida;
    }

    public void setSalida(Integer salida) {
        this.salida = salida;
    }

    public Integer getSaldo() {
        return saldo;
    }

    public void setSaldo(Integer saldo) {
        this.saldo = saldo;
    }

    public Double getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(Double precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public Double getPrecioActualizado() {
        return precioActualizado;
    }

    public void setPrecioActualizado(Double precioActualizado) {
        this.precioActualizado = precioActualizado;
    }

    public MovimientoKarEntity getMovimientoKar() {
        return movimientoKar;
    }

    public void setMovimientoKar(MovimientoKarEntity movimientoKar) {
        this.movimientoKar = movimientoKar;
    }

    public ProductoEntity getProducto() {
        return producto;
    }

    public void setProducto(ProductoEntity producto) {
        this.producto = producto;
    }
}
