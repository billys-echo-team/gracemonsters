import React from 'react'
import {Link} from 'react-router-dom'
import {getSingleItemThunk} from '../store/itemsReducer'
import {connect} from 'react-redux'
import NotFound from './NotFound'

class singleItem extends React.Component {
  componentDidMount() {
    this.props.getSingleItemThunk(this.props.match.params.id)
  }
  // handleSubmit(event) {
  //   event.preventDefault()
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
            <h1>{item.name}</h1>
            <h3>{item.element}</h3>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <img className="single-school-pic" src={item.imageUrl} />
            <button className="edit-btn" type="button">
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(singleItem)
