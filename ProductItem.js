import React from 'react';

export default class ProductItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            total: 0
        }
    }

    bind = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addToCart = (item) => {
        let oldItems = JSON.parse(localStorage.getItem('cart')) || []
        let newid = item.id_product
        let match = oldItems.find(({ id_product }) => id_product === newid);
        if (match) {
            match['qty'] += parseInt(this.state.quantity);
            match['total'] = match['total'] + (item.price * parseInt(this.state.quantity));
        }
        else {
            let newItem = {
                'id_product': item.id_product,
                'name': item.name,
                'price': item.price,
                'qty': parseInt(this.state.quantity),
                'total': item.price * parseInt(this.state.quantity)
            };
            oldItems.push(newItem);
        }
        localStorage.setItem('cart', JSON.stringify(oldItems));
    }

    render() {
        const { item } = this.props;
        return (
            <div className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100" style={{ marginBottom: "10px" }}>
                    <a href="#"><img className="card-img-top" src={'http://localhost/toko_online/public/images/' + item.image} alt="" /></a>
                    <div className="card-body">
                        <h4 className="card-title">
                            <a href="#">{item.name}</a>
                        </h4>
                        <h5>Rp. {item.price}</h5>
                        <p className="card-text">{item.description}</p>
                        <span className="card-text">
                            <small>Available Quantity: </small>{item.available_quantity}
                        </span>
                        {item.available_quantity > 0 ?
                            <div>
                                <button className="btn btn-sm btn-warning"
                                    onClick={() => this.addToCart(item)}>Add to cart</button>
                                <input type="number" value={this.state.quantity} name="quantity"
                                    onChange={this.bind} className="float-right"
                                    style={{ width: "60px", marginRight: "10px", borderRadius: "3px" }} />
                            </div> :
                            <p className="text-danger"> product is out of stock </p>
                        }
                    </div>
                </div>
            </div>
        )
    }

}
