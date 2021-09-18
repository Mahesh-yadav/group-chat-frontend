import React from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function Spinner() {
  return (
    <span className="spinner-container">
      <FaSpinner className="icon-loading" />
    </span>
  );
}
