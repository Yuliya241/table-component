import './App.css';
import '@ant-design/v5-patch-for-react-19';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { TableComponent } from './components/Table/TableComponent';

export const App = () => (
  <Provider store={store}>
    <div className="wrapper">
      <TableComponent />
    </div>
  </Provider>
);
