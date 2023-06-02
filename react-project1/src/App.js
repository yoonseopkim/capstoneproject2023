import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './pages/Main.js';
import Recipes from './pages/Recipes.js';
import Login from './pages/Login.js';
import Board from './pages/Board.js';
import Write from './pages/Write.js';
import Detail from './pages/Detail.js';
import MyPage from './pages/MyPage.js';
import Signup from './pages/Signup';
import Navbars from './components/Navbars';
import Footers from './components/Footers';
import PostPage from './pages/PostPage';

export let RecipesContext = React.createContext();

function App() {
  const [recipes, setRecipes] = useState([]); //레시피 데이터
  const [searchResults, setSearchResults] = useState([]);
  const [checkboxResults, setCheckboxResults] = useState([]);

  useEffect(() => {
    axios.get('https://confident-craft-384109.du.r.appspot.com/recipeData')
      .then((response)=>{
        setRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setCheckboxResults(searchResults.length > 0 ? searchResults : recipes);
  }, [searchResults, recipes]);

  return (
    <div className='App'>
      <Navbars/>
      <Routes>
        <Route path="/" element={ 
        <RecipesContext.Provider value={{recipes, searchResults, checkboxResults, setSearchResults, setCheckboxResults}}>
          <Main/>
        </RecipesContext.Provider>
          } />
        <Route path="/recipes" element={
        <RecipesContext.Provider value={{recipes, searchResults, checkboxResults, setSearchResults, setCheckboxResults}}>
          <Recipes/>
        </RecipesContext.Provider>
          } />
        <Route path="/detail/:id" element={ <Detail/> } /> 
        <Route path="/board" element={<Board />} />
        <Route path="/post/:id" element={<PostPage />} /> {/* PostPage 컴포넌트 등록 */}
        <Route path="/write" element={<Write />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footers/>
    </div>
  );
}

export default App;
