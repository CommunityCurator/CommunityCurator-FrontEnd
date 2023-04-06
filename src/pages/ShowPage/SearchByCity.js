import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Modal from '@material-ui/core/Modal';
import Grid from '@mui/material/Grid';
import Cards from '../../components/Cards/Cards';
import { Link } from 'react-router-dom';

function SearchByCity() {
  const [city, setCity] = useState('');
  const [groupResults, setGroupResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCityChange = event => {
    setCity(event.target.value);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSearch = () => {
    fetch('http://localhost:8000/api/groups/'+city)
      .then(response => response.json())
      .then(data => {
        setGroupResults(data.group_city);
        console.log(data);
        setModalOpen(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <TextField
        type="search"
        style={{ width: '100%' }}
        label="Search Groups"
        id="outlined-basic"
        variant="outlined"
        value={city}
        onChange={handleCityChange}
      />
      <button onClick={handleSearch}>Search</button>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div style={{ backgroundColor: 'white', padding: '1rem' }}>
        <Grid style={{width: '80%', margin: '0px auto'}} container spacing={2}>
          {groupResults.length >0 ? groupResults.map((group) => {
            return (
            <>
            <Grid item xs={3} >
                <Link to={"/groups/" + group.id}>
                <Cards groupName={group.group_name} city={group.city} state={group.state}
                        image={group.image}/>
                </Link>
            </Grid>
            </>)
            }) : (
            <p>No groups found in {city}</p>
          )}
        </Grid>
        </div>
      </Modal>
    </div>
  );
}

export default SearchByCity;
