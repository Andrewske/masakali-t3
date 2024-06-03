import React from 'react';

function usePrevious(value: undefined) {
  const ref = React.useRef(value);

  React.useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export default usePrevious;
