import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Profil extends Component {
    constructor() {
        super();
        this.bind = this.bind.bind(this)
        this.bindImage = this.bindImage.bind(this)
        this.state = {
            user: [],
            id: "",
            username: "",
            password: "",
            name: "",
            role: "user",
            image: null,
            noktp: "",
            jkelamin: "",
            tglahir: "",
            nohp: 0,
            action: "",
            find: "",
            message: "",

            alamat: [],
            id_alamat: "",
            nama_penerima: "",
            kode_pos: "",
            kecamatan: "",
            kota: "",
            jalan: "",
            rt: "",
            rw: "",
        }
        if (!localStorage.getItem("Token")) {
            // direct ke halaman login 
            window.location = "/login";
        }
    }
    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    bindImage = (e) => {
        this.setState({ image: e.target.files[0] })
    }
    Edit = item => {
        // membuka modal
        $("#modal_user").modal("show");
        // mengisikan data pada form
        this.setState({
            action: "update",
            name: item.name,
            noktp: item.noktp,
            jkelamin: item.jkelamin,
            tglahir: item.tglahir,
            nohp: item.nohp,
            image: item.image
        });
    }
    get_user = () => {
        // $("#loading").toast("show");
        let id = JSON.parse(localStorage.getItem('id'))
        // console.log(items)
        let url = "http://localhost/toko_online/public/user/" + id;
        axios.get(url)
            .then(response => {
                // $("#loading").toast("hide");
                this.setState({
                    user: response.data.user,
                    id: id
                });
                // $("#message").toast("show");
            })
            .catch(error => {
                console.log(error);
            });
        // this.setState({
        // user: items,
        // id_user: item.id_user
        // });
    }

    get_alamat = () => {
        // $("#loading").toast("show");
        let id = JSON.parse(localStorage.getItem('id'))

        let url = "http://localhost/toko_online/alamat/"+id;
        axios.get(url)
        .then(response => {
            this.setState({
                alamat: response.data.alamat,
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    Add_alamat = () => {
        $("#modal_alamat").modal("show");
        this.setState({
            action: "insert",
            id_alamat: "",
            id: "",
            nama_penerima: "",
            kode_pos: "",
            kecamatan: "",
            kota: "",
            jalan: "",
            rt: "",
            rw: "",
        });
    }

    Edit_alamat = (item) => {
        $("#modal_alamat").modal("show");
        this.setState({
            action: "update",
            id_alamat: item.id_alamat,
            id: item.id,
            nama_penerima: item.nama_penerima,
            kode_pos: item.kode_pos,
            kecamatan: item.kecamatan,
            kota: item.kota,
            jalan: item.jalan,
            rt: item.rt,
            rw: item.rw,
        });
    }

    componentDidMount = () => {
        this.get_user();
    }

    Save = (event) => {
        console.log(this.state.image)
        event.preventDefault();
        // menampilkan proses loading
        // $("#loading").toast("show");
        // menutup form modal 
        $("#modal_user").modal("hide");
        let url = "http://localhost/toko_online/public/user/save_profil";
        let form = new FormData();
        form.append("id", this.state.id);
        form.append("name", this.state.name);
        form.append("noktp", this.state.noktp);
        form.append("jkelamin", this.state.jkelamin);
        form.append("tglahir", this.state.tglahir);
        form.append("nohp", this.state.nohp);
        form.append("image", this.state.image, this.state.image.name);
        axios.post(url, form)
            .then(response => {
                // $("#loading").toast("hide");  
                this.setState({
                    message: response.data.message
                });
                $("messasge").toast("show");
                this.get_user()                
            })
            .catch(error => {
                console.log(error);
            });
    }

    Save_alamat = (event) => {
        let id = JSON.parse(localStorage.getItem('id'))
        event.preventDefault();

        $("#modal_alamat").modal("hide");
        let url = "http://localhost/toko_online/alamat/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_alamat", this.state.id_alamat);
        form.append("id", this.state.id);
        form.append("nama_penerima", this.state.nama_penerima);
        form.append("kode_pos", this.state.kode_pos);
        form.append("kecamatan", this.state.kecamatan);
        form.append("kota", this.state.kota);
        form.append("jalan", this.state.jalan);
        form.append("rt", this.state.rt);
        form.append("rw", this.state.rw);
        // form.append("image", this.state.image, this.state.image.name );
        axios.post(url, form)

        .then(response => {
            this.setState({message: response.data.message});
            $("#message").toast("show");
            this.get_alamat();
        })
        .catch(error => {
            console.log(error);
        });

    }

    Drop_alamat = (id_alamat) => {
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            let url = "http://localhost/toko_online/public/alamat/drop/"+id_alamat;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_alamat();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    render() {
        const { user, alamat } = this.state;
        return (
            <div className="container">
                <div className="card mt-2">
                    <div style={{ paddingTop: "5%", paddingLeft: "7%" }}>
                        <div className="#" style={{ maxwidth: "200px" }}>
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    {user.map((item, index) => {
                                        return (
                                            <ul class="list-group" key={index}>
                                                <img className="rounded float-left" src={'http://localhost/toko_online/public/images/' + item.image} style={{ height: "300px", width: "200px" }} />
                                            </ul>
                                        )
                                    })}

                                </div>
                                <div style={{ paddingLeft: "0%" }}>
                                    <div className="card-body">
                                        <h4 className="card-title" style={{ fontWeight: "700" }}>Profile</h4>
                                        <table className="table table-borderless">
                                            {user.map((item, index) => {
                                                return (
                                                    <ul class="list-group" key={index}>
                                                        <li class="list-group-item">Username : {item.username}</li>
                                                        <li class="list-group-item">Nama Lengkap : {item.name}</li>
                                                        <li class="list-group-item">Jenis Kelamin : {item.jkelamin}</li>
                                                        <li class="list-group-item">Tanggal Lahir : {item.tglahir}</li>
                                                        <li class="list-group-item">No Hp : {item.nohp}</li>
                                                        <button className="m-1 btn btn-info btn float-right" onClick={() => this.Edit(item)}>
                                                            <span className="fa fa-edit"> Edit</span>
                                                        </button>
                                                    </ul>
                                                );
                                            })}
                                            <h4 className="card-title" style={{ fontWeight: "700" }}>Data Alamat </h4>
                                            <li className="list-group-item"> <textarea className="text-secondary" cols="50" rows="5">Isi Alamat </textarea></li>
                                            <button type="submit" className="btn btn-success pull-right m-2">
                                                <span className="fa fa-check"></span> Simpan
                                            </button>
                                        </table>
                                    </div>
                                </div>
                                <Modal id="modal_user" title="Form User" bg_header="success"
                                    text_header="white">
                                    <form onSubmit={this.Save}>
                                        Nama Lengkap
                                            <input type="text" className="form-control" name="name"
                                            value={this.state.name} onChange={this.bind} required />

                                        <div className="form-group">
                                            <label for="kelamin">Jenis Kelamin</label>
                                            <select class="form-control" name="jkelamin" value={this.state.jkelamin} onChange={this.bind} required>
                                                <option value=" "> </option>
                                                <option value="Pria">Pria</option>
                                                <option value="Wanita">Wanita</option>
                                            </select>
                                        </div>
                                        Tanggal Lahir
                                            <input type="date" className="form-control" name="tglahir"
                                            value={this.state.tglahir} onChange={this.bind} required />
                                        No HP
                                            <input type="number" className="form-control" name="nohp"
                                            value={this.state.nohp} onChange={this.bind} required />
                                        Image
                                             <input type="file" className="form-control" name="image"
                                            onChange={this.bindImage}
                                        />
                                        <button type="submit" className="btn btn-success pull-right m-2">
                                            <span className="fa fa-check"></span> Simpan
                                            </button>
                                    </form>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mt-2">
                    {this.state.alamat.map((item) => {
                        return(
                            <div class="col-sm-6">
                            <div class="card" style={{ marginBottom: "20px" }}>
                            <div class="card-header text-white bg-info" style={{textAlign: "center"}}>
                                {item.id_alamat}
                            </div>
                            <div class="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Nama penerima : {item.nama_penerima} </li>
                                    <li className="list-group-item">Kode pos : {item.kode_pos} </li>
                                    <li className="list-group-item">Kecamatan : {item.kecamatan} </li>
                                    <li className="list-group-item">Kota : {item.kota} </li>
                                    <li className="list-group-item">Jalan : {item.jalan} </li>
                                    <li className="list-group-item">RT : {item.rt} </li>
                                    <li className="list-group-item">RW : {item.rw} </li>
                                    <li className="list-group-item">
                                        <button className="m-1 btn btn-sm btn-outline-success" onClick={() => this.Edit_alamat(item)}>
                                            <span className="fa fa-edit">Edit</span>
                                        </button>
                                        <button className="m-1 btn btn-sm btn-outline-danger" onClick={() =>this.Drop_alamat(item.id_alamat)}>
                                            <span className="fa fa-trash"></span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        
                </div>
            </div>
            );
        })}
            </div>
            <Modal id="modal_alamat" title="Form Alamat" bg_header="success" text_header="white">
                <form onSubmit={this.Save_alamat}>
                Nama Penerima 
                <input type="text" className="form-control" name="nama_penerima"
                 value={this.state.nama_penerima} onChange={this.bind} required />
                Kode Pos
                <input type="text" className="form-control" name="kode_pos"
                 value={this.state.kode_pos} onChange={this.bind} required />
                Kecamatan 
                <input type="text" className="form-control" name="kecamatan"
                 value={this.state.kecamatan} onChange={this.bind} required />
                Kota
                <input type="text" className="form-control" name="kota"
                 value={this.state.kota} onChange={this.bind} required />
                Jalan
                <input type="text" className="form-control" name="jalan"
                 value={this.state.jalan} onChange={this.bind} required />
                RT
                <input type="text" className="form-control" name="rt"
                 value={this.state.rt} onChange={this.bind} required />
                RW
                <input type="text" className="form-control" name="rw"
                 value={this.state.nama_rw} onChange={this.bind} required />

                <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Simpan 
                </button>
                </form>
            </Modal>
            </div>
        )
    }
}
export default Profil;
