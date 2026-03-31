'use client';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth/useAuth";
import Link from "next/link";

export function NavigationBar(){

    const {isAuthenticated,user,logout} = useAuth();
    
    return (
        <nav className="w-full h-15 text-white bg-gray-900 p-4 absolute">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex flex-row items-center gap-5">
                    <div className="text-lg font-bold">Next Offers</div>
                </div>

                <div>
                   {!isAuthenticated && <Link href='/sign-in' className="mr-4">Вход</Link>}
                </div>
               
                <div className="flex flex-row items-center gap-4">
                    {isAuthenticated && <div className="flex gap-4">
                        <Link href='/offers' className="mr-4">Създаване на оферти</Link>
                    {user?.role === 'admin' && <Link href='/admin' className="mr-4">Админ панел</Link>}</div>}
                    { user && <div className="flex flex-row gap-5 items-center"><div className="ml-4">Добре дошъл, {user.username} </div><Button variant='outline' className=' text-black cursor-pointer border-none' onClick={logout}>Изход</Button></div>}
                </div>
            </div>
        </nav>     
    )
}