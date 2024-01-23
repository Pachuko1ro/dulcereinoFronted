const URL_API_UPLOAD = process.env.NODE_ENV === 'production'
                                    ? '/api/upload/'
                                    : `http://localhost:${process.env.REACT_APP_PORT_SRV_DEV}/api/upload/`

                                   
export function enviarFormDataAjax(data, progress, urlfoto) {
    let porcentaje = 0

    const xhr = new XMLHttpRequest()
    xhr.open('post', URL_API_UPLOAD)

    xhr.addEventListener('load', () => {
        if(xhr.status === 200) {
            const rta = JSON.parse(xhr.response)
            const url = rta.urlFotoFTP
            if(urlfoto) urlfoto(url)
        }
    })

    xhr.upload.addEventListener('progress', e => {
        if(e.lengthComputable) {
            porcentaje = parseInt((e.loaded * 100) / e.total)
            if(progress) progress(porcentaje)
        }
    })

    xhr.send(data)
}