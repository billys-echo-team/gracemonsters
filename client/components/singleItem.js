import React from 'react'
import {Link} from 'react-router-dom'
import {getSingleItemThunk} from '../store/itemsReducer'
import {addCartItemThunk} from '../store/cart'
import {connect} from 'react-redux'
import NotFound from './NotFound'

class singleItem extends React.Component {
  componentDidMount() {
    this.props.getSingleItemThunk(this.props.match.params.id)
  }

  // handleSubmit(event) {
  //   event.preventDefault()
  //   this.props.addCartItemThunk(this.props.match.params.id)
  // }
  render() {
    console.log(this.props, '------*******TEST MAN******-----------------')
    const item = this.props.items.find(
      oneItem => oneItem.id === Number(this.props.match.params.id)
    )
    return !item ? (
      <NotFound />
    ) : (
      <div key={item.id}>
        <div>
          <main>
            <h1>Name: {item.name}</h1>
            <h3>Element: {item.element}</h3>
            <p>Description: {item.description}</p>
            <p>Price: ${item.price}</p>
            <img className="single-school-pic" src={item.imageUrl} />
            <button
              type="submit"
              className="button-add-item"
              onClick={() => this.props.addCartItemThunk(item.id)}
            >
              Add to Cart
            </button>
          </main>
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
    getSingleItemThunk: id => {
      dispatch(getSingleItemThunk(id))
    },
    addCartItemThunk: id => {
      dispatch(addCartItemThunk(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(singleItem)
