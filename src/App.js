import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import './style.css';

const store = [...Array(50).keys()];

const STEP = 5;
export default function App() {
  const [itemsToPaginate, setItemsToPaginate] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [initialPostsSet, setInitialPostsSet] = useState(null);
  const start = useRef(null);
  useEffect(() => {
    setItemsToPaginate(store.slice(0, STEP).reverse());
    setInitialPostsSet(true);
  }, []);
  useEffect(() => {
    console.log('INITIAL POSTS SET CHANGED');
    console.log(itemsToPaginate);
    start.current = itemsToPaginate.length;
  }, [initialPostsSet]);
  const simulateNewItems = React.useCallback(() => {
    console.log(start.current);
    if (!start.current < 0) return;
    console.log(typeof start.current);
    console.log(`from index ${start.current}`);
    const newItems = store.slice(start.current, start.current + STEP).reverse();
    console.log(newItems);
    console.log([...newItems, ...itemsToPaginate]);
    setNewItems((prev) => [...newItems, ...prev]);
    start.current = start.current + STEP;
    console.log('start is now' + start.current);
  }, [itemsToPaginate, store]);

  const addNewItemsToFeed = React.useCallback(() => {
    setItemsToPaginate((prevItems) => [...newItems, ...prevItems]);
    setNewItems([]);
  }, [newItems, itemsToPaginate]);
  useEffect(() => {
    console.log('New items are now ');
    console.log(newItems);
  }, [newItems]);

  return (
    <div>
      <h2>Items list</h2>
      {newItems && newItems.length > 0 && (
        <button
          onClick={addNewItemsToFeed}
          style={{
            color: '#fff',
            backgroundColor: '#0a6cb2',
            padding: '10px',
            borderRadius: '10px',
            border: 'none',
            textAlign: 'center',
          }}
        >
          New posts
        </button>
      )}
      {itemsToPaginate && itemsToPaginate.map((i) => <p>{i}</p>)}

      <button
        style={{
          color: '#fff',
          backgroundColor: '#0a6cb2',
          padding: '10px',
          borderRadius: '10px',
          border: 'none',
          textAlign: 'center',
        }}
        onClick={simulateNewItems}
      >
        Simulate new items
      </button>
    </div>
  );
}
