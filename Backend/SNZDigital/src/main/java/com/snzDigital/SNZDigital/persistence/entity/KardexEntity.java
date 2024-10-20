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
    private Long entrada;

    @Column(name = "SALIDA")
    private Long salida;

    @Column(name = "SALDO")
    private Long saldo;

    @Column(name = "PRECIOUNITARIO", precision = 10, scale = 2)
    private Double precioUnitario;

    @Column(name = "PRECIOACTUALIZADO", precision = 10, scale = 2)
    private Double precioActualizado;

    @ManyToOne
    @JoinColumn(name = "MOVIMIENTO_KAR_MOVID", nullable = false)
    private MovimientoKarEntity movimientoKar;

    @ManyToOne
    @JoinColumn(name = "PRODUCTO_PRODUCTID")
    private ProductoEntity producto;

    // Getters y Setters
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

    public Long getEntrada() {
        return entrada;
    }

    public void setEntrada(Long entrada) {
        this.entrada = entrada;
    }

    public Long getSalida() {
        return salida;
    }

    public void setSalida(Long salida) {
        this.salida = salida;
    }

    public Long getSaldo() {
        return saldo;
    }

    public void setSaldo(Long saldo) {
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
