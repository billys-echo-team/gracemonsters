import React from 'react';
import { connect } from 'react-redux';
import ItemForm from './itemForm';
import { addItemThunk } from '../store/itemsReducer';

class AddItem extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      element: '',
      imageUrl: '',
      price: '',
      stock: '',
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    this.props.getCampuses();
  }

  changeHandler(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async submitHandler(event) {
    try {
      event.preventDefault();
      let newItem = { ...this.state };
      let newItemKeys = Object.keys(newItem);
      for (let key of newItemKeys) {
        if (!newItem[key] || newItem[key] === '0') {
          delete newItem[key];
        }
      }
      await this.props.addItem(newItem);
      this.setState({
        name: '',
        description: '',
        element: '',
        imageUrl: '',
        price: '',
        stock: '',
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h1>Add a new item</h1>
        <ItemForm
          submitHandler={this.submitHandler}
          changeHandler={this.changeHandler}
          state={this.state}
          //campuses={this.props.campuses}
          addItem={true}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addItem: newItem => dispatch(addItemThunk(newItem)),

});

const mapStateToProps = state => ({

  // campuses: state.campuses.campuses,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItem);