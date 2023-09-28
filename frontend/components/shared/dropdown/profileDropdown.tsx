'use client'
import Image from "next/image"
import { Avatar, Dropdown } from 'flowbite-react';

import profile from "../../assets/profile.svg"
import avatarIcon from "../../assets/avatar.png"

interface IProfileDropdown{
    username: string,
    photo: string,
    loggedIn: boolean,
}

export default function ProfileDropdown({ username, photo, loggedIn }: IProfileDropdown){
    return (
        <div className="">
            { 
                loggedIn && (
                <Dropdown
                    arrowIcon={false}
                    inline
                    className="w-40 max-w-40"
                    label={<Avatar className="bg-white rounded-full" alt="User settings" img='https://thenounproject.com/api/private/icons/1122828/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0'/>}
                    >
                    <Dropdown.Header>
                        <span className="block text-sm overflow-clip">
                            {username}
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        Profile
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item tabIndex={-1} href='http://localhost:5000/login/logout'>
                        Sign Out
                    </Dropdown.Item>
                </Dropdown>
            )}
        </div>
    )
}