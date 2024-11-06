package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "MOVIMIENTO_KAR")
public class MovimientoKarEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mov_seq")
    @SequenceGenerator(name = "mov_seq", sequenceName = "MOV_SEQ", allocationSize = 1)
    @Column(name = "MOVID")
    private Integer movId;

    @Column(name = "MOVNAME", length = 30)
    private String movName;

    // Getters and Setters
    public Integer getMovId() {
        return movId;
    }

    public void setMovId(Integer movId) {
        this.movId = movId;
    }

    public String getMovName() {
        return movName;
    }

    public void setMovName(String movName) {
        this.movName = movName;
    }
}
