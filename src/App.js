import './App.css';
import Navbar from './components/layout/Navbar';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import Dashboard from './components/layout/Dashboard';
import Pokemon from './components/pokemon/Pokemon';
import Berries from './components/berries/Berries';
import BerryDetails from './components/berries/BerryDetails';

//const backgroundUrl = 'https://wallpaperaccess.com/full/154722.jpg';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className='container' style={{marginLeft: '30px', width: '90%'}}>
          <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route exact path='/pokemon/:pokemonIndex' component={Pokemon}/>
            <Route exact path='/berries' component={Berries}/>
            <Route exact path='/berries/:berryIndex' component={BerryDetails} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
