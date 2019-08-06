// work by Edward. Mailny copy from Junior-Phase project. And match and replace from students to items

import React from 'react'
import {getItemsThunk, deleteItemThunk} from '../store/itemsReducer'
import {addCartItemThunk} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllItems extends React.Component {
  componentDidMount() {
    this.props.getItemsThunk()
  }

  render() {
    return (
      <div className="item-list">
        <h1>Items</h1>
        <div className="column-display">
          {this.props.items.map(item => (
            <div key={item.id}>
              <div className="item-button-container">
                <Link to={`/shop/${item.id}`} className="link">
                  <div className="item-box">
                    <img src={item.imageUrl} className="item-img" />
                    <div className="item-name">{item.name}</div>
                  </div>
                </Link>
                <button
                  type="submit"
                  className="nes-btn is-success"
                  onClick={() => this.props.addCartItemThunk(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getItemsThunk: () => {
      dispatch(getItemsThunk())
    },
    deleteItem: id => {
      dispatch(deleteItemThunk(id))
    },
    addCartItemThunk: item => {
      dispatch(addCartItemThunk(item))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
