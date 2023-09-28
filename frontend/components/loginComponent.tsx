import Input from "./shared/input/input"
import { useState } from "react";

interface ILogin{
    setLoginPanel: Function,
    setRegisterPanel: Function,
}

interface IResponse{
    status: string,
    error?: string,
    user?: string,
}

export default function LoginPanel({setLoginPanel, setRegisterPanel}: ILogin) {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | undefined>('');

    const loginFirebase = async () =>{
        await fetch('http://localhost:5000/login/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({formValues: {email: email, password: password}}),
        })
        .then((res) => res.json())
        .then((data) => loginFeedback({status: data.status, user: data.user, error: data?.error} as IResponse))
        .catch((error) => console.log(error));
    }

    const loginFeedback = (data: IResponse) =>{
        if (!data)
            return ;
        else if (data.status == 'success'){
            setLoginPanel(false);
            return ;
        }
        console.log(data.error);
        setError(data.error);        
    }

    const switchToRegister =() =>{
        setRegisterPanel(true);
        setLoginPanel(false);
    }

    return (
        <div className="w-screen h-screen absolute">
            <div className="z-40 bg-black/50 w-full h-full backdrop-blur relative">
                <div className="z-50 w-1/2 max-w-lg bg-slate-100 mx-auto p-8 absolute top-1/4 inset-x-0 rounded-lg flex flex-col items-center gap-2">
                    <button className="-p-2 -m-4 self-end hover:underline hover:text-gray-600" onClick={switchToRegister}>
                        {`Register ->`}
                    </button>
                    <h1 className="font-bold text-xl mb-6">Login!</h1>
                    <a href='http://localhost:5000/login/42' onClick={() => setLoginPanel(false)} className= "text-white bg-green-500 rounded-lg hover:animate-shrink hover:bg-green-700 p-1 px-2">Login with 42</a>
                    <p className="my-4">Or</p>
                    <Input placeholder="Email" value={email} setValue={setEmail}/>
                    <Input placeholder="Password" value={password} setValue={setPassword}/>
                    {
                        error && <p className="text-red-600 font-bold">{error}</p>
                    }
                    <div className="flex gap-5 mt-2">
                        <button className="text-white bg-violet-600 rounded-lg hover:bg-violet-700 p-1 px-2 active:animate-shrink2" onClick={loginFirebase}>Login</button>
                        <button className="text-white bg-red-600 rounded-lg active:animate-shrink2 hover:bg-red-700 p-1 px-2" onClick={() => setLoginPanel(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}