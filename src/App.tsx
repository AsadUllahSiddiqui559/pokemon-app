import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import './App.css';

function App() {
  return (
    <div className="container">
     <PokemonList />
     <div className='detail-container'>
     <PokemonDetail />
     </div>
    </div>
  );
}

export default App;
