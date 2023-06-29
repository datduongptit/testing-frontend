/* eslint-disable no-unused-vars */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  };
}

const AddUserAssign = ({ listUsers, usersAssigned }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const filteredUsers = listUsers.filter((user) => !usersAssigned.some((assignedUser) => assignedUser.id === user.id));
  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const convertIdToUsername = (id) => listUsers.filter((user) => user.id === id)[0].username;

  const handleAddUser = async () => {
    const listUserAssigned = usersAssigned.map((item) => item.id);
    const listSubmit = listUserAssigned.concat(personName);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" startIcon={<AddCircleIcon />} onClick={handleOpen}>
        Add user assignment
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">List users</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="List users" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={convertIdToUsername(value)} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {filteredUsers.map((user, index) => (
                  <MenuItem key={index} value={user?.id} style={getStyles(user?.username, personName, theme)}>
                    {user?.username}
                  </MenuItem>
                ))}
              </Select>
              <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="small"
                  onClick={() => (personName.length ? handleAddUser() : console.log('Not include users'))}
                  disabled={!personName.length}
                >
                  Add user
                </Button>
              </div>
              <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
                <Button fullWidth variant="outlined" size="small" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </FormControl>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

AddUserAssign.propTypes = {
  listUsers: PropTypes.array,
  usersAssigned: PropTypes.array
};

export default AddUserAssign;
