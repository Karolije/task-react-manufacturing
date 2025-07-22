import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction } from '../../features/transactions/TransactionsSlice';
import './style.css';

const TransactionList = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();

  const [visibleCount, setVisibleCount] = useState(5);

  if (transactions.length === 0) {
    return <p>Brak transakcji</p>;
  }

  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  const visible = sorted.slice(0, visibleCount);

  return (
    <div className="transaction-scroll-wrapper">
      <h2>Lista transakcji</h2>
     <ul className="transaction-scroll">
  {visible.map(({ id, amount, type, category, note, date }) => (
  <li key={id} className={type === 'income' ? 'income' : 'expense'}>
  <div className="transaction-content">
    <strong>{category}</strong> — {amount.toFixed(2)}zł. <br />
    <small>{date}</small>
    {note && <em>Notatka: {note}</em>}
  </div>
  <button onClick={() => dispatch(deleteTransaction(id))}>Usuń</button>
</li>
  ))}
</ul>
      {visibleCount < sorted.length && (
        <button className="show-more-btn" onClick={() => setVisibleCount(visibleCount + 5)}>
  Pokaż więcej
</button>      )}
    </div>
  );
};

export default TransactionList;
