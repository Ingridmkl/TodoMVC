import { memo, useState, useCallback } from "react";
import classnames from "classnames";

import { Input } from "./input";

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM, DUPLICATE_ITEM, TOGGLE_PRIORITY } from "../constants";

export const Item = memo(function Item({ todo, dispatch, index }) {
    const [isWritable, setIsWritable] = useState(false);
    const { title, completed, id, important } = todo;

    const toggleItem = useCallback(() => dispatch({ type: TOGGLE_ITEM, payload: { id } }), [dispatch]);
    const removeItem = useCallback(() => dispatch({ type: REMOVE_ITEM, payload: { id } }), [dispatch]);
    const updateItem = useCallback((id, title) => dispatch({ type: UPDATE_ITEM, payload: { id, title } }), [dispatch]);

    const duplicateItem = useCallback(() => dispatch({ type: DUPLICATE_ITEM, payload: { id } }), [dispatch, id]);
    const togglePriority = useCallback(() => dispatch({ type: TOGGLE_PRIORITY, payload: { id } }), [dispatch, id]);
    
    const handleDoubleClick = useCallback(() => {
        setIsWritable(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsWritable(false);
    }, []);

    const handleUpdate = useCallback(
        (title) => {
            if (title.length === 0)
                removeItem(id);
            else
                updateItem(id, title);

            setIsWritable(false);
        },
        [id, removeItem, updateItem]
    );

    return (
        <li className={classnames({ completed: todo.completed })} data-testid="todo-item">
            <div className="view">
                {isWritable ? (
                    <Input onSubmit={handleUpdate} label="Edit Todo Input" defaultValue={title} onBlur={handleBlur} />
                ) : (
                    <>
                        <input className="toggle" type="checkbox" data-testid="todo-item-toggle" checked={completed} onChange={toggleItem} />
                        <label data-testid="todo-item-label" onDoubleClick={handleDoubleClick}>
                            {title}
                            {important && <span style={{ color: 'red', marginLeft: '10px', fontWeight: 'bold' }}>(!)</span>}
                        </label>

                        {/* Priority Button (Star) */}
                        <button 
                            type="button"
                            style={{ position: 'absolute', right: '90px', top: '0', bottom: '0', margin: 'auto', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '20px', color: important ? 'gold' : 'gray' }}
                            onClick={togglePriority}
                            title="Toggle Priority"
                        >
                            {important ? '★' : '☆'}
                        </button>

                        {/* Duplicate Button (+) */}
                        <button 
                            type="button"
                            style={{ position: 'absolute', right: '50px', top: '0', bottom: '0', margin: 'auto', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '24px' }}
                            onClick={duplicateItem}
                            title="Duplicate Item"
                        >
                            +
                        </button>

                        <button className="destroy" data-testid="todo-item-button" onClick={removeItem} />
                    </>
                )}
            </div>
        </li>
    );
});
