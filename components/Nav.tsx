"use client"
import { Session } from "next-auth";
import {signIn, signOut} from "next-auth/react";
import Image from "next/image";

export default function Nav({user, expires}:Session) {
  return (
    <nav className="container">
      <div className="flex justify-between items-center">

      
      <h1>Styled</h1>
      <ul className="flex items-center">
       
        {!user && (
          <li>
            <button className="btn bg-teal-400 border-teal-500" onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <>
          <li>
            <Image 
              src={user.image!}
              width={32}
              height={32}
              alt={user.name!}
              className="rounded-full"
            />
          </li>
          <li>
            <button className="btn bg-amber-700 border-amber-800" onClick={() => signOut()}>Sign Out</button>
          </li>
          </>
        )}
      </ul>
      </div>
    </nav>
  )
}