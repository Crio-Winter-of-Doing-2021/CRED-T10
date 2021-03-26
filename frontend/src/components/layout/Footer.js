import React from 'react';

const Footer = () => {
  return (
    <div
      style={{
        display: 'grid',
        ...footerStyle,
        backgroundColor: 'blueviolet',
      }}
    >
      Footer
    </div>
  );
};
const footerStyle = {
  position: 'absolute',
  bottom: '0',
  width: '100%',
  height: '60px' /* Height of the footer */,
  background: '#6cf',
};
export default Footer;
