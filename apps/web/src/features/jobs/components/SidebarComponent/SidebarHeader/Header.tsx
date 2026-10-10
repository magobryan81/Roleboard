import { useState } from 'react';
import { Menu } from 'lucide-react'

const Header = () => {
    const [open, isOpen] = useState();
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
                <Menu size={20}/>
                <h2>Roleboard</h2>
            </div>
            <div>
                <div
                    className='flex items-center justify-between border border-gray-400 rounded-md border- w-full py-1 pl-2 pr-1 cursor-pointer'
                >
                    <span className='text-muted text-[14px]'>Search</span>
                    <span className='text-muted text-[12px] border border-gray-400 bg-background rounded-sm px-1 py-0.5'>Ctrl + K</span>
                </div>
            </div>
        </div>
    )
}

export default Header