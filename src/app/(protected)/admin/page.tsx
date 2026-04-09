import Link from "next/link";

export default function AdminPage() {
    return(
        <div className="min-h-screen flex items-center justify-center flex-col bg-gray-100">
            <h2 className="text-4xl font-bold text-gray-800">Админ панел</h2>
            <div className="flex gap-4 mt-4 flex-col md:flex-row">
                <Link href='/add-product' className='cursor-pointer bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600'>Добавяне на продукт</Link>
                <Link href='/add-offer' className='cursor-pointer bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600'>Добавяне на оферта</Link>
                <Link href='/add-user' className='cursor-pointer bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600'>Добавяне на потребител</Link>
            </div>
        </div>
    )
}