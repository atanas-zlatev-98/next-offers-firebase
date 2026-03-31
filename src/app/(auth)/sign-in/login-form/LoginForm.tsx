
'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth/useAuth"

export function LoginForm() {

  const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login({email, password});
    }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        
        <CardTitle>Вход в системата</CardTitle>
        
        <CardDescription>
          Въведете вашия имейл по-долу, за да влезете в акаунта си
        </CardDescription>

      </CardHeader>

      <CardContent>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col gap-6">
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
          </div>
          <Button className="w-full mt-6" type="submit">Вход</Button>
        </form>
      </CardContent>
    </Card>
  )
}
