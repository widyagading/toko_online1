import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            id: "",
            name: "",
            username: "",
            password: "",
            repassword: "",
            role: "user",
            action: "insert",
            find: "",
            message: ""
        }
    }

    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    Save = (event) => {
        if (this.state.password === this.state.repassword) {
            event.preventDefault();
            // menampilkan proses loading
            // $("#loading").toast("show");
            // menutup form modal
            $("#modal_user").modal("hide");
            let url = "http://localhost/toko_online/public/user/save";
            let form = new FormData();
            form.append("action", this.state.action);
            form.append("id", this.state.id);
            form.append("name", this.state.name);
            form.append("username", this.state.username);
            form.append("password", this.state.password);
            form.append("repassword", this.state.repassword);
            form.append("role", this.state.role);
            axios.post(url, form)

                .then(response => {
                    // $("#loading").toast("hide");
                    this.setState({ message: response.data.message });
                    $("#message").toast("show");
                    window.location = "/login"
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else {
            alert("Password not match")
        }
    }



    render() {
        return (
            <div className="background">
                <div className="container">
                    <div className="col-md-6 mt-5 mx-auto">
                        <h5 className="h3 mb-3 font-weight-normal">Register</h5>
                        <form onSubmit={this.Save}>
                            <div className="form-group">
                                <label for="name">Name</label>
                                <input type="text" className="form-control" name="name" placeholder="Enter Name"
                                    value={this.state.name}
                                    onChange={this.bind}
                                />
                            </div>
                            <div className="form-group">
                                <label for="username">Username</label>
                                <input type="username" className="form-control" name="username" placeholder="Enter Username"
                                    value={this.state.username}
                                    onChange={this.bind}
                                />
                            </div>
                            <div className="form-group">
                                <label for="password">Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.bind}
                                />
                            </div>

                            <div className="form-group">
                                <label for="repassword">Repeat Password</label>
                                <input type="password" className="form-control" name="repassword" placeholder="Repeat Password"
                                    onChange={this.bind}
                                />
                            </div>

                            <div className="col-md-13 mb-6">
                                <button type="submit" className="btn btn-lg btn-primary btn-block">
                                    Register
                                </button>
                                <a href="/login">Already have an account?</a>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;