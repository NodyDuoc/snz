package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "direccion")
public class DireccionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "dir_seq")
    @SequenceGenerator(name = "dir_seq", sequenceName = "DIR_SEQ", allocationSize = 1)
    @Column(name = "DIRID")
    private Long dirId;

    @Column(name = "COMUNA", nullable = false)
    private String comuna;

    @Column(name = "DIRECCION", nullable = false)
    private String direccion;

    @Column(name = "DETALLE")
    private String detalle;

    @Column(name = "DIRPRINCIPAL", nullable = false)
    private Boolean dirPrincipal;

    @Column(name = "USUARIO_ID_USER", nullable = false)
    private Long usuarioIdUser;

    // Getters y Setters

    public Long getDirId() {
        return dirId;
    }

    public void setDirId(Long dirId) {
        this.dirId = dirId;
    }

    public String getComuna() {
        return comuna;
    }

    public void setComuna(String comuna) {
        this.comuna = comuna;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }

    public Boolean getDirPrincipal() {
        return dirPrincipal;
    }

    public void setDirPrincipal(Boolean dirPrincipal) {
        this.dirPrincipal = dirPrincipal;
    }

    public Long getUsuarioIdUser() {
        return usuarioIdUser;
    }

    public void setUsuarioIdUser(Long usuarioIdUser) {
        this.usuarioIdUser = usuarioIdUser;
    }
}
