// work by Edward. Mailny copy from Junior-Phase project. And match and replace from students to items

import React from 'react'
import {getItemsThunk, deleteItemThunk} from '../store/itemsReducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllItems extends React.Component {
  componentDidMount() {
    this.props.getItemsThunk()
  }

  render() {
    console.log(this.props.items)
    return (
      <div className="item-list">
        <h1>Items</h1>
        <div className="column-display">
          {this.props.items.map(item => (
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
