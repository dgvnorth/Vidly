import React from 'react';

const ListGroup = (props) => {
    const { items, textProperty, valueProperty, selectedItem, onItemSelect } = props;

    return (
        // <ul className="list-group list-group-horizontal">
        //     {items.map(item => <li
        //         onClick={() => onItemSelect(item)}
        //         key={item[valueProperty]}
        //         className={item === selectedItem ? 'list-group-item active' : 'list-group-item'}>{item[textProperty]}</li>)}
        // </ul>
        <div className="btn-group" role="group" aria-label="Basic example">
            {items.map(item =>
                <button
                    onClick={() => onItemSelect(item)}
                    key={item[valueProperty]}
                    type="button"
                    style={{ marginBottom: 20 }}
                    className="btn btn-secondary">{item[textProperty]}</button>)}
        </div>
    )
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}

export default ListGroup;