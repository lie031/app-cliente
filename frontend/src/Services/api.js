import axios from 'axios';
/**
 * Archivo de configuracion para la conexion con el backend
 * Axios nos proporciona una interfaz mas limpia y potente para realizar las peticiones HTTP
 */

/**
 * Creamos una instancia personalizada de Axios
 * Esto nos eprmite definir una configuracion comun para todas las peticiones
 */

const axiosInstance = axios.create({
    //URL base de la api
    baseURL: 'http://localhost:4000',
    //Tiempo maximo de espera para las peticiones (en milisegundos)
    timeout: 10000,
    //Headers comunes para todas las peticiones
    headers: {
        'Content-Type': 'application/json',
    }
});


export default axiosInstance;