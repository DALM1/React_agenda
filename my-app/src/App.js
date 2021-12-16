import logo from './logo.svg';
import './App.css';
import Agenda from './components/Agenda';
import {useRef} from "react";

function App() {

  let maRef = useRef();
  maRef.current = "toto";

  
  return (
      <Agenda />
  );
}

export default App;
