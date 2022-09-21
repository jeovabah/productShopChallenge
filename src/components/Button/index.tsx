import React, { ButtonHTMLAttributes } from 'react'
import style from "./styles.module.scss"
export default function Button({ children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <div>
            <button className={style.containerButton}>{children}</button>
        </div>
    )
}
