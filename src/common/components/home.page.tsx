function HomePage(): React.JSX.Element {
  return (
    <div className="dashboard-margin" style={{justifyContent: "center"}}>
      <section className="welcome-container">
        <span className="text-dasboard huge text-center">Bienvenid@ al </span>  
      </section>
        <div className="display-justify-flex-center home-aplications">
          <img
            src={ require('../../public/images/icons/application-icon-10.svg') } 
            alt='icono-nomina'
          />  
        </div>
        <span className="text-dasboard large text-center">Módulo de nomina</span>
        
    </div>
  )
}

export default HomePage;
