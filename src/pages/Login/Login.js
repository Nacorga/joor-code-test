import './Login.scss';
import React, { useState } from 'react';
import { GLOBALS } from '../../globals';
import { Container, Row, Col } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  
  const [user, setUser] = useState("mock_user");
  const [password, setPassword] = useState("mock_password");

  const validateForm = () => {
    return user.length > 0 && password.length > 0;
  }

  const history = useHistory();

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      const res = await fetch(`${GLOBALS.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user, password})
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem('token', data.token);
      history.push("/users");

    } catch(err) {
      console.log(err.message);
    }

  }

  return (
    <>
      <div className="login">
          <Container>
            <Row className="justify-content-center">
              <Col md="6" lg="4">
                <div className="login__form">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        autoFocus
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateForm()}>Login</Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    </>
  )
}

export default LoginPage;