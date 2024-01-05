import Tester from './componetns/Tester';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './componetns/Form/Form'
import Video from './componetns/Video/Video';
import Image from './componetns/Image/Image';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Tester/>}/>
            <Route path='/video' element={<Video/>}/>
            <Route path='/image' element={<Image/>}/>
            <Route path='/form' element={<Form/>}/>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
