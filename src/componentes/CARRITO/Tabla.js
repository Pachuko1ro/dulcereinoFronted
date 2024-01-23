import './Tabla.css'


export const Tabla = props => {

    const { carrito, borrarID, incrementarCantID, decrementarCantID } = props

    return (
        <div className="Tabla">

            <div className="table-responsive">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th>nombre</th>
                            <th>precio</th>
                            <th>marca</th>
                            <th>foto</th>
                            <th>cantidad</th>
                            <th>subtotal</th>
                            <th>acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carrito.map((producto, index) =>
                                <tr key={index}>
                                    <td>{producto.nombre}</td>
                                    <td>${producto.precio}</td>
                                    <td>{producto.marca}</td>
                                    <td><img width="100px" src={producto.foto} alt={"foto de " + producto.nombre} /></td>
                                    <td>
                                        <div class="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" class="btn btn-info"onClick={() => decrementarCantID(producto.id)}><i className="bi bi-dash-lg"></i></button>
                                            <button type="button" class="btn btn-light" >{producto.cantidad}</button>
                                            <button type="button" class="btn btn-info"onClick={() => incrementarCantID(producto.id)}><i className="bi bi-plus"></i></button>
                                        </div>
                                        
                                    </td>
                                    <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => borrarID(producto.id)}>Borrar</button>
                                    </td>
                                </tr>
                            )
                        }
                         <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th><h4>TOTAL</h4></th>
                            <th>
                                <h4>
                                    ${ carrito.reduce((acc,p) => acc + Number(p.precio)*p.cantidad, 0).toFixed(2) }
                                </h4>
                            </th>
                            <th></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
