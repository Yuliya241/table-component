import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';
import '@ant-design/v5-patch-for-react-19';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export const App = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
