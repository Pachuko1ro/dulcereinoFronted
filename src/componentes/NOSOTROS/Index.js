import { useEffect } from 'react'

import './Index.css'

export function Index(props) {

    useEffect(() => {
        
        return () => {
        }
    },[])

    return (
        <div className="Nosotros">
            <div className="jumbotron">
                <h2>Conociendonos</h2>
                <hr />
                <div className="conteiner w-75 mx-auto "  >
                    <div className="row justify-content-md-center">
                        <div className='col-3'>
                            <img className="img-fluid" src="https://pachuko.000webhostapp.com/img/local.jpg" alt=""/>
                        </div>
                        <div className="col-9">    
                            <p>
                                DULCE REINO se establece en 2017 en la Ciudad de Florida Oeste, partido de Vicente López.
                                Cumpliendo 6 años de trabajo ininterrumpido,
                                tratando de formar parte de la historia viva de la localidad.
                            </p>
                            <p>
                                No te pierdas ningún sabor, vení y encontra esa golosina que estás buscando.
                            </p>
                            <p>    
                                Te esperamos
                            </p>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    )
}