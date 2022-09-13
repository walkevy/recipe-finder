// react hooks
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

// styles
import './Create.css';

export default function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const history = useHistory();

  const ingredientInput = useRef(null);

  const { postData, data, error } = useFetch('http://localhost:3000/recipes', 'POST');

  // redirect user to home page once they submit
  useEffect(() => {
    if (data && !data.length) {
      console.log("submit");
      history.push('/');
    }
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault();

    postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' });
  }

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, ing]);
    }

    setNewIngredient('');
    ingredientInput.current.focus();

  }

  return (
    <div className='create'>
      <h2 className='page-title'>Add a new recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title: </span>
          <input 
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className='ingredients'>
            <input 
              type='text' 
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button type='button' 
              className='btn'
              onClick={handleAdd}>Add</button>
          </div>
        </label>

        <p>Current Ingredients: {ingredients.map((ingredient) => (
            <em key={ingredient}>{ingredient}, </em>
          ))}
        </p>

        <label>
          <span>Recipe Method: </span>
          <textarea 
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking Time (minutes): </span>
          <input 
            type='number'
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className='button'>Submit</button>

      </form>
    </div>
  )
}
