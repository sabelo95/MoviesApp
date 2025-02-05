import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080', // Cambia localhost por la URL de Ngrok
  headers: { "ngrok-skip-browser-warning": "true" } // Esto evita el aviso del navegador de Ngrok
});
