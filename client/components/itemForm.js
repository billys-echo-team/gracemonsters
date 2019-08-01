
import React from 'react';

const ItemForm = props => {
    let submitHandler = props.submitHandler;
    let changeHandler = props.changeHandler;
    let state = props.state;
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Item Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={changeHandler}
                    />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={state.description}
                        onChange={changeHandler}
                    />element
                </div>

                <div className="form-group">
                    <label>Element:</label>
                    <input
                        type="text"
                        name=""
                        value={state.element}
                        onChange={changeHandler}
                    />
                </div>

                <div className="form-group">
                    <label>Image:</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={state.imageUrl}
                        onChange={changeHandler}
                    />
                </div>

                <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={state.price}
                        onChange={changeHandler}
                    />
                </div>

                <div className="form-group">
                    <label>Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={state.stock}
                        onChange={changeHandler}
                    />
                </div>

                <div className="column-display">
                    <button type="submit" className="btn-submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ItemForm;