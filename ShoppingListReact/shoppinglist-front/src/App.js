
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Item from './Components/Item';

function App() {
  const [data, setData] = useState([]);
  const [itemName, setItemName] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7125/shoppingItems');
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const AddItem = () => {

    if (itemName === '' || isInvalid === true) {
      return;
    }

    axios.post('https://localhost:7125/shoppingItems', { name: itemName, IsPickedUp: false }).then(response => fetchData());
  }

  function validateItem(event) {
    setItemName(event.target.value);
    setIsInvalid(
      data.some(({name}) => name.toUpperCase() === event.target.value.toUpperCase())
    );
  }

  return (
    <>
      <h1>Shopping cart</h1>
      <div>
        <input
          type='text'
          value={itemName}
          onChange={event => validateItem(event)}
          placeholder='Add item to cart...'></input>
        <button onClick={() => AddItem()}>Include</button>
      </div>

      {data.length == 0 &&
        <div>
          <h3>Cart is empty</h3>
        </div>}

      {data.length != 0 &&
        <ul>
          {data.map((item) => (
            <Item key={item.id + "div"} 
            shoppingItem={item} 
            fetchData={() => fetchData()} />
          ))}
        </ul>}
        <br></br>

        {isInvalid && 
          <div>
            <h2>An Item with that name already exists!</h2>
          </div>
        }
    </>
  );
}

export default App;
