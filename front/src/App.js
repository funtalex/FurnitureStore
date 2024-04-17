import logo from './logo.svg';
import './App.css';
import { Header } from './Components/Header/header';
import { MainPage } from './Routes/MainPage/mainpage';
import { Categories } from './Routes/CategoriesPage/categories';
import { Products } from './Routes/ProductsPage/products';
import { LoginPage } from './Routes/LoginPage/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/categories/armchair" element={<Products categoryLink='armchair' />}></Route>
          <Route path="/categories/bed" element={<Products categoryLink='bed' />}></Route>
          <Route path="/categories/chair" element={<Products categoryLink='chair' />}></Route>
          <Route path="/categories/closet" element={<Products categoryLink='closet' />}></Route>
          <Route path="/categories/mirror" element={<Products categoryLink='mirror' />}></Route>
          <Route path="/categories/table" element={<Products categoryLink='table' />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
