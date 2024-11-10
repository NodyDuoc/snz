package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "etiqueta_producto")
public class EtiquetaProductoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "etiqueta_producto_seq")
    @SequenceGenerator(name = "etiqueta_producto_seq", sequenceName = "ETIQUETA_PRODUCTO_SEQ", allocationSize = 1)
    @Column(name = "ETIQUETAPRODUCTOID")
    private Integer etiquetaProductoId;

    @Column(name = "PRODUCTID", nullable = false)
    private Integer productId;  // Este campo hace referencia a la tabla producto (productid)

    @Column(name = "ETIQUETAID", nullable = false)
    private Integer etiquetaId;  // Este campo hace referencia a la tabla etiqueta (etiquetaId)

    // Getters y Setters

    public Integer getEtiquetaProductoId() {
        return etiquetaProductoId;
    }

    public void setEtiquetaProductoId(Integer etiquetaProductoId) {
        this.etiquetaProductoId = etiquetaProductoId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getEtiquetaId() {
        return etiquetaId;
    }

    public void setEtiquetaId(Integer etiquetaId) {
        this.etiquetaId = etiquetaId;
    }

}
