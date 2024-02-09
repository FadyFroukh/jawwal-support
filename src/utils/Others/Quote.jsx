import { useEffect, useState } from "react";
import Loading from "./Loading"

const Quote = () => {
  const url = 'https://api.quotable.io/random'

  const [quote,setQuote] = useState("");

  useEffect(()=>{
    fetch(url).then(data=>data.json()).then(item=>{
      setQuote(item.content);
    });
  },[]);
  
  return (
    <div className={`quote mb-3`}>
        <small>
            <strong>
                {
                    quote === '' ? <Loading width='30px' height='10px'/> : quote
                }
            </strong>
        </small>
    </div>
  )
}

export default Quote
