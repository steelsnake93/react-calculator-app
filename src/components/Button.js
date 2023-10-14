import React from "react"

export default function Button({ id, value, onClick, clear, decimal }) {
    const className = [
        clear ? 'clear-button' : '',
        decimal ? 'decimal-button' : ''
    ].filter(Boolean).join(' ');
    return <button id={id} value={value} onClick={onClick} className={className}>{value}</button>  
}
