
import { useState } from 'react';

import TableGame from '@/components/game/tableGame';

import IUser from '../../../../utils/IUser'

export default function ServerLobbyComponent(){
    const [rooms, setRooms] = useState<Array<any>>([]);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [user, setUser] = useState<IUser>();

    return (
        <div className='max-h-screen max-w-screen h-screen w-screen pt-14 bg-slate-800 flex flex-col'>
            <TableGame setPage={setPage} page={page} count={count} rooms={rooms} refresh={() => console.log('empty')} joinByID={() => console.log('empty')}/>
            <div className='flex gap-4'>
                <button className='text-white text-xl bg-slate-500' onClick={() => console.log('empty')}>Join</button>
                <button className='text-white text-xl bg-slate-500' onClick={() =>console.log('test')}>Join by ID</button>
                <button className='text-white text-xl bg-slate-500' onClick={() => console.log('empty')}>Create</button>
            </div>
        </div>
    )
}