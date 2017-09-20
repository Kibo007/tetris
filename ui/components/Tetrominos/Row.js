import React from 'react';

const Row = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      {children}
    </div>
  );
};

export default Row;
