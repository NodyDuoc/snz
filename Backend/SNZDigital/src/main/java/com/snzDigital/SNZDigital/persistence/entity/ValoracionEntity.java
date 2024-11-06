package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "VALORACION")
public class ValoracionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "val_seq")
    @SequenceGenerator(name = "val_seq", sequenceName = "VAL_SEQ", allocationSize = 1)
    @Column(name = "VALID")
    private Integer valid;

    @Column(name = "VALCOMENTARIO")
    private String valComentario;

    @Column(name = "VALPUNTUACION")
    private Integer valPuntuacion;

    @Column(name = "USUARIOS_USERID")
    private Long usuariosUserId;

    @Column(name = "PRODUCTO_PRODUCTID")
    private Long productoProductId;

    // Getters and Setters
    public Integer getValid() {
        return valid;
    }

    public void setValid(Integer valid) {
        this.valid = valid;
    }

    public String getValComentario() {
        return valComentario;
    }

    public void setValComentario(String valComentario) {
        this.valComentario = valComentario;
    }

    public Integer getValPuntuacion() {
        return valPuntuacion;
    }

    public void setValPuntuacion(Integer valPuntuacion) {
        this.valPuntuacion = valPuntuacion;
    }

    public Long getUsuariosUserId() {
        return usuariosUserId;
    }

    public void setUsuariosUserId(Long usuariosUserId) {
        this.usuariosUserId = usuariosUserId;
    }

    public Long getProductoProductId() {
        return productoProductId;
    }

    public void setProductoProductId(Long productoProductId) {
        this.productoProductId = productoProductId;
    }
}
