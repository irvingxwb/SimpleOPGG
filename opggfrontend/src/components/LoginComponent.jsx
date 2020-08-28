import React, { Component } from "react";
import bimage from "../../data/background/background.jpg";
import { Button, Form, ButtonGroup, Modal } from "react-bootstrap";
import axios from "axios";

import "./Login.css";
import Match from "./MatchComponent";
import config from "../Config/server.json";

class Login extends Component {
  state = {
    data: [],
    username_ref: React.createRef(),
    password_ref: React.createRef(),
    email_ref: React.createRef(),
    isLogin: true,
    isUserPage: false,
    isShowModal: false,
      return_message : "",
  };

  render() {
    const login = (
      <div>
        <div>{this.getTitle()}</div>
        <img src={bimage} className="bgimg" alt=""></img>
        <div className="text-block">
          {this.getOptionBar()}
          {this.getModal()}
          {this.state.isUserPage
            ? this.getUserPage()
            : this.state.isLogin
            ? this.getLogin()
            : this.getRegister()}
        </div>
        <Match />
      </div>
    );
    return login;
  }

  getTitle() {
    const title = (
      <div>
        <div className="bg bg-db1">XOP.GG</div>
        <div className="bg bg-db2">for League for Legends</div>
      </div>
    );
    return title;
  }

  getOptionBar() {
    return (
      <ButtonGroup>
        <Button className="option" onClick={this.handleSwitch}>
          Login
        </Button>
        <Button className="option" onClick={this.handleSwitch}>
          Register
        </Button>
      </ButtonGroup>
    );
  }

  getLogin() {
    const login = (
      <Form onSubmit={this.handleLogin} className="login-block">
        <Form.Group controlId="Username">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Username" ref={this.state.username_ref} />
        </Form.Group>
t
        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={this.state.password_ref}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="submit" className="submit">
          Submit
        </Button>
      </Form>
    );
    return login;
  }

  getRegister() {
    const register = (
      <Form onSubmit={this.handleRegister} className="login-block">
        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control placeholder="Email" ref={this.state.email_ref} />
        </Form.Group>
        <Form.Group controlId="Username">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Username" ref={this.state.username_ref} />
        </Form.Group>

        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={this.state.password_ref}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="submit" className="submit">
          Submit
        </Button>
      </Form>
    );
    return register;
  }

  getModal() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hello asshole:</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.state.return_message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  getUserPage() {
    const user = <div></div>;
    return user;
  }

  handleLogin = async () => {
    let url = config["server"] + config["login"];
    let params = new URLSearchParams();

    params.append("username", this.state.username_ref.current.value);
    params.append("password", this.state.password_ref.current.value);

    let response = await axios.post(url, params);
    console.log(response.data);

    if (response.data.result === "success") {
      this.setState({ isUserPage: true, message: response.data.message });
    } else {
      this.setState({ isShowModal: true, message: response.data.message });
    }
  };

  handleRegister = async () => {
    let url = config["server"] + config["register"];
    let params = new URLSearchParams();

    params.append("username", this.state.username_ref.current.value);
    params.append("password", this.state.password_ref.current.value);
    params.append("email", this.state.email_ref.current.value);

    let response = await axios.post(url, params);
    console.log(response.data);

    if (response.data.result === "success") {
        this.setState(({isLogin : true, isShowModal : true, message: response.data.message}))
    }
    else {
        this.setState(({isShowModal : true, message: response.data.message}))
    }
  };

  handleSwitch = () => {
    if (this.state.isLogin === true) {
      this.setState({ isLogin: false });
    } else {
      this.setState({ isLogin: true });
    }
  };

  handleClose = () => {
    this.setState({ isShow: false });
  };
}

export default Login;
