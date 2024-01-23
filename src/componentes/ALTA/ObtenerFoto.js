import { useState } from 'react'
import { enviarFormDataAjax } from '../Servicios/upload'
import './ObtenerFoto.css'


export function ObtenerFoto(props) {
    const { enviarUrlImagen } = props

    const [valorInput, setValorInput] = useState('')
    const [porcentaje, setPorcentaje] = useState(0)
    const [urlFoto, setUrlFoto] = useState('')
    const [startSpinner, setStartSpinner] = useState(false)


    const enviarFoto = archivo => {

        if(archivo?.type.includes('image')) {
            const data = new FormData()
            data.append('archivo', archivo)

            enviarFormDataAjax(data, porcentaje => {
                setPorcentaje(porcentaje)
                if(porcentaje === 100) setStartSpinner(true)
            }, url => {
                setUrlFoto(url)
                enviarUrlImagen(url)
                setStartSpinner(false)

                setTimeout(() => {
                    setUrlFoto('')
                    setPorcentaje(0)
                },10000)
            })
        }
        else {
            console.error('El archivo no es una imágen!')
        }
    }

    const dragenter = e => {
        e.preventDefault()
    }

    const dragleave = e => {
        e.preventDefault()
    }

    const dragover = e => {
        e.preventDefault()
    }

    const drop = e => {
        e.preventDefault()
        const archivo = e.dataTransfer.files[0]
        enviarFoto(archivo)
    }

    const change = e => {
        const archivo = e.target.files[0]
        enviarFoto(archivo)

        setValorInput('')
    }

    return (
        <div className="ObtenerFoto">
            
            <input id="archivo" type="file" value={valorInput} onChange={change} />

            <div 
                id="drop"
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDragOver={dragover}
                onDrop={drop}
            >
                    {
                    startSpinner &&
                        <div className="d-flex justify-content-center mt-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Cargando...</span>
                            </div>
                        </div>
                    }
                   
                    { porcentaje > 0 ?( <><progress min="0" max="100" value={porcentaje}></progress><span>{porcentaje}%</span></>):
                    (<label htmlFor="archivo"></label>) }
                    {porcentaje===100 && <img src={urlFoto} alt="" />}
            </div>
        </div>
    )
}