import { useState } from "react";
import axios from 'axios';

export default function Item({shoppingItem, fetchData}) {
    const [item, setItem] = useState(shoppingItem);

    const changeState = event => {
        item.IsPickedUp = !item.IsPickedUp;
        
        axios.put('https://localhost:7125/shoppingItems/' + shoppingItem.id, shoppingItem)
        .then(response => {
            setItem(item);
            fetchData();
        });
    }

    const deleteItem = () => {
        axios.delete('https://localhost:7125/shoppingItems/' + shoppingItem.id)
        .then(response => fetchData());
    }

    if (shoppingItem) {
        return(
            <div >

            <li>{shoppingItem.name} 
            <input value={item.IsPickedUp} 
            onChange={() => changeState()} 
            type='checkbox'></input></li>   

            <button onClick={() => deleteItem()}>Delete</button>   
            </div> 
        );
    }

    return (
        <></>
    );

   
}
