import './styles/main.css'

import logoImg from './assets/logo-nlw-esports.svg'

function App(): JSX.Element {
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center m-20">
      <img src={logoImg} alt="" />
      
      <h1 className="text-6xl text-white font-black m-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        <a href="#" className="relative">
          <img src="/cs.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient">
            <strong>Nome do jogo</strong>
            <span>4 anuncios</span>
          </div>
        </a>
      </div>
    </div>
  )
}

export default App
