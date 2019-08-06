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
        <div className="nes-container is-rounded">
          <main>
            <h1>Name: {item.name}</h1>
            <h3>{item.element}</h3>
            <p>Description: {item.description}</p>
            <p>Price: ${item.price}</p>
            <img className="single-school-pic" src={item.imageUrl} />
            <br />
            <button
              type="submit"
              className="nes-btn is-success"
              onClick={history.back}
            >
              back
            </button>
            <button
              type="submit"
              className="nes-btn is-success"
              onClick={() => this.props.addCartItemThunk(item)}
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
    addCartItemThunk: item => {
      dispatch(addCartItemThunk(item))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(singleItem)
