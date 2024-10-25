import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const notes = [
    {
        id: 1,
        content: 'HTML is not Easy',
        important: true
    },
    {
        id:2,
        content: 'El navegador puede ejecutar solo JavaScript',
        important: false
    },
    {
        id:3,
        content:'El metodo GET y POST son los mas importantes del protocolo HTTP.',
        important: true
    },
    {
        id:4,
        content:'Esta es cortesia de la casa',
        important: false
    }
]

ReactDOM.createRoot(document.getElementById('root')).render(
    <App notes={notes}/>

)





