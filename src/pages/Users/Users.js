import './Users.scss';
import React, { useState, useEffect } from 'react';
import { GLOBALS } from '../../globals';
import PageLayoutComponent from '../../components/PageLayout/PageLayout';
import { Container } from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const UsersPage = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  });

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

      setUsers(usersMapTo(data));

    } catch(err) {
      console.log(err.message);
    }

  }

  const usersMapTo = (data) => {
    return data.map((elem) => ({
      id: elem.id,
      avatar: elem.smallAvatar,
      fullName: `${elem.firstName} ${elem.lastName}`,
      gender: elem.gender
    }));
  }

  const useStyles = makeStyles({
    tableRow: {
      cursor: 'pointer'
    } 
  });  

  const classes = useStyles();

  return (
    <>
      <Container>
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
                  <TableRow hover className={classes.tableRow} key={i}>
                    <TableCell component="th" scope="row">{user.fullName}</TableCell>
                    <TableCell>
                      <div className="avatar-container">
                        <Avatar src={user.avatar} />
                      </div>
                    </TableCell>
                    <TableCell align="center">{user.gender}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </PageLayoutComponent>
      </Container>
    </>
  )

}

export default UsersPage;