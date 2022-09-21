import React, { InputHTMLAttributes, useRef } from 'react'
import style from './styles.module.scss'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    
}

export const Input: React.FC<InputProps> = ({...rest}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
        <input type="text"
        className={style.input} 
        ref={inputRef}
        {...rest}
        />
    </div>
  )
}
