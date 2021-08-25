import React from 'react'

export const Card = ({ movie }) => {
    return (<div>
        <h2>{`#${movie.ranking} - ${movie.title} (${movie.year})`}</h2>
        <img src={movie.img.src} alt={movie.img.alt} width='200' />
        <p>{`Distributor: ${movie.distributor}`}</p>
        <p>{`Amount: ${movie.amount}`}</p>
    </div>)
}
