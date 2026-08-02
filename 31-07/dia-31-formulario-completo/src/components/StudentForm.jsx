import React from 'react';
import StudentForm from './components/StudentForm'; // <-- Importamos tu nuevo componente
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  return (
    <div className="container my-5" style={{ maxWidth: '750px' }}>
      {/* Encabezado estético de Vite/React arriba */}
      <div className="text-center mb-4">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo vite p-2" alt="Vite logo" width="80" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react p-2" alt="React logo" width="80" />
        </a>
        <h1 className="mt-2 text-white">Workspace Activo</h1>
      </div>

      {/* --- AQUÍ SE COLOCA TU COMPONENTE FORMULARIO --- */}
      <StudentForm />
      
    </div>
  );
}

export default App;