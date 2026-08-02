import React from 'react'

export const UnderConstruction = ({ titulo = "Sección en Construcción", mensaje = "Estamos trabajando para traerte esta función muy pronto." }) => {
  return (
    <div className="container text-center my-5 py-5">
      <div className="card shadow-lg p-5 mx-auto" style={{ maxWidth: '600px', borderRadius: '15px' }}>
        <div className="mb-3 display-1">
          🚧
        </div>
        <h2 className="fw-bold text-dark mb-3">{titulo}</h2>
        <p className="text-secondary mb-4">{mensaje}</p>
        
        {/* Barra de progreso animada de Bootstrap */}
        <div className="progress mb-4" style={{ height: '12px' }}>
          <div 
            className="progress-bar progress-bar-striped progress-bar-animated bg-warning" 
            role="progressbar" 
            style={{ width: '75%' }} 
            aria-valuenow="75" 
            aria-valuemin="0" 
            aria-valuemax="100"
          ></div>
        </div>

        <div>
          <button 
            className="btn btn-outline-primary fw-bold"
            onClick={() => window.history.back()}
          >
            ⬅️ Volver Atrás
          </button>
        </div>
      </div>
    </div>
  )
}