import React from 'react'
import {
  getCartItemsThunk,
  deleteCartItemThunk,
  checkoutThunk
} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCartItemsThunk()
  }

  render() {
    console.log('******', this.props)
    // console.log('&&&&&', req.user)
    return (
      //   <h1>test</h1>
      <div className="cart-list">
        <h1>Cart</h1>
        <div className="column-display">
          {this.props.cart.map(item => (
            <div key={item.id}>
              <div className="item-button-container">
                <Link to={`items/${item.id}`} className="link">
                  <div className="item-box">
                    <img src={item.imageUrl} className="item-img" />
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">Price : {item.price}</div>
                    <div className="item-id">ITEM ID {item.id}</div>
                    <div className="item-qty">
                      Quantity: {item.order_item.quantity}
                    </div>
                  </div>
                </Link>
                <button
                  type="submit"
                  className="button-delete-item"
                  onClick={() => this.props.deleteCartItemThunk(item.id)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="cart-checkout"
          onClick={() => this.props.checkoutThunk(this.props.cart.id)}
        >
          Checkout
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {cart: state.cart}
}

const mapDispatchToProps = dispatch => {
  return {
    getCartItemsThunk: () => dispatch(getCartItemsThunk()),

    deleteCartItemThunk: id => dispatch(deleteCartItemThunk(id)),

    checkoutThunk: order => dispatch(checkoutThunk(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
