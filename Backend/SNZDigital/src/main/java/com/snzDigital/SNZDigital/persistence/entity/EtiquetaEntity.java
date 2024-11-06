package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "etiqueta")
public class EtiquetaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "etiqueta_seq")
    @SequenceGenerator(name = "etiqueta_seq", sequenceName = "ETIQUETA_SEQ", allocationSize = 1)
    @Column(name = "ETIQUETAID")
    private Integer etiquetaId;

    @Column(name = "NOMBREETIQUETA", nullable = false, length = 100)
    private String nombreEtiqueta;

    @Column(name = "DETALLEETIQUETA")
    @Lob
    private String detalleEtiqueta;

    // Getters y Setters

    public Integer getEtiquetaId() {
        return etiquetaId;
    }

    public void setEtiquetaId(Integer etiquetaId) {
        this.etiquetaId = etiquetaId;
    }

    public String getNombreEtiqueta() {
        return nombreEtiqueta;
    }

    public void setNombreEtiqueta(String nombreEtiqueta) {
        this.nombreEtiqueta = nombreEtiqueta;
    }

    public String getDetalleEtiqueta() {
        return detalleEtiqueta;
    }

    public void setDetalleEtiqueta(String detalleEtiqueta) {
        this.detalleEtiqueta = detalleEtiqueta;
    }
}
