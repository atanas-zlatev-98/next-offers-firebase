
'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createNewUser } from "@/services/userActions"

export function AddUserForm() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            await createNewUser({username,email,password});
        }catch(err){
            console.log("Error creating user:", err);
        }
    }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        
        <CardTitle>Създаване на потребител</CardTitle>
        
        <CardDescription>
           {/* TODO Error Handling */}
        </CardDescription>

      </CardHeader>

      <CardContent>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col gap-6">

            <div className="grid gap-2">
              <Label htmlFor="username">Потребителско име</Label>
              <Input
                id="username"
                type="text"
                placeholder="Вашето потребителско име"
                onChange={(e)=>setUsername(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Имейл</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Парола</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Вашата парола"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
             <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirmPassword">Потвърдете паролата</Label>
              </div>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Потвърдете вашата парола"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button className="w-full mt-6" type="submit">Добави потребител</Button>
        </form>
      </CardContent>
    </Card>
  )
}
