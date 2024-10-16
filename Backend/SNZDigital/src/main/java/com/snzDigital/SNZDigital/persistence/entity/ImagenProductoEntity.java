package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "imagen_producto")
public class ImagenProductoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "img_seq")
    @SequenceGenerator(name = "img_seq", sequenceName = "IMG_SEQ", allocationSize = 1)
    @Column(name = "IMAGENID")
    private Long imagenId;

    @Lob
    @Column(name = "IMAGEN", columnDefinition = "CLOB")
    private String imagen;

    @Column(name = "PRODUCTO_PRODUCTID")
    private Long productoProductId;

    @Column(name = "ESPRIMARIO")
    private Boolean esPrimario;

    // Getters y Setters

    public Long getImagenId() {
        return imagenId;
    }

    public void setImagenId(Long imagenId) {
        this.imagenId = imagenId;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public Long getProductoProductId() {
        return productoProductId;
    }

    public void setProductoProductId(Long productoProductId) {
        this.productoProductId = productoProductId;
    }

    public Boolean getEsPrimario() {
        return esPrimario;
    }

    public void setEsPrimario(Boolean esPrimario) {
        this.esPrimario = esPrimario;
    }
}
