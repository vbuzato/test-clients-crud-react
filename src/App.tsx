import './App.css';
import { Route, Switch } from 'react-router-dom';
import Customers from './pages/Customers';
import FormCustomers from './pages/FormCustomers';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Customers} />
        <Route path="/customer/:id" component={FormCustomers} />
        <Route path="/customer" component={FormCustomers} />
      </Switch>
    </div>
  );
}

export default App;
