package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "guia")
public class GuiaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "guia_seq")
    @SequenceGenerator(name = "guia_seq", sequenceName = "GUIA_SEQ", allocationSize = 1)
    @Column(name = "GUIAID")
    private Integer guiaId;

    @Column(name = "DETALLE")
    @Lob
    private String detalle;

    // Getters y Setters

    public Integer getGuiaId() {
        return guiaId;
    }

    public void setGuiaId(Integer guiaId) {
        this.guiaId = guiaId;
    }

    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }
}
