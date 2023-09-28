import Link from "next/link"

interface ILink{
    linkTo: string,
    linkText: string,
    func: Function,
}

export default function NavBarLink({linkTo, linkText, func}: ILink){
    return (
        <li className="p-2 text-md text-white py-2 md:px-5 text-center border-b-2 md:border-b-0 hover:bg-yellow-800  border-yellow-800  md:hover:text-yellow-500 md:hover:bg-transparent active:animate-shrink2">
            <Link href={linkTo} className="font-bold group text-white    hover:animate-shrink2" onClick={() => func(false)}>
                {linkText}
                <span className="block max-w-0 md:group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
            </Link>     
        </li>
    )
}