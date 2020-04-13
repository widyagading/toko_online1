import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Orders extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            id_order: "",
            id: "",
            id_alamat: "0",
            total: "",
            bukti_bayar: "",
            status: "",
            action: "",
            find: "",
            message: ""
        }

        //jika tidak terdapat data token pada local storage
        if(!localStorage.getItem("Token")){
            //direct ke hlaman login
            window.location = "/login";
        }
    }
    bind = (event) => {
    // fungsi utk membuka form tambah data
    this.setState({ [event.target.name]: event.target.value });
    }

    
    get_orders = () => {
        $("#loading").toast("show");
        let url = "http://localhost/toko_online/public/cart";
        axios.get(url)
        .then(response => {
            this.setState({orders: response.data.orders});
            $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
    }
    Drop = (id_order) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/orders/drop/" + id_order;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({ message: response.data.message });
                $("#message").toast("show");
                this.get_orders();
            })
            .catch(error => {
            console.log(error);
            });
        }
    }
    componentDidMount = () => {
        this.get_orders();
    }
    search = (event) => {
        if (event.keyCode === 13) {
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/orders";
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({ orders: response.data.orders });
            })
            .catch(error => {
            console.log(error);
            });
        }
    }
    render() {
        return (
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-success">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Orderan</h4>
                            </div>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="find"
                                onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                                placeholder="Pencarian..." />
                            </div>
                        </div>

                    </div>
                    {/* content card */}
                    <div className="card-body">
                        <Toast id="message" autohide="true" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <Toast id="loading" autohide="false" title="Informasi">
                            <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
                        </Toast>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Address</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Detail Order</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.orders.map((item) => {
                                    return(
                                        <tr key={item.id_order}>
                                            <td>{item.username}</td>
                                            <td>{item.id_alamat}</td>
                                            <td>{item.total}</td>
                                            <td>{item.bukti_bayar}</td>
                                            <td>
                                                <button className="m-1 btn btn-sm btn-info" onClick={() => this.Accept(item)}>
                                                    <span className="fa fa-ok"></span>
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger"
                                                onClick={() => this.Drop(item.id_order)}>
                                                    <span className="fa fa-trash"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
    
}
export default Orders;