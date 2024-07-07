import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

export default function search({ onSubmit, search , onSearchChange}) {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
         onSubmit(event);
        }
      };
  return (

    <Paper
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 ,margin: 'auto' }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search "
        inputProps={{ 'aria-label': 'search ' }}
        value={search}
        onChange={onSearchChange}
        onKeyPress={handleKeyPress}
      
      />
      <IconButton type="button" onClick={onSubmit} sx={{ p: '10px' }} aria-label="search">
        <SearchIcon    />
      </IconButton>

    </Paper>

  );
}
search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};