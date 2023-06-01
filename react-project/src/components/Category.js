import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import FindCards from './FindCards';
import { RxEraser } from "react-icons/rx";

function Category({ currentPosts }) {
  const [checkboxes, setCheckboxes] = useState({
    meet: { pork: false, beef: false, chicken: false, lamb: false, duck: false, egg: false },
    vegetable: { onion: false, garlic: false, carrot: false, cucumber: false, pepper: false, cabbage: false },
    seefood: { salmon: false, mackerel: false, squid: false, octopus: false, shrimp: false, clam: false },
    seasoning: { sugar: false, salt: false, blackpepper: false, soy: false, redpepperpowder: false, gochujang: false }
  });

  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    fetch('https://confident-craft-384109.du.r.appspot.com/recipeData')
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [checkboxes]);

  const handleCheckboxChange = (category, name) => {
    setCheckboxes(prevCheckboxes => ({
      ...prevCheckboxes,
      [category]: {
        ...prevCheckboxes[category],
        [name]: !prevCheckboxes[category][name]
      }
    }));
  };

  const handleCheckboxReset = () => {
    setCheckboxes({
      meet: { pork: false, beef: false, chicken: false, lamb: false, duck: false, egg: false },
      vegetable: { onion: false, garlic: false, carrot: false, cucumber: false, pepper: false, cabbage: false },
      seefood: { salmon: false, mackerel: false, squid: false, octopus: false, shrimp: false, clam: false },
      seasoning: { sugar: false, salt: false, blackpepper: false, soy: false, redpepperpowder: false, gochujang: false }
    });
  };

  const filterRecipes = () => {
    const updatedRecipes = recipes.map(recipe => {
      const ingredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
      const selectedIngredients = [];

      const { meet, vegetable, seefood, seasoning } = checkboxes;

      if (meet.pork) selectedIngredients.push('돼지고기');
      if (meet.beef) selectedIngredients.push('소고기');
      if (meet.chicken) selectedIngredients.push('닭고기');
      if (meet.lamb) selectedIngredients.push('양고기');
      if (meet.duck) selectedIngredients.push('오리고기');
      if (meet.egg) selectedIngredients.push('계란');
      if (vegetable.onion) selectedIngredients.push('양파');
      if (vegetable.garlic) selectedIngredients.push('마늘');
      if (vegetable.carrot) selectedIngredients.push('당근');
      if (vegetable.cucumber) selectedIngredients.push('오이');
      if (vegetable.pepper) selectedIngredients.push('피망');
      if (vegetable.cabbage) selectedIngredients.push('배추');
      if (seefood.salmon) selectedIngredients.push('연어');
      if (seefood.mackerel) selectedIngredients.push('고등어');
      if (seefood.squid) selectedIngredients.push('오징어');
      if (seefood.octopus) selectedIngredients.push('문어');
      if (seefood.shrimp) selectedIngredients.push('새우');
      if (seefood.clam) selectedIngredients.push('조개');
      if (seasoning.sugar) selectedIngredients.push('설탕');
      if (seasoning.salt) selectedIngredients.push('소금');
      if (seasoning.blackpepper) selectedIngredients.push('후추');
      if (seasoning.soy) selectedIngredients.push('간장');
      if (seasoning.redpepperpowder) selectedIngredients.push('고추가루');
      if (seasoning.gochujang) selectedIngredients.push('고추장');

      const commonIngredients = ingredients.filter(ingredient => selectedIngredients.includes(ingredient));

      return {
        ...recipe,
        commonIngredients
      };
    });

    const filtered = updatedRecipes.filter(recipe => {
      const { commonIngredients } = recipe;
      const { meet, vegetable, seefood, seasoning } = checkboxes;

      return (
        (meet.pork && commonIngredients.includes('돼지고기')) ||
        (meet.beef && commonIngredients.includes('소고기')) ||
        (meet.chicken && commonIngredients.includes('닭고기')) ||
        (meet.lamb && commonIngredients.includes('양고기')) ||
        (meet.duck && commonIngredients.includes('오리고기')) ||
        (meet.egg && commonIngredients.includes('계란')) ||
        (vegetable.onion && commonIngredients.includes('양파')) ||
        (vegetable.garlic && commonIngredients.includes('마늘')) ||
        (vegetable.carrot && commonIngredients.includes('당근')) ||
        (vegetable.cucumber && commonIngredients.includes('오이')) ||
        (vegetable.pepper && commonIngredients.includes('피망')) ||
        (vegetable.cabbage && commonIngredients.includes('배추')) ||
        (seefood.salmon && commonIngredients.includes('연어')) ||
        (seefood.mackerel && commonIngredients.includes('고등어')) ||
        (seefood.squid && commonIngredients.includes('오징어')) ||
        (seefood.octopus && commonIngredients.includes('문어')) ||
        (seefood.shrimp && commonIngredients.includes('새우')) ||
        (seefood.clam && commonIngredients.includes('조개')) ||
        (seasoning.sugar && commonIngredients.includes('설탕')) ||
        (seasoning.salt && commonIngredients.includes('소금')) ||
        (seasoning.blackpepper && commonIngredients.includes('후추')) ||
        (seasoning.soy && commonIngredients.includes('간장')) ||
        (seasoning.redpepperpowder && commonIngredients.includes('고추가루')) ||
        (seasoning.gochujang && commonIngredients.includes('고추장'))
      );
    });

    setFilteredRecipes(filtered);
  };


  return (
    <div style={{ marginTop: '40px' }}>
      <Table responsive className="category_table">
        <thead>
          <tr>
            <td colSpan="7" style={{ backgroundColor: '#ffd900a6', fontSize: '23px', textAlign: 'center'}}>
              재료를 골라주세요
              <RxEraser onClick={handleCheckboxReset} style={{display: 'inline-block', verticalAlign: 'middle', marginLeft: '5px', fontSize: '35', cursor: 'pointer' }}/>
            </td>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: '#f5c90618', fontSize: '20px' }}>
          <tr>
            <td>육류</td>
            <td>돼지고기
              <input
                type="checkbox"
                checked={checkboxes.meet.pork}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('meet', 'pork')}
              />{' '}
            </td>
            <td>소고기
              <input
                type="checkbox"
                checked={checkboxes.meet.beef}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('meet', 'beef')}
              />{' '}
            </td>
            <td>닭고기
              <input
                type="checkbox"
                checked={checkboxes.meet.chicken}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('meet', 'chicken')}
              />{' '}
            </td>
            <td>양고기
              <input
                type="checkbox"
                checked={checkboxes.meet.lamb}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('meet', 'lamb')}
              />{' '}
            </td>
            <td>오리고기
              <input
                type="checkbox"
                checked={checkboxes.meet.duck}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('meet', 'duck')}
              />{' '}
            </td>
            <td>계란
              <input
                type="checkbox"
                checked={checkboxes.meet.egg}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('meet', 'egg')}
              />{' '}
            </td>
          </tr>

          <tr>
            <td>해산물</td>
            <td>연어
              <input
                type="checkbox"
                checked={checkboxes.seefood.salmon}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('seefood', 'salmon')}
              />{' '}
            </td>
            <td>고등어
              <input
                type="checkbox"
                checked={checkboxes.seefood.mackerel}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('seefood', 'mackerel')}
              />{' '}
            </td>
            <td>오징어
              <input
                type="checkbox"
                checked={checkboxes.seefood.squid}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('seefood', 'squid')}
              />{' '}
            </td>
            <td>문어
              <input
                type="checkbox"
                checked={checkboxes.seefood.octopus}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('seefood', 'octopus')}
              />{' '}
            </td>
            <td>새우
              <input
                type="checkbox"
                checked={checkboxes.seefood.shrimp}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('seefood', 'shrimp')}
              />{' '}
            </td>
            <td>조개
              <input
                type="checkbox"
                checked={checkboxes.seefood.clam}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('seefood', 'clam')}
              />{' '}
            </td>
          </tr>
          
          <tr>
            <td>채소류</td>
            <td>양파
              <input
                type="checkbox"
                checked={checkboxes.vegetable.onion}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('vegetable', 'onion')}
              />{' '}
            </td>
            <td>마늘
              <input
                type="checkbox"
                checked={checkboxes.vegetable.garlic}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('vegetable', 'garlic')}
              />{' '}
            </td>
            <td>당근
              <input
                type="checkbox"
                checked={checkboxes.vegetable.carrot}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('vegetable', 'carrot')}
              />{' '}
            </td>
            <td>오이
              <input
                type="checkbox"
                checked={checkboxes.vegetable.cucumber}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('vegetable', 'cucumber')}
              />{' '}
            </td>
            <td>피망
              <input
                type="checkbox"
                checked={checkboxes.vegetable.pepper}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('vegetable', 'pepper')}
              />{' '}
            </td>
            <td>배추
              <input
                type="checkbox"
                checked={checkboxes.vegetable.cabbage}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('vegetable', 'cabbage')}
              />{' '}
            </td>
          </tr>
      
          <tr>
            <td>조미료</td>
            <td>설탕
              <input
                type="checkbox"
                checked={checkboxes.seasoning.sugar}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('seasoning', 'sugar')}
              />{' '}
            </td>
            <td>소금
              <input
                type="checkbox"
                checked={checkboxes.seasoning.salt}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('seasoning', 'salt')}
              />{' '}
            </td>
            <td>후추
              <input
                type="checkbox"
                checked={checkboxes.seasoning.blackpepper}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('seasoning', 'blackpepper')}
              />{' '}
            </td>
            <td>간장
              <input
                type="checkbox"
                checked={checkboxes.seasoning.soy}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('seasoning', 'soy')}
              />{' '}
            </td>
            <td>고추가루
              <input
                type="checkbox"
                checked={checkboxes.seasoning.redpepperpowder}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('seasoning', 'redpepperpowder')}
              />{' '}
            </td>
            <td>고추장
              <input
                type="checkbox"
                checked={checkboxes.seasoning.gochujang}
                style={{marginLeft: '10px'}}
                onChange={() => handleCheckboxChange('seasoning', 'gochujang')}
              />{' '}
            </td>
          </tr>
        </tbody>
      </Table>

      <div style={{marginTop:"-30px"}}>
        <div className="row">
          {filteredRecipes.map(item => (
            <FindCards key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;