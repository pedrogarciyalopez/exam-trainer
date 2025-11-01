import React from 'react';

export function Result({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 200,
    }}>
      <div>{children}</div>
    </div>
  )
}
