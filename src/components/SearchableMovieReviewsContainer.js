import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'olIScTgOcvqG3l0OGGfuq0eZgXtAMcDa';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;

// Code SearchableMovieReviewsContainer Here

class SearchableMovieReviewsContainer extends React.Component{

   state = {
       searchTerm: '',
       reviews: []
   };

   handleSubmit = event => {
        event.preventDefault();

        fetch(URL.concat(this.state.searchTerm))
            .then((response) => response.json())
            .then((response) => this.setState({reviews: response.results}));
   }

   handleSearchInputChange = () => {
        this.setState({searchTerm: event.target.value});
   }

    render(){
        return (
            <div className="searchable-movie-reviews">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='search-input'>Search for Movie Reviews</label>
                    <input 
                        id="search-input" 
                        type="text"
                        style={{ width: 300}}
                        onChange={this.handleSearchInputChange}
                    />
                    <button type="submit">Submit</button> 
                </form>
                {typeof this.state.reviews === 'object' &&
                    this.state.reviews.length > 0 && <h2>Movie Review By Search:</h2>}
                <MovieReviews reviews={this.state.reviews} />
            </div>
        )
    }
}

export default SearchableMovieReviewsContainer;