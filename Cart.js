import React from 'react'
import { Link } from 'react-router-dom'
import { render } from 'react-dom';

export default class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carts: [],
            num: 0,
            total: 0,
        }
    }

    getCarts = () => {
        let items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        let total = 0
        let num = 0
        items.forEach(item => 
        {
            total += item.total
            num += item.qty
        });
        this.setState
        ({
            carts: items,
            num: num,
            total: total
        });
    }

    componentDidMount() {
        this.getCarts()
    }

    removeFromCart = (product) => {
        let carts = JSON.parse(localStorage.getItem('cart'));
        let cart = carts.filter(item => item.id_product !== product.id_product);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.getCarts()
    }

    clearCart = () => {
        localStorage.removeItem('cart');
        this.setState({carts: []});
    }

    render() {
        const { carts, num, total } = this.state;
        return(
            <div className="container">
                <hr />
                    <h3 className="card-title">Cart <span className="float-right fa fa-cart-plus badge badge-secondary"> {num} </span></h3>
                    <hr />
                    { !carts.length ? <h3 className="text-warning">No item on the cart </h3>:
                    <div className="card" style={{ marginBottom: "10px" }}>
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Subtotal</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carts.map((product, index) =>
                                    <tr ley={index}>
                                        <td>
                                            <h4 className="text-capitalize font-weight-bold">{product.name}</h4>
                                            <h6 className="card-text"><small>price: </small>Rp.{product.price}</h6>
                                        </td>
                                        <td>
                                            <h5>
                                                <span className="badge badge-secondary">{product.qty}</span>
                                            </h5>
                                        </td>
                                        <td>
                                            <h5>
                                                <span className="badge badge-secondary">Rp. {product.total}</span>
                                            </h5>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-warning"
                                            onClick={() => this.removeFromCart(product)}><span className="fa fa-trash"></span>Remove</button>
                                        </td>
                                    </tr>
                                    )}
                            </tbody>
                        </table>
                </div>
                    }
                    <hr />

                    { carts.length ?
                    <div><h3>
                        <small>Total Amount: </small>    
                        <span className="float-right badge badge-secondary">Rp. {total}</span>
                    </h3><hr /></div>: ''
                    }

                    <Link to="/checkout">
                        <button className="btn btn-succes float-right"><span className="fa fa-check-circle"></span>Checkout</button>
                    </Link>
                    <button className="btn btn-danger float-right" onClick={this.clearCart}
                    style={{ marginRight: "10px" }}><span classname="fa fa-trash"></span>Clear Cart</button><br/><br/><br/>

            </div>
        );
    }
}