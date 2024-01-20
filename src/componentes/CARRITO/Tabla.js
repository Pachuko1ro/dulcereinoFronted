import './Tabla.css'


export const Tabla = props => {

    const { carrito, borrarID, incrementarCantID, decrementarCantID } = props
    //console.log(productos)

    return (
        <div className="Tabla">

            <div className="table-responsive">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            {/* <th>#</th> */}
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
                                    {/* <td>{producto.id}</td> */}
                                    <td>{producto.nombre}</td>
                                    <td>${producto.precio}</td>
                                    <td>{producto.marca}</td>
                                    <td><img width="100px" src={producto.foto} alt={"foto de " + producto.nombre} /></td>
                                    <td>
                                        <button className='btn btn-info ml-2' onClick={() => decrementarCantID(producto.id)}>-</button>
                                        <button className='btn btn-light ml-2' >{producto.cantidad}</button>
                                        <button className='btn btn-info ml-2' onClick={() => incrementarCantID(producto.id)}>+</button>
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
