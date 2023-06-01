import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { BiCaretRight, BiCaretLeft } from "react-icons/bi";
import Cards from '../components/Cards';
import MainSlick from '../components/MainSlick';
import {RecipesContext} from '../App.js';

function Main() {
    let navigate = useNavigate();
    let {recipes} = useContext(RecipesContext);
    const mainRecipe = recipes.slice(0, 10);

    const likesArray = recipes.map(function(item){
        return [item.id, item.totalLike, item.img]
    })
    const sortLikes = likesArray.sort((a, b) => b[1] - a[1]);
    const slickRecipe = sortLikes.slice(0, 6);

    return (
        <div className='App'>
            <div className="main_banner"/>
            <div className='slick'>
                <h1 style={{marginTop: "50px", marginBottom: "50px"}}>오늘의 인기 요리</h1>
                <MainSlick slickRecipe={slickRecipe} key={slickRecipe.id} />
            </div>
            <div className='card_container'>
                <div className="row">
                { mainRecipe.map((recipe, i) => {
                    return (
                    <Cards recipes={recipe} key={i}></Cards>
                    )
                })}
                </div>
            </div>
            <div style={{marginTop: '50px', marginBottom: '50px',fontSize: "25px"}}
                onClick={() => { navigate("/recipes"); }}>
                <BiCaretLeft /> 레시피 더 보러 가기 <BiCaretRight />
            </div>
        </div>
    );
}

export default Main;