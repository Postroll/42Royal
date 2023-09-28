import Input from "./shared/input/input"
import { useState } from "react";

interface IRegister{
    setRegisterPannel: Function,
    setLoginPanel: Function,
}

interface IResponse{
    status: string,
    error?: string,
    url?: string,
}

export default function RegisterComponent({setRegisterPannel, setLoginPanel}: IRegister) {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | undefined>('');

    const registerFirebase = async () =>{
        await fetch('http://localhost:5000/register/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({formValues: {email: email, password: password}}),
        })
        .then((res) => res.json())
        .then((data) => registerFeedback({url: data?.url, status: data.status, error: data?.error?.code} as IResponse))
        .catch((error) => console.log(error));
    }

    const registerFeedback = (data: IResponse) =>{
        if (!data)
            return ;
        else if (data.status == 'success'){
            setRegisterPannel(false);
            if (data.url)
                window.location.href = data.url;
            return ;
        }
        console.log(data.error);
        setError(data.error);
    }

    const switchToLogin =() =>{
        setRegisterPannel(false);
        setLoginPanel(true);
    }

    return (
        <div className="w-screen h-screen absolute">
            <div className="z-40 bg-black/50 w-full h-full backdrop-blur relative">
                <div className="z-50 w-1/2 max-w-lg bg-slate-100 mx-auto p-8 absolute top-1/4 inset-x-0 rounded-lg flex flex-col items-center gap-2">
                    <button className="-p-2 -m-4 self-end hover:underline hover:text-gray-600" onClick={switchToLogin}>
                        {`Login ->`}
                    </button>
                    <h1 className="font-bold text-xl mb-6">Sign Up!</h1>
                    <a href='http://localhost:5000/login/42' onClick={() => setRegisterPannel(false)} className= "text-white bg-green-500 rounded-lg hover:animate-shrink hover:bg-green-700 p-1 px-2">Register with 42</a>
                    <p className="my-4">Or</p>
                    <Input placeholder="Email" value={email} setValue={setEmail}/>
                    <Input placeholder="Password" value={password} setValue={setPassword}/>
                    {
                        error && <p className="text-red-600 font-bold">{error}</p>
                    }
                    <div className="flex gap-5 mt-2">
                        <button className="text-white bg-violet-600 rounded-lg hover:animate-shrink hover:bg-violet-700 p-1 px-2" onClick={registerFirebase}>Register</button>
                        <button className="text-white bg-red-600 rounded-lg hover:animate-shrink hover:bg-red-700 p-1 px-2" onClick={() => setRegisterPannel(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}