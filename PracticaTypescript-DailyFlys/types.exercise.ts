let edad: number = 25;
let nombre: string = "Juan";
let activo: boolean = true;
let nada: null = null;
let indefinido: undefined = undefined;

//tipados especiales
let cualquierCosa: any = 42; // evitar usarlo
let desconocido: unknown = "podría ser cualquier cosa";

let nunca: never; // una función que nunca retorna (lanza error)

function lanzarError(): never {
  throw new Error("Error fatal");
}

//tipando array y tuplas
let numeros: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

let tupla: [string, number] = ["edad", 30];

// tipados literales y joins
let direccion: "izquierda" | "derecha" | "centro";
direccion = "izquierda"; // solo puede ser una de esas 3

let id: string | number = 123; // puede ser string o number

// tipando alias y enums:
type UsuarioID = string | number;
let userId: UsuarioID = "abc123";

enum Rol {
  Admin,
  Usuario,
  Invitado
}

let rol: Rol = Rol.Usuario;

//tipado de objetos normales
let usuario: { nombre: string; edad: number } = {  nombre: "Ana",  edad: 28 };

// ejemplo de interfaces:
interface Producto {
  id: number;
  nombre: string;
  precio?: number; // opcional si tiene el simbolo ? y ts no lo requerira
}

const item: Producto = {
  id: 1,
  nombre: "Laptop"
};