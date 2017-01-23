import React from 'react';

const SearchBar = (props) => {

  const handleChange = props.handleChange;
  const inputValue = props.inputValue;

  return (
    <form className='form-group' style={{marginTop: '20px'}}>
      <input
        onChange={handleChange}
        value={inputValue}
        className='form-control'
        placeholder="Search For An Event"
      />
    </form>
  )
};

export default SearchBar;
