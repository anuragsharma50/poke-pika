import React,{ useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Card from './components/Card';
import ReactPaginate from 'react-paginate';

function App() {

  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [pokename, setPokename] = useState()

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${page*60}&limit=60`).then((res) => {
      if(res.data != null){
        setData(res.data.results)
      }
      // console.log(res.data.results)
      }).catch(err => {
      console.log(err)
    })   
  }, [page])

  const handlePageClick = (e) => {
    console.log(e)
    setPage(e.selected)
  }

  const searchPokemon = (e) => {
    setPokename(e.target.value.toLowerCase())
  }

  return (
    <div className="App">
      <input className='input' type="text" value={pokename} onChange={searchPokemon} />
      
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

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={10}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default App;
