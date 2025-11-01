import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Header({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();


  return (
    <div style={{
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      background: 'white',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
      padding: 15,
      height: 70,
      borderBottomColor: 'rgb(240,240,240)',
      borderBottomStyle: 'solid',
      borderBottomWidth: 1
    }}>
      <button className="back-button" onClick={() => navigate(-1)}>
        <svg
          width={25}
          height={25}
          viewBox="0 0 25 25"
          fill="none"
          stroke="#007bff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <div style={{
        flex: 1,
        flexDirection: 'row',
        display: 'flex',
        paddingLeft: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {children}
      </div>
    </div>
  )
}
