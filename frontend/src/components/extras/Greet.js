import { useEffect } from 'react';
// #6495ed
const Greet = ({ setShowHello, showHello, user }) => {
  useEffect(() => {
    setTimeout(() => setShowHello(!showHello), 5000);
    // eslint-disable-next-line
  }, []);
  return (
    <div
      style={{
        backgroundColor: '#000',
        borderRadius: '10px',
        marginBottom: '20px',
        color: '#f4f4f4',
      }}
    >
      <h1 onClick={() => setShowHello(!showHello)}>
        Hello {user.firstName + ' ' + user.lastName + '  '}!
      </h1>
    </div>
  );
};

export default Greet;
