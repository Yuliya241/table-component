import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { NotFound } from '../pages/Not-found/Not-found';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default router;