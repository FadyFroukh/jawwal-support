import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import styles from '../../styles/utils.module.css';

const RoundItems = ({items,setItems}) => {

    const [value,setValue] = useState("");

    const handleAdd = (e)=>{
        if (e.key === 'Enter' || e.keyCode === 13) {
            setItems(items=>[...items,e.target.value.trim()]);
            e.target.value = '';
            setValue("");
        }
    };

    const handleRemoveItem = (itm)=>{
        setItems(items.filter(item=>item !== itm))
    };

  return (
    <>
        <div className="card flex justify-content-center mb-3">
        <InputTextarea 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            rows={1} 
            onKeyUp={(e)=>handleAdd(e)}
            placeholder="Enter a Skill then Press Enter"
        />            
        </div>
        <div className={`${styles.round_items} ${styles.flex}`}>
            {
                items.length === 0 ? <strong>No Steps Yet</strong> : 
                items.map((item,index)=>(
                    <p key={index} className={`${styles.round_item} ${styles.flex_col} ${styles.items_center}`}>
                        <span className={`${styles.item_header}`}>
                            <i className="pi pi-times" onClick={()=>handleRemoveItem(item)}></i>
                        </span>
                        <span>
                            {item}
                        </span>
                    </p>
                ))
            }
        </div>
    </>
  )
}

export default RoundItems
