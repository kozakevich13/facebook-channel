import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Comments from './components/Comments';
import Home from './components/Home';



function App() {

  return (
        <>
            <Routes>
              <Route path="/" element={<Login />} />,
              <Route path="/home" element={<Home />} />,

              {/* <Route path="/comments" element={<Comments />}/> */}
            </Routes>
        </>
  );
}

export default App;
