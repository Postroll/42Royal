import NavigationMenuButtonComponent from "./navigationMenuButton"

interface IMenuNav{
    menuHover: number,
    setMenuHover: Function,
    handleMenuNavigation: Function,
    menuCode: number,
    handleSubmit: Function,
}

export default function NavigationMenuComponent ({menuHover, setMenuHover, handleMenuNavigation, menuCode, handleSubmit}: IMenuNav){
    return (
        <div className="w-[20%] bg-[#1f1c21] rounded-lg p-2 flex flex-col h-fit text-white min-w-fit">
            <div className="font-bold py-2">
                Navigation menu
            </div>
            <div className="border h-[1px] border-gray-600 w-1/2 self-center"/>
            <NavigationMenuButtonComponent code={0} text='General' menuCode={menuCode} setMenuHover={setMenuHover} handleMenuNavigation={handleMenuNavigation} menuHover={menuHover} />
            <NavigationMenuButtonComponent code={1} text='Description' menuCode={menuCode} setMenuHover={setMenuHover} handleMenuNavigation={handleMenuNavigation} menuHover={menuHover} />
            <NavigationMenuButtonComponent code={2} text='Expected Output' menuCode={menuCode} setMenuHover={setMenuHover} handleMenuNavigation={handleMenuNavigation} menuHover={menuHover} />
            <NavigationMenuButtonComponent code={3} text='Stdin' menuCode={menuCode} setMenuHover={setMenuHover} handleMenuNavigation={handleMenuNavigation} menuHover={menuHover} />
            <NavigationMenuButtonComponent code={4} text='Main code' menuCode={menuCode} setMenuHover={setMenuHover} handleMenuNavigation={handleMenuNavigation} menuHover={menuHover} />
            <NavigationMenuButtonComponent code={5} text='Working solution' menuCode={menuCode} setMenuHover={setMenuHover} handleMenuNavigation={handleMenuNavigation} menuHover={menuHover} />
            <NavigationMenuButtonComponent code={6} text='Initial code' menuCode={menuCode} setMenuHover={setMenuHover} handleMenuNavigation={handleMenuNavigation} menuHover={menuHover} />
            <div className="border h-[1px] border-gray-600 w-1/2 self-center my-2"/>
            <div className="flex mt-auto gap-4 justify-center pt-4">
                <button className={`hover:bg-slate-800 text-black active:animate-shrink
                    font-semibold hover:text-white py-2 px-4 border-2 bg-[#f5f5f5]
                    rounded-lg transition-all duration-300 mt-auto`}>
                    Help
                </button>
                <button type="button"
                    className={`hover:bg-slate-800 text-black border-2
                    font-semibold hover:text-white py-2 px-4 bg-[#f5f5f5]
                    rounded-lg transition-all duration-300 mt-auto
                    active:animate-shrink`}
                    onClick={() => handleSubmit()}>
                        Submit
                </button>
            </div>
        </div>
    )
}