"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { signIn } from '@/lib/auth-client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
//schema 

const loginSchema = z.object({
    email : z.string().email("Please enter a valid email address"),
    password : z.string().min(6, 'Password must be at least 6 characters log')
})

type LoginFormvalues = z.infer<typeof loginSchema>

export default function Login() {

    const router = useRouter()

    const [isloading ,setIsloading] = useState(false);

    //initilaze form
    const form = useForm<LoginFormvalues>({
        resolver : zodResolver(loginSchema),
        defaultValues : {
            email : '',
            password : ''
        }
    })

    const onSubmit = async (values: LoginFormvalues) => {
        setIsloading(true)
        try {
            const {error} = await signIn.email({
                email : values.email,
                password : values.password,
                rememberMe : true
            })

            if(error) {
                toast.error("Login failed!")
            }
            toast.success("login success")
            router.push('/')
            console.log(values); 
        } catch (error) {
            console.log(error);
            setIsloading(false)
        }
    };


    return <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) =>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter your email' {...field}/>
                            </FormControl>
                            <FormMessage/>
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
                                <Input type='password'  placeholder='Enter your passeord' {...field}/>
                            </FormControl>
                             <FormMessage/>
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