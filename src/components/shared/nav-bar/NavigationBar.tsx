'use client';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth/useAuth";

export function NavigationBar(){

    const {user,logout} = useAuth();
    return (
        <nav className="w-fullbg-gray-800 text-white bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">Next Offers</div>
                <div>
                    <a href="/offers" className="px-3 py-2 rounded hover:bg-gray-700">Offers</a>
                    <a href="/profile" className="px-3 py-2 rounded hover:bg-gray-700">Profile</a>
                </div>
                { user && <div className="ml-4">Добре дошъл, {user.username} <Button onClick={logout}>Изход</Button></div>}
            </div>
        </nav>     
    )
}