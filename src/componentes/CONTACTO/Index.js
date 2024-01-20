import { useForm } from "react-hook-form";
import { edadValidator } from "../Servicios/validador";
import './Index.css'
import { guardarContacto } from "../Servicios/contactos";

export function Index () {

    const { register, reset, formState: { errors }, watch, handleSubmit } = useForm({
        defaultValues: {
            nombre: ''
        }
    })

    async function onSubmit (contacto) {
       await guardarContacto(contacto)
       reset({
        nombre: '',
        apellido: '',
        direccion: '',
        email: '',
        edad: '',
        pais: '',
        telefono: '',
        incluirComentario: false,
        consulta: ''
       })
    }

    const incluirComentario = watch('incluirComentario');

    return (
     
        <div className="Contacto">
            <div className="jumbotron">
                <h2>Contacto</h2>
                <hr />
                <form className="w-75" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row" >    
                        
                        <div className="form-group col-6">
                            <label>Nombre</label>
                            <input type="text" className="form-control"{...register('nombre', {
                                required: true,
                                maxLength: 20
                            })} />
                            {errors.nombre?.type === 'required' && <p>El campo Nombre es requerido</p>}
                            {errors.nombre?.type === 'maxLength' && <p>El campo Nombre debe tener menos de 20 caracteres</p>}
                        </div>
                        
                        <div className="form-group col-6">
                            <label>Apellido</label>
                            <input type="text" className="form-control"{...register('apellido', {required: true, maxLength: 20})} />
                            {errors.nombre?.type === 'required' && <p>El campo Apellido es requerido</p>}
                            {errors.nombre?.type === 'maxLength' && <p>El campo Apellido debe tener menos de 20 caracteres</p>}
                        </div>
                        
                        <div className="form-group col-6">
                            <label>Dirección</label>
                            <input type="text" className="form-control"{...register('direccion', {
                                required: true
                            })} />
                        </div>
                        
                        <div className="form-group col-6">
                            <label>Email</label>
                            <input type="text" className="form-control"{...register('email', {
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
                            })} />
                            {errors.email?.type === 'pattern' && <p>El formato del email es incorrecto</p>}
                        </div>
                        
                        <div className="form-group col-3">
                            <label>Edad</label>
                            <input type="text" className="form-control" {...register('edad', {
                                validate: edadValidator
                            })} />
                            {errors.edad && <p>La edad debe estar entre 18 y 65</p>}
                        </div>
                        
                        <div className="form-group col-3">
                            <label>País</label>
                            <select className="form-control" {...register('pais')}>
                                <option value="ar">Argentina</option>
                                <option value="uy">Uruguay</option>
                                <option value="br">Brasil</option>
                                <option value="ot">Otro</option>
                            </select>
                        </div>
                                
                        <div className="form-group col-3">
                            <label>Teléfono</label>
                            <input type="text" className="form-control" {...register('telefono')} />
                        </div>

                        <div className="form-group col-3">
                            <label>¿Incluir Comentario?</label>
                            <input type="checkbox" className="form-control" {...register('incluirComentario')} />
                        </div>
                    
                        {incluirComentario && (
                        <div className="form-group col-12">
                            <label>{watch('nombre')} ¿En que podemos ayudarte?</label>
                            <textarea className="form-control"{...register("consulta", {required: true, maxLength: 3000})} />
                        </div>
                        )}
                        
                        <div className="form-group col-12">
                        <button className="btn btn-success m-1" type="submit">Enviar</button>
                        <button className="btn btn-danger m-1" type="reset">Borrar</button>
                        
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
