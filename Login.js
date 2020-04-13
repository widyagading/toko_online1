import React, { Component } from "react";
import axios from "axios";
import Toast from "../component/Toast";
import $ from "jquery";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      role: "",
      message: ""
    }
  } 
  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  } 
  Login = (event) => {
    event.preventDefault();
    let url = "http://localhost/toko_online/public/user/auth";
    let form = new FormData();
    form.append("username", this.state.username);
    form.append("password", this.state.password);
    axios.post(url, form) 
      .then(response => {
        let logged = response.data.status;
        let role = response.data.user.role
        if (logged) {
          this.setState({ message: "Login Berhasil" });
          // menyimpan data token pada local storage
          localStorage.setItem("Token", response.data.token);
          // menyimpan data login user ke local storage
          localStorage.setItem("id", JSON.stringify(response.data.user.id));
          localStorage.setItem("role", JSON.stringify(response.data.user.role));
          // direct ke halaman data produk
          if (role === "admin") 
          {
            window.location = "/products"
          }
          else 
          {
            window.location = "/client"
          }
        } else {
          this.setState({ message: "Login Gagal" });
        }
        $("#message").toast("show");
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {
    return (
      <div className="container" style={{ width: "50%" }}>
        <br /><br /><br /><br /><br /><br /><br />
        <div className="card my-2">
          <div className="card-header bg-dark">
            <h5 className="text-white">Login User</h5>
          </div>
          <div className="card-body">
            <Toast id="message" autohide="false" title="Informasi">
              {this.state.message}
            </Toast>
            <form onSubmit={this.Login}>
              <input
                type="text" className="form-control m-1" name="username"
                value={this.state.username} onChange={this.bind}
                required placeholder="Masukkan username" />
              <input
                type="password" className="form-control m-1" name="password"
                value={this.state.password} onChange={this.bind}
                required placeholder="Masukkan password" />
              {/* <div className="form-group">
                <label for="role">Role</label>
                <select class="form-control" name="role" value={this.state.value} onChange={this.bind} required>
                  <option></option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
              </div> */}
              <button className="mt-2 btn btn-block btn-info float-right" type="submit" style={{ width: "49%" }}>
                <span className="fa fa-sign-in"></span> Login
              </button>
              <Link className="mt-2 btn btn-block btn-danger float-left" style={{ width: "49%" }} to="/register">
                <span className="fa fa-sign-out"></span> Register
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;