package com.udla.arquitectura.demo.repository;

import com.udla.arquitectura.demo.model.Producto;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Proxy del repositorio de productos.
 * Intercepta el acceso al repositorio real.
 */
@Repository
@Primary
public class ProxyProductoRepository implements ProductoRepository {

    private final ProductoRepository repositorioReal;

    public ProxyProductoRepository(RepositorioProductoEnMemoria repositorioReal) {
        this.repositorioReal = repositorioReal;
    }

    @Override
    public List<Producto> listarTodos() {
        return repositorioReal.listarTodos();
    }

    @Override
    public Producto buscarPorId(Long id) {
        return repositorioReal.buscarPorId(id);
    }
}