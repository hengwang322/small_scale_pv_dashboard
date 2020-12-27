import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import postcode from '../data/postcode.json';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const cardStyle = {
  padding: "16px 8px 8px 8px",
  zIndex: 2,
  position: 'absolute',
  top: "10px",
  borderRadius: '10px',
  display: 'flex'
};

const defaultFilterOptions = createFilterOptions();

const filterOptions = (options, state) => {
  return defaultFilterOptions(options, state).slice(0, 50);
};

export default function SearchBar(props) {
  return (
    <Card style={cardStyle}>
      <Autocomplete
        value={props.value}
        style={{ width: '280px' }}
        fullWidth
        id="search-bar"
        options={postcode}
        getOptionLabel={option => option.postcode !== "all" ? `${option.suburb} (${option.postcode})` : ""}
        renderOption={(option) =>
          option !== {} ?
            <>{option.suburb}{'\u00A0'}
              <span style={{ color: "grey" }}>{option.postcode}</span></>
            : <></>
        }
        noOptionsText={'Cannot find suburb/postcode'}
        filterOptions={filterOptions}
        renderInput={(params) =>
          <TextField
            {...params}
            label="Search for suburb/postcode..."
            variant="outlined"
          />}
        onChange={(_e, value) => { props.onSelectArea(value ? value : null) }}
      />
      <Select
        style={{ width: '120px', margin: '10px', paddingLeft: '10px' }}
        value={props.isInstall}
        onChange={props.onChange}
      >
        <MenuItem value={true}>Installs</MenuItem>
        <MenuItem value={false}>Output</MenuItem>
      </Select>
    </Card >
  );
};