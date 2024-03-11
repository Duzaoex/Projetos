import { FilterProvider } from './componentes/Context/FIlterContext';
import Table from './componentes/Table/Table';

function App() {
  return (
    <FilterProvider>
      <div>
        <Table />
      </div>
    </FilterProvider>
  );
}

export default App;
