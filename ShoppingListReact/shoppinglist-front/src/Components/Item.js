import { useEffect, useState } from "react";
import axios from 'axios';

export default function Item({shoppingItem, fetchData}) {
    const [item, setItem] = useState(shoppingItem);
    const [lineClass, setLineClass] = useState('');

    useEffect(() => {
        validateCheckbox(shoppingItem.isPickedUp);
      }, []);

    const validateCheckbox = (isDashed) => {
        if(isDashed) {
            setLineClass('checkboxLined');
        } else {
            setLineClass('');
        }
    }

    const changeState = (event) => {
        let newItem = {...item, isPickedUp: !item.isPickedUp, }

        validateCheckbox(newItem.isPickedUp);

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

            <li className={lineClass}>{shoppingItem.name} 
            <input
            checked={item.isPickedUp} 
            onChange={(e) => changeState(e)} 
            type='checkbox'></input></li>   

            <button onClick={() => deleteItem()}>Delete</button>   
            </div> 
        );
    }

    return (
        <></>
    );

   
}
