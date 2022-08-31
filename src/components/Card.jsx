import React from 'react'

function Card({pokemon}) {

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className='card'>
            <div className='name'>{capitalizeFirstLetter(pokemon.name)}</div>
            <img 
                className='img' 
                src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} 
                alt={pokemon.name} 
            />
        </div>
    )
}

export default Card