'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import NavBarLink from "./navbarLink";
import ProfileDropdown from "../shared/dropdown/profileDropdown";
import RegisterComponent from "../registerComponent";

import close from "../../assets/close.svg"
import hamburger_menu from "../../assets/hamburger-menu.svg"
import logo from "../../assets/logo.png"
import logo2 from "../../assets/logo4.png"

import IUser from '../../utils/IUser'
import LoginPanel from "../loginComponent";

export default function NavBar(){
    const [isScrolled, setIsScrolled] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const [userInfo, setUserInfo] = useState<IUser>();
    const [registerPanel, setRegisterPanel] = useState(false);
    const [loginPanel, setLoginPanel] = useState(false);
    const initializedNav = useRef(false);

    useEffect(() => {
        if (!initializedNav.current){
            initializedNav.current = true;
            fetch(process.env.NEXT_PUBLIC_BACKEND +'/user/me', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then((res) => res.json())
            .then((data: Object) => {
                console.log(data)
                setUserInfo(data as IUser)
            })
            .catch((e) => console.log('error when fetching user data: '+e));
        }
    }, [])

    useEffect(() => {
        document.body.style.overflowY = document.body.style.overflowY === 'hidden' ? 'visible' : 'hidden';
    }, [navbar])

    useEffect(function mount() {
        function onScroll() {
            setIsScrolled(window.scrollY === 0 ? false : true);
        }

        window.addEventListener("scroll", onScroll);

        return function unMount() {
            window.removeEventListener("scroll", onScroll);
        };
    });
    
    return (
        <div className="z-40">
            {/* <RegisterComponent /> */}
            { registerPanel && <RegisterComponent setRegisterPannel={setRegisterPanel} setLoginPanel={setLoginPanel}/> }
            { loginPanel && <LoginPanel setLoginPanel={setLoginPanel} setRegisterPanel={setRegisterPanel}/> }
            <nav className={`fixed w-full flex justify-around top-0 z-10 ${isScrolled || navbar ? 'bg-black/40 backdrop-blur-lg' : ''}`}>
                <div className="lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link href="/" className="content-center items-center flex active:animate-shrink2 mr-8" onClick={() => setNavbar(false)}>
                            {
                                logo ? (
                                    <Image src={logo2} alt="logo" width={70} className="active:rotate-3 h-auto hover:bg-gradient-radial from-white/50 via-transparent via-50% to-transparent"/>
                                ) : (
                                    <h2 className="text-2xl text-cyan-600 font-bold">LOGO</h2>
                            )}
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400"
                                onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <Image src={close} width={20} height={20} alt="logo" className="fill-white stroke-cyan-500" />
                                    ) : (
                                        <Image src={hamburger_menu} width={20} height={20} alt="logo" 
                                        className="focus:border-none active:border-none fill-white stroke-white"
                                        />
                                    )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className={`flex-1 justify-self-center pb-3 mt-4 md:block md:pb-0 md:mt-0 ${
                            navbar ? 'p-4 md:p-0 block' : 'hidden'}`}>
                            <ul className="h-screen md:h-auto items-center justify-center md:flex">
                                <NavBarLink linkTo="create" linkText="Create" func={setNavbar}/>
                                <NavBarLink linkTo="review" linkText="Review" func={setNavbar}/>
                                <NavBarLink linkTo="ranking" linkText="Ranking" func={setNavbar}/>
                                <NavBarLink linkTo="game" linkText="Play" func={setNavbar}/>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                    {
                        userInfo !== undefined ? (
                            <ProfileDropdown username={userInfo?.username} photo={userInfo?.photo} loggedIn={true} />
                        ) : (
                            <div>
                                <button 
                                    className="font-bold text-white px-2 py-1 border-white rounded-lg hover:animate-shrink m-2"
                                    onClick={() => setLoginPanel(!loginPanel)}>
                                    Log In
                                </button>
                                <button 
                                    className="text-white px-2 py-1 border-2 border-white bg-transparent rounded-lg hover:animate-shrink hover:text-black hover:bg-white m-2"
                                    onClick={()=> setRegisterPanel(!registerPanel)}>
                                    Sign Up
                                </button>
                            </div>
                        )
                    }
                </div>
            </nav>
        </div>
    );
}