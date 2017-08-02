import React from 'react';

const Search = (props) => {
  return (
    <div>
      <div className="header">
        <form className="wrapper">
          <label htmlFor="zipCode">Search Weather by City or Zip Code</label>
          <input type="text" name="zipCode" defaultValue="" id="location" />
          <button type="button" name="button" id="locationSearch">Search</button>
        </form>
      </div>
      <div className="wrapper">
        <h1 className="location location-sm col-12-sm">{props.location.city}, {props.location.region}</h1>
      </div>
    </div>
  )
}

export default Search;
