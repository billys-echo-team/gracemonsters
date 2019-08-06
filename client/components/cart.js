import React from 'react'
import {
  getCartItemsThunk,
  deleteCartItemThunk,
  checkoutThunk,
  newOrderThunk,
  addCartItemThunk,
  decrementQtyThunk
} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import history from '../history'
import Checkout from './checkout'

class Cart extends React.Component {
  handleSubmit() {}

  componentDidMount() {
    this.props.getCartItemsThunk()
  }

  render() {
    // console.log('******', this.props)
    if (this.props.cart.length > 0) {
      // console.log(this.props.cart.reduce((sum = 0, item) => {return 5}))
    }
    return (
      <div className="cart-list">
        <h1>Cart</h1>
        <div className="column-display">
          {this.props.cart.map(item => (
            <div key={item.id}>
              <div className="item-button-container">
                <div className="item-box">
                  <Link to={`shop/${item.id}`} className="link">
                    <img src={item.imageUrl} className="item-img" />
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">Price : ${item.price}</div>
                  </Link>
                </div>
                <span>
                  <button
                    type="submit"
                    className="nes-btn is-primary"
                    onClick={() =>
                      item.order_item.quantity === 1
                        ? this.props.deleteCartItemThunk(item)
                        : this.props.decrementQtyThunk(item)
                    }
                  >
                    -
                  </button>
                  <div className="item-qty">{item.order_item.quantity}</div>
                  <button
                    type="submit"
                    className="nes-btn is-primary"
                    onClick={() => this.props.addCartItemThunk(item)}
                  >
                    +
                  </button>
                </span>
                <button
                  type="submit"
                  className="button-delete-item"
                  onClick={() => this.props.deleteCartItemThunk(item)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          {this.props.cart.length > 0 ? (
            <div>
              <h1> Total: </h1>
              <button
                type="submit"
                className="cart-checkout"
                onClick={() => {
                  this.props.checkoutThunk(
                    this.props.cart[0].order_item.orderId
                  )

                  this.props.history.push('/checkout')
                }}
              >
                Checkout
              </button>
            </div>
          ) : (
            <h6>(Nothing in cart)</h6>
          )}
        </div>
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

    deleteCartItemThunk: item => dispatch(deleteCartItemThunk(item)),

    checkoutThunk: order => dispatch(checkoutThunk(order)),

    addCartItemThunk: item => dispatch(addCartItemThunk(item)),

    decrementQtyThunk: item => dispatch(decrementQtyThunk(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
