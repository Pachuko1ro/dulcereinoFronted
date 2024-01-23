import './Ingreso.css'
import { ObtenerFoto } from './ObtenerFoto'

export default function Ingreso(props) {

    const { nombre, precio, stock, marca, categoria, detalles, foto, envio } = props.producto
    const { onChange, onSubmit, editarID, invalid, enviarUrlImagen } = props

    return (
        <div className="Ingreso conteiner" >
            
        <form onSubmit={onSubmit} >
        <div className="row">
            {/* ------- Campo nombre ------- */}
            <div className="form-group col-6">
                <label htmlFor="nombre">nombre</label>
                <input type="text" id="nombre" className="form-control" value={nombre} onChange={onChange} />
            </div>

            {/* ------- Campo precio ------- */}
            <div className="form-group col-6">
                <label htmlFor="precio">precio</label>
                <input type="number" id="precio" className="form-control" value={precio} onChange={onChange} />
            </div>

            {/* ------- Campo stock ------- */}
            <div className="form-group col-6">
                <label htmlFor="stock">stock</label>
                <input type="number" id="stock" className="form-control" value={stock} onChange={onChange} />
            </div>

            {/* ------- Campo marca ------- */}
            <div className="form-group col-6">
                <label htmlFor="marca">marca</label>
                <input type="text" id="marca" className="form-control" value={marca} onChange={onChange} />
            </div>

            {/* ------- Campo detalles ------- */}
            <div className="form-group col-12">
                <label htmlFor="detalles">detalles</label>
                <input type="text" id="detalles" className="form-control" value={detalles} onChange={onChange} />
            </div>
            
            {/* ------- Campo categoria ------- */}
            <div className="form-group col-5">
                <label htmlFor="categoria">categoria</label>
                <input type="text" id="categoria" className="form-control" value={categoria} onChange={onChange} />
            </div>
            {/* ------- Campo foto ------- */}
            <div className="form-group col-5">
                <label htmlFor="foto">foto</label>
                <input type="text" id="foto" className="form-control" value={foto} onChange={onChange} />
            </div>
               

                {/* ------- Campo envio ------- */}
            <div className="form-group  form-check col-auto">
                <label htmlFor="envio">envio</label>
                <input type="checkbox" id="envio" className="mi-input" checked={envio} onChange={onChange} />
            </div>
                {/* Zona de obtención de la foto del producto */}
            <div className="form-group col-12">
                <ObtenerFoto enviarUrlImagen={enviarUrlImagen}/>
            </div>
            {/* ----- botón de envío ------ */}
            <div className="boton col-12">
            <button disabled={invalid} className={`btn btn-${editarID?'warning':'success'}`}>
                { editarID? 'Actualizar' : 'Enviar' }
            </button>
                </div>
                </div>
            </form>
        </div>

    )
}