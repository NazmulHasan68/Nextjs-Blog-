"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
//schema 

const loginSchema = z.object({
    email : z.string().email("Please enter a valid email address"),
    password : z.string().min(6, 'Password must be at least 6 characters log')
})

type LoginFormvalues = z.infer<typeof loginSchema>

export default function Login() {

    const [isloading ,setIsloading] = useState(false);

    //initilaze form
    const form = useForm<LoginFormvalues>({
        resolver : zodResolver(loginSchema),
        defaultValues : {
            email : '',
            password : ''
        }
    })

    const onSubmit = async (data: LoginFormvalues) => {
        console.log(data);
    };


    return <Form {...form}>
            <form className='space-y-4'>
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) =>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter your email' {...field}/>
                            </FormControl>
                        </FormItem>  
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) =>(
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder='Enter your passeord' {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                 <button
                    type="submit"
                    disabled={isloading}
                    className="w-full bg-blue-500 text-white py-2 rounded-md"
                    >
                    {isloading ? "Loading..." : "Sign in"}
                    </button>
                
            </form>
            
    </Form>
}