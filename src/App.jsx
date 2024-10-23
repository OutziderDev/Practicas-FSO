import { useState } from "react";
import Display from "./Components/Display";
import Button from "./Components/Button";

const Historial = (props) =>{
  console.log(props);
  if (props.allClicks.length === 0) {
    return (
      <p> Este componente se activa al realizar clicks</p>
    ) 
  }
  return(
    <p>Cantidad de clicks totales ilustrados: {props.allClicks.join(' ')}</p>
  )
}

const App = () =>{
  //Variables de Control de estados
  const [counter,setCounter] = useState(0);
  const [clicks,setClicks] = useState({left: 0, right:0});
  const [allClicks,setAllClicks] = useState([]);
  const [totalClicks,setTotalClicks] = useState(0);

  //Funciones flechas de Controladores de eventos
  const countAdd = () => setCounter(counter+1);
  const countLess = () => setCounter(counter -1);
  const zeroCount = () => setCounter(0);

  const clickDerecho = () => {
    setClicks({...clicks,right: clicks.right + 1})
    setAllClicks(allClicks.concat('D'))
    setTotalClicks(totalClicks +1)
  }
  const clickIzquierdo = () => {
    setClicks({...clicks,left: clicks.left + 1})
    setAllClicks(allClicks.concat('I'))
    setTotalClicks(totalClicks +1)
  }

  return(
    <>
      <Display counter={counter}/>
      <Button Text= 'Incrementar Contador!' onClick={countAdd } />
      <Button Text='Rebobinar a 0'          onClick={zeroCount} />
      <Button Text='Decrementar contador'   onClick={countLess}/>
      <hr />
      <p>Cantidad de clicks en el izquierdo: {clicks.left} Cantidad de clicks en el derecho: {clicks.right}</p>
      <Button Text={"Boton Izquierdo"} onClick={clickIzquierdo}/>
      <Button Text={"Boton derecho"} onClick={clickDerecho}/>
      <hr />
      {/* <p>Cantidad de clicks totales ilustrados: {allClicks.join(' ')}</p> */}
      <Historial allClicks={allClicks}/>
      <hr />
      <p>Cantidad de clicks totales de la App: {totalClicks}</p>
    </>
  );
}

export default App;

/* const Hello = ({name,age}) => {

  const bornYear = () => new Date().getFullYear() - age
  
  return(
    <div>
      <p>
        Hola {name}, usted tiene: {age}, años de edad
      </p>
      <p>Aproximadamente naciste en el año {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const friends = [
    {nombre: "Mario", edad: 29},
    {nombre: "August" },
    {nombre: "Pedro", edad: 18}];
 
  return (
    <>
      <h1><i>Maravilloso.!</i></h1>
      <br />
      <Hello name={friends[0].nombre} age={friends[0].edad}/>
      <hr />
      <Hello name={friends[1].nombre} age={12+32} />
      <hr />  
      <Footer/>
      
    </>  
  );
}; */