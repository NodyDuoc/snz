package com.snzDigital.SNZDigital.persistence.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "categoria")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoriaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cat_seq")
    @SequenceGenerator(name = "cat_seq", sequenceName = "CAT_SEQ", allocationSize = 1)
    @Column(name = "catid")
    private Integer catId;

    @Column(name = "catname", nullable = false)
    private String catName;

    @Column(name = "catdetalle", nullable = false)
    private String catDetalle;

    @Column(name = "imagen", columnDefinition = "bytea", nullable = true)
    private byte[] imagen;

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }


    public String getCatName() {
        return catName;
    }
}