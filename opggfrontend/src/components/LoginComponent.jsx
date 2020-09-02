import React, {Component} from "react";
import bimage from "../../data/background/background.jpg";
import {Button, Form, ButtonGroup, Modal, ListGroup} from "react-bootstrap";
import axios from "axios";

import "./Login.css";
import Match from "./MatchComponent";
import config from "../Config/server.json";

class Login extends Component {
    state = {
        user_data: [],
        match_list: [],
        username_ref: React.createRef(),
        password_ref: React.createRef(),
        email_ref: React.createRef(),
        isLogin: true,
        isUserPage: false,
        isShowModal: false,
        return_message: "",
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
                <Match data={this.state.match_list}/>
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
        if (this.state.isUserPage) {
            return (
                <ListGroup>
                    <ListGroup.Item className="userpage">
                        Welcome
                    </ListGroup.Item>
                </ListGroup>)
        } else {
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

    }

    getLogin() {
        const login = (
            <Form onSubmit={this.handleLogin} className="login-block">
                <Form.Group controlId="Username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Username" ref={this.state.username_ref}/>
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
        return login;
    }

    getRegister() {
        const register = (
            <Form onSubmit={this.handleRegister} className="login-block">
                <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="Email" ref={this.state.email_ref}/>
                </Form.Group>
                <Form.Group controlId="Username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Username" ref={this.state.username_ref}/>
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
            <Modal show={this.state.isShowModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Hello asshole:)</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.state.message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    getUserPage() {
        const user = (
            <ListGroup as="ul">
                {this.state.user_data.map(value => <ListGroup.Item as="li" key={value} action
                                                                   onClick={this.alterAccount(value)}>{value}</ListGroup.Item>)}
            </ListGroup>
        )
        return user;
    }

    alterAccount(accountId){

    }

    handleLogin = async (event) => {
        event.preventDefault()
        let url = config["server"] + config["login"];
        let params = new URLSearchParams();

        params.append("username", this.state.username_ref.current.value);
        params.append("password", this.state.password_ref.current.value);

        let response = await axios.post(url, params);
        console.log(response.data);

        if (response.data.result === "success") {
            console.log("success")
            this.setState({
                isShowModal: true,
                isUserPage: true,
                message: response.data.message,
                user_data: response.data.data
            });
        } else {
            this.setState({isShowModal: true, isUserPage: false, message: response.data.message});
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
            this.setState(({isShowModal: true, message: response.data.message}))
        } else {
            this.setState(({isShowModal: true, message: response.data.message}))
        }
    };

    handleSwitch = event => {
        if (this.state.isLogin === true) {
            this.setState({isLogin: false});
        } else {
            this.setState({isLogin: true});
        }
    };

    handleClose = event => {
        this.setState({isShowModal: false})
        console.log(this.state)
    };
}

export default Login;
