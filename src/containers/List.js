import React, { Component } from 'react';
import { Card } from '../components/card/Card';


class List extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            loading: true,
        }
    }

    async componentDidMount() {

        const fetchingMovies = await fetch("http://localhost:5000/movies")
        const moviesJSON = await fetchingMovies.json()

        if (moviesJSON) {
            this.setState({
                data: moviesJSON,
                loading: false
            })
        }
    }

    render() {
        const { data, loading } = this.state
        if(loading) {
            return <h1>Cargando</h1>
        } else {
            return( <>
                {data.map((movie) => {
                    return <Card key={movie.id} movie={movie} />
                })}
            </>)
        }
    }
}

export default List;