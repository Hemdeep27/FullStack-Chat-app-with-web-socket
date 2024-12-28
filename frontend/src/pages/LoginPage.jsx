import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquareQuoteIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern.jsx'
import { useAuthStore } from '../store/useAuthStore.js'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { login, isLoggingIn } = useAuthStore()

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error('Email is required')
      return false
    }
    if (!formData.password.trim()) {
      toast.error('Password is required')
      return false
    }
    return true
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = validateForm()
    if (success) login(formData)
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
        {/* left side */}
        <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
            <div className='w-full max-w-md space-y-8'>
                {/* logo */}
                <div className='text-center mb-8'>
                    <div className='flex flex-col items-center gap-2 group'>
                        <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                            <MessageSquareQuoteIcon className='size-6 text-primary' />
                        </div>
                        <h1 className='text-2xl font-bold mt-2'>Login to your Account</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className='from-control'>
                        <label className='label'>
                            <span className='label-text font-medium'>Email</span>
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Mail className='size-5 text-base-content/40'/>
                            </div>
                            <input 
                            type="email" 
                            className={`input input-bordered w-full pl-10`} 
                            placeholder="you@example.com" 
                            value={formData.email} 
                            onChange={(e) => {
                                setFormData({...formData, email: e.target.value })
                            }}
                            />
                        </div>
                    </div>

                    <div className='from-control'>
                        <label className='label'>
                            <span className='label-text font-medium'>Password</span>
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Lock className='size-5 text-base-content/40'/>
                            </div>
                            <input 
                            type={showPassword ? 'text' : 'password'}
                            className={`input input-bordered w-full pl-10`} 
                            placeholder="••••••••••" 
                            value={formData.password} 
                            onChange={(e) => {
                                setFormData({...formData, password: e.target.value })
                            }}
                            />
                            <button 
                            type='button' 
                            className='absolute inset-y-0 right-0 pr-3 flex items-center'
                            onClick={() => setShowPassword(!showPassword)}
                            >
                                {
                                    showPassword ? (
                                        <EyeOff className='size-5 text-base-content/40' />
                                    ) : (
                                        <Eye className='size-5 text-base-content/40' />
                                    )
                                }
                            </button>
                        </div>
                    </div>

                    <button 
                    type='submit' 
                    className='btn btn-primary w-full' 
                    disabled={isLoggingIn}>
                        {
                            isLoggingIn ? (
                                <>
                                <Loader2 className='size-5 animate-spin'/>
                                Loading....
                                </>
                            ) : (
                                "Login"
                            )
                        }
                    </button>
                </form>

                <div className='text-center'>
                    <p className='text-base-content/60'>
                        Dont have an Account?{" "}
                        <Link to={'/signup'} className='link link-primary'>
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        {/* right side */}

        <AuthImagePattern 
        title="Welcome Back"
        subtitle="Connect with your friends, Stay in touch!!!"
        />
    </div>
  )
}

export default LoginPage