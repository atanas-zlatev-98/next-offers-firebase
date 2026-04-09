"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth/useAuth";

export function NavigationBar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="w-full text-white bg-gray-900 absolute z-50">
      <div className="container mx-auto flex justify-between items-center px-4 h-14">
    
        <Link href="/" className="text-lg font-bold shrink-0">
          Next Offers
        </Link>

        <div className="hidden md:flex flex-row items-center gap-4">
          {!isAuthenticated && (
            <Link href="/sign-in" className="hover:opacity-80">
              Вход
            </Link>
          )}

          {isAuthenticated && user?.role === "admin" && (
            <Link href="/admin" className="hover:opacity-80">
              Админ панел
            </Link>
          )}

          {user && (
            <>
              <span className="text-sm text-gray-300">
                Добре дошъл, {user.username}
              </span>
              <Button
                variant="outline"
                className="text-black cursor-pointer border-none"
                onClick={logout}
              >
                Изход
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

     
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 flex flex-col gap-3 border-t border-gray-700">
          {!isAuthenticated && (
            <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
              Вход
            </Link>
          )}
          {isAuthenticated && user?.role === "admin" && (
            <Link href="/admin" onClick={() => setMenuOpen(false)}>
              Админ панел
            </Link>
          )}
          {user && (
            <>
              <span className="text-sm text-gray-300">
                Добре дошъл, {user.username}
              </span>
              <Button
                variant="outline"
                className="text-black cursor-pointer border-none w-fit"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                Изход
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
