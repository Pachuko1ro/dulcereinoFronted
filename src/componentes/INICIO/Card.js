import './Card.css'

export const Card = props => {

    const {producto, agregarCarritoID } = props

        const productosAlmacenados = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoAlmacenado = productosAlmacenados.find((p) => p.id === producto.id);
        const cantidadAlmacenada = productoAlmacenado ? productoAlmacenado.cantidad : 0

    return (
        <div className="card" style={{width: '15rem'}}>
            <img src={producto.foto} className="card-img-top" alt=""/>
            <hr id='hr1'/>
            <section  className="card-body">
                <h4 className="card-title">{producto.nombre}</h4>
                <p><b>Stock: </b>{producto.stock}</p>
                <p><b>Marca: </b>{producto.marca}</p>
                <p><b>Categoría: </b>{producto.categoria}</p>
                <p><b>Detalles: </b>{producto.detalles}</p>
                <p className="precio"><b>Precio: </b> <span style={{color:'black'}}>${producto.precio}</span></p>
                <p><b style={{color:'orange'}}>Envío: </b>{producto.envio? 'Si' : 'No'}</p>
                <button className={`btn btn-${cantidadAlmacenada>0? 'success':'primary'}`} onClick={
                    () => agregarCarritoID(producto.id)
                }>{cantidadAlmacenada>0? <b>Cargado al Carrito</b>:'Agregar al carrito'}</button>
                                
                {cantidadAlmacenada>0 &&
                    <p><b>Cantidad: {cantidadAlmacenada}</b></p>
                }
            </section>
        </div>
    )
}
