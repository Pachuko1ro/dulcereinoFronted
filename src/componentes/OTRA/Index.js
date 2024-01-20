import { useEffect } from 'react'

import './Index.css'
import { Carousel } from 'react-bootstrap'

export function Index(props) {

    useEffect(() => {
        console.log('Componente Index Otra (montado)')
        
        return () => {
            console.log('Componente Index Otra (desmontado)')
        }
    },[])

    return (
        <div className="Otra">
                     <div className="jumbotron">
                        <Carousel>
                            <Carousel.Item interval={1000}>
                                <img
                                className="d-block w-100"
                                src="https://pachuko.000webhostapp.com/img/1.png"
                                alt="First slide"
                                />
                                <Carousel.Caption>
                              
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item interval={500}>
                                <img
                                className="d-block w-100"
                                src="https://pachuko.000webhostapp.com/img/2.png"
                                alt="Second slide"
                                />
                                <Carousel.Caption>
                                
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="https://pachuko.000webhostapp.com/img/3.png"
                                alt="Third slide"
                                />
                                <Carousel.Caption>
                               
                                </Carousel.Caption>
                            </Carousel.Item>
                            </Carousel>



                        </div>

        </div>
    )
}