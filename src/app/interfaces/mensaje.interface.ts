import { Mensaje } from './mensaje.interface';

export interface Mensaje {
    nombre: string;
    mensaje: string;
    fecha?: number;
    uid?: string;
}