import React from 'react'
import {getCartItemsThunk} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCartItemsThunk()
  }

  render() {
    console.log('******', this.props.cart)
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
                  </div>
                </Link>
                {/* <button
                        type="submit"
                        className="button-delete-item"
                        onClick={() => this.props.deleteItem(item.id)}
                      >
                        X
                      </button> */}
              </div>
            </div>
          ))}
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
    getCartItemsThunk: () => {
      dispatch(getCartItemsThunk())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
