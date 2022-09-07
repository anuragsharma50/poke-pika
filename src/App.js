import React,{ useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Card from './components/Card';

function App() {

  const [data, setData] = useState([])
  const [limit, setLimit] = useState(0)
  const [pokename, setPokename] = useState()
  let scrolling = false;

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${limit}&limit=10`).then((res) => {
      if(res.data != null){
        let result = res.data.results

        setData([...data,...result])
      }
      }).catch(err => {
      console.log(err)
    }) 

    window.addEventListener('scroll',() => {
      scrolling = true;
    })

    setInterval(() => {
      if (scrolling) {
        scrolling = false;
        let scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100

        if(scrollPercentage > 90) {
          setLimit(limit => limit + 10)
        }
      }
    },400);

  }, [limit])

  const searchPokemon = (e) => {
    if(e.target.value === 'load'){
      setPokename('')
      setLimit(limit => limit + 10)
    } else{
      setPokename(e.target.value.toLowerCase())
    }
  }

  return (
    <div className="App">
      <div className='searchContainer'>
        <input className='input' type="text" value={pokename} onChange={searchPokemon} />
      </div>

      <div className='cards'>
        {
          data && data.map((item) => {
            return (
              <div key={item.name}>
                {pokename == null ? <Card pokemon={item} /> : item.name.includes(pokename) && <Card pokemon={item} />}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
