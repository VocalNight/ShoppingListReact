import { useState } from "react";
import axios from 'axios';

export default function Item({shoppingItem, fetchData}) {
    const [item, setItem] = useState(shoppingItem);

    const changeState = event => {
        let newItem = {...item, isPickedUp: !item.isPickedUp, }
        
        console.log(item);
        console.log(newItem)
        axios.put('https://localhost:7125/shoppingItems/' + shoppingItem.id, newItem)
        .then(response => {
            setItem(newItem);
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
            <input
            checked={item.isPickedUp} 
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
