
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Item from './Components/Item';

function App() {
  const [data, setData] = useState([]);
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      console.log("hi");
      const response = await axios.get('https://localhost:7125/shoppingItems');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const AddItem = () => {
    axios.post('https://localhost:7125/shoppingItems', {name: itemName, IsPickedUp: false}).then(response => fetchData());
  }

  return (
    <>
    <h1>Shopping cart</h1>
    <div>
      <input 
      type='text' 
      value={itemName} 
      onChange={event => setItemName(event.target.value)}
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
      
      <Item key={item.id + "div"} shoppingItem={item} fetchData={() => fetchData()}/>
    ))}
  </ul>}
    </>
  );
}

export default App;
