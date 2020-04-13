import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Products extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            id: "",
            name: "",
            available_quantity: "0",
            price: "",
            description: "",
            image: "null",
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

    bindImage = (e) => {
        this.setState({image: e.target.files[0]})
    }

    Add = () => {
    // fungsi utk membuka form edit data
    // membuka modal
    $("#modal_products").modal("show");
    // mengosongkan data pada form
    this.setState({
        action: "insert",
        id: "",
        name: "",
        available_quantity: "",
        price: "",
        description: "",
        image: "null"
    });
    }
    Edit = (item) => {
        // membuka modal
        $("#modal_products").modal("show");
        // mengisikan data pd form
        this.setState({
            action: "update",
            id: item.id,
            name: item.name,
            available_quantity: item.available_quantity,
            price: item.price,
            description: item.description,
            image: item.image
        });
    }
    get_products = () => {
        $("#loading").toast("show");
        let url = "http://localhost/toko_online/public/products";
        axios.get(url)
        .then(response => {
            this.setState({products: response.data.products});
            $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
    }
    Drop = (id) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/products/drop/" + id;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({ message: response.data.message });
                $("#message").toast("show");
                this.get_products();
            })
            .catch(error => {
            console.log(error);
            });
        }
    }
    componentDidMount = () => {
        this.get_products();
    }
    Save = (event) => {
        event.preventDefault();
        // menampilkan proses loading
        $("#loading").toast("show");
        // menutup form modal
        $("#modal_products").modal("hide");
        let url = "http://localhost/toko_online/public/products/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id", this.state.id);
        form.append("name", this.state.name);
        form.append("available_quantity", this.state.available_quantity);
        form.append("price", this.state.price);
        form.append("description", this.state.description);
        form.append("image", this.state.image, this.state.image.name)
        axios.post(url, form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({ message: response.data.message });
            $("#message").toast("show");
            this.get_products();
        })
        .catch(error => {
        console.log(error);
        });
    }
    search = (event) => {
        if (event.keyCode === 13) {
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/products";
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({ products: response.data.products });
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
                                <h4 className="text-white">Data Produk</h4>
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
                                    <th>Nama</th>
                                    <th>Stok</th>
                                    <th>Harga</th>
                                    <th>Deskripsi</th>
                                    <th>Gambar</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.products.map((item) => {
                                    return(
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.available_quantity}</td>
                                            <td>{item.price}</td>
                                            <td>{item.description}</td>
                                            <td><img src={'http://localhost/toko_online/public/images/' + item.image} 
                                            alt={item.image} width="200px" height="200px"/></td>
                                            <td>
                                                <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                                    <span className="fa fa-edit"></span>
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger"
                                                onClick={() => this.Drop(item.id)}>
                                                    <span className="fa fa-trash"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {/* tombol tambah */}
                        <button className="btn btn-success my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span> Tambah Data
                        </button>
                        {/* form modal produk*/}
                        <Modal id="modal_products" title="Form Produk" bg_header="success" text_header="white">
                            <form onSubmit={this.Save}>
                                Nama
                                <input type="text" className="form-control" name="name" value={this.state.name}
                                onChange={this.bind} required />
                                Stok
                                <input type="number" className="form-control" name="available_quantity"
                                value={this.state.available_quantity} onChange={this.bind} required />
                                Harga
                                <input type="number" className="form-control" name="price"
                                value={this.state.price} onChange={this.bind} required />
                                Deskripsi
                                <input type="text" className="form-control" name="description" value={this.state.description}
                                onChange={this.bind} required />
                                image<input type="file" className="form-control" name="image"
                                onChange={this.bindImage} />

                                <button type="submit" className="btn btn-info pull-right m-2">
                                    <span className="fa fa-check"></span> Simpan
                                </button>
                            </form>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
    
}
export default Products;