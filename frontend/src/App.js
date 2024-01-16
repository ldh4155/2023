import { Container } from 'react-bootstrap';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Home from './Layout/Home';
import Page1 from './Layout/Page1';
import Page2 from './Layout/Page2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header>
        <Container style={{minHeight:'75vh'}} />
      </Header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/page1' element={<Page1 />} />
        <Route path='/page2' element={<Page2 />} />
      </Routes>
      </BrowserRouter>
      
      
      
      <Footer />
    </div>
  
  );
}

export default App;