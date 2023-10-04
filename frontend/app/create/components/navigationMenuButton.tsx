interface INavMenuBtn{
    menuHover: number,
    menuCode: number,
    setMenuHover: Function,
    handleMenuNavigation: Function,
    code: number,
    text: string,
}

export default function NavigationMenuButtonComponent({menuHover, menuCode, setMenuHover, handleMenuNavigation, code, text}: INavMenuBtn){
    return (
        <button type="button" className={`${menuHover == code || menuHover == -1 ? 'text-white' : 'text-gray-500'} underline-offset-4 ${menuCode == code ? 'underline' : ''} transition-all py-2`}
            onMouseEnter={() => setMenuHover(code)}
            onMouseLeave={() => setMenuHover(-1)}
            onClick={() => handleMenuNavigation(code)}>
            {text}
        </button>
    )
}