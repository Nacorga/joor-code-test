import './Users.scss';
import React, { useState, useEffect } from 'react';
import { GLOBALS } from '../../globals';
import PageLayoutComponent from '../../components/PageLayout/PageLayout';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const UsersPage = () => {

  const [users, setUsers] = useState([]);
  const [memoUsers, setMemoUsers] = useState([]);
  const [showFilterValue, setShowFilterValue] = useState('all');
  const currentFavUsers = localStorage.getItem('favorites') ? [...JSON.parse(localStorage.getItem('favorites'))] : [];
  const history = useHistory();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {

    try {

      const res = await fetch(`${GLOBALS.apiUrl}/getUsers`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authentication': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        }
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      
      setUsers(data);
      setMemoUsers(data);

    } catch(err) {
      alert(err.message);
    }

  }

  const isFavorite = (userId) => currentFavUsers.find((elem) => elem === userId) ? true : false;

  const navToUser = (user) => {
    history.push({
      pathname: `/user/${user.id}`,
      state: { user }
    })
  }

  const useStyles = makeStyles({
    tableRow: {
      cursor: 'pointer'
    }
  });  

  const classes = useStyles();

  const handleRadioChange = (event) => {

    const filterVal = event.target.value

    setShowFilterValue(filterVal);
    
    if (filterVal === 'all') {
      setUsers(memoUsers);
    }

    if (filterVal === 'favorites') {
      setUsers([...users.filter((elem) => currentFavUsers.indexOf(elem.id) !== -1)]);
    }

  };

  return (
    <>
      <PageLayoutComponent title={`Users list (${users.length})`}>
        <div className="users">
          <div className="users__filters">
            <FormControl component="fieldset">
              <FormLabel component="legend">Show users</FormLabel>
              <RadioGroup row value={showFilterValue} onChange={handleRadioChange}>
                <FormControlLabel value="all" control={<Radio color="primary" />} label="All" />
                <FormControlLabel value="favorites" control={<Radio color="primary" />} label="Favorites" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="users__table">
            <TableContainer component={Paper}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Avatar</TableCell>
                    <TableCell align="center">Gender</TableCell>
                    <TableCell align="center">Favorite</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, i) => (
                    <TableRow hover className={classes.tableRow} key={i} onClick={() => navToUser(user)}>
                      <TableCell component="th" scope="row">{user.firstName} {user.lastName}</TableCell>
                      <TableCell>
                        <div className="avatar-container">
                          <Avatar src={user.smallAvatar} />
                        </div>
                      </TableCell>
                      <TableCell align="center">{user.gender}</TableCell>
                      <TableCell align="center">
                        {
                          isFavorite(user.id) ? <StarIcon /> : <StarBorderIcon />
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        
        </div>
      </PageLayoutComponent>
    </>
  )

}

export default UsersPage;