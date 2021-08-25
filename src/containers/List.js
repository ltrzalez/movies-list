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
        console.table(moviesJSON)

        if(moviesJSON){
            this.setState = {
                data: moviesJSON,
                loading: false
            }
        }
    }


    render() {
        const { data, loading } = this.state
        console.log(data)
        if(loading) {
            return <h1>Loading..</h1>
        }

        return data.map(el => {
            <Card key={el.id} movie={el} />
        })
    }
}

export default List;