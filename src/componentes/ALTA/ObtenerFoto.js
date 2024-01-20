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
        //console.log(archivo)

        if(archivo?.type.includes('image')) {
            const data = new FormData()
            data.append('archivo', archivo)

            enviarFormDataAjax(data, porcentaje => {
                setPorcentaje(porcentaje)
                if(porcentaje === 100) setStartSpinner(true)
            }, url => {
                //console.log(url)
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
        //console.log('dragenter')
    }

    const dragleave = e => {
        e.preventDefault()
        //console.log('dragleave')
    }

    const dragover = e => {
        e.preventDefault()
        //console.log('dragover')
    }

    const drop = e => {
        e.preventDefault()
        //console.log('drop')
        const archivo = e.dataTransfer.files[0]
        //console.log(archivo)
        enviarFoto(archivo)
    }

    const change = e => {
        const archivo = e.target.files[0]
        //console.log(archivo)
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
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                }

                { porcentaje > 0 && <><progress min="0" max="100" value={porcentaje}></progress> <span>{porcentaje}%</span></> }
                <img src={urlFoto} alt="" />
                <label htmlFor="archivo">D&D ó Click</label>
            </div>
        </div>
    )
}