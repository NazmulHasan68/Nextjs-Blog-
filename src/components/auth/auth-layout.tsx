"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import Login from "./login-form"
import Register from "./register-form"

export default function AuthLayout() {

    const [activeTab, setactiveTab] = useState('login')

    return <div className=" flex justify-center items-center min-h-[80vh]">
        <div className=" w-full max-w-md p-5 bg-card rounded-lg shadow-sm border">
            <h1 className="text-2xl font-bold text-center mb-6">Welcome!</h1>
            <Tabs value={activeTab} onValueChange={setactiveTab} className="w-full">
                <TabsList className=" grid grid-cols-2 mb-4 w-full">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                    <Login/>
                </TabsContent>

                <TabsContent value="register">
                    <Register onSuccess={()=>setactiveTab('login')}/>
                </TabsContent>
            </Tabs>
        </div>
    </div>
}