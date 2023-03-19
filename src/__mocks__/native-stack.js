import React from 'react';
const mock = jest.fn(() => ({
  Navigator: ({ children }) => <>{children}</>,
  Screen: ({ children }) => <>{children}</>,
}));
export default mock;