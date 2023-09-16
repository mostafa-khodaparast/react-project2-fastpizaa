import { Link } from "react-router-dom"


const Button = ({ children, disabled, to, size, onClick}) => {
    const baseStyle = "bg-yellow-400 font-semibold text-stone-700 tracking-wide uppercase rounded-full \
                     hover:bg-yellow-300 transition-all duration-300 outline-none disabled:cursor-not-allowed \
                     focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1"

    const sizeStyles = {
        small: baseStyle + ' px-2 py-1 text-xs',
        medium: baseStyle + ' px-4 py-3',
        delete: 'bg-red-400 font-semibold text-stone-700 tracking-wide uppercase rounded-full \
        hover:bg-red-300 transition-all duration-300 outline-none \
        focus:outline-none focus:ring focus:ring-red-300 focus:ring-offset-1 px-5 py-3'
    }

    if (to) return <Link to={to} className={sizeStyles[size]}> {children} </Link>

    if(onClick) return <button onClick={onClick} disabled={disabled} className={sizeStyles[size]}> {children} </button>


    return <button disabled={disabled} className={sizeStyles[size]}> {children} </button>
}

export default Button