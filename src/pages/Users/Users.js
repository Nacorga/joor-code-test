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

const UsersPage = () => {

  const [users, setUsers] = useState([]);

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

    } catch(err) {
      console.log(err.message);
    }

  }

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

  return (
    <>
      <PageLayoutComponent title={`Users list (${users.length})`}>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Avatar</TableCell>
                <TableCell align="center">Gender</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PageLayoutComponent>
    </>
  )

}

export default UsersPage;