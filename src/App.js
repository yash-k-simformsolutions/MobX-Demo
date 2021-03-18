import './App.css';
import DisplayTable from './components/DisplayTable';
import Filtering from './components/Filtering';
import PaginationTable from './components/PaginationTable';
import SortingTable from './components/SortingTable';
import Store from './store/Store';

function App() {
  return (
    <div className="app">
      {/* <DisplayTable store={Store}/> */}
      {/* <SortingTable store={Store} /> */}
      {/* <Filtering store={Store} /> */}
      <PaginationTable store={Store} />
    </div>
  );
}

export default App;