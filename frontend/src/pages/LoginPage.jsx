import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-hot-toast'

// Importera shadcn/ui-komponenter
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

const LoginPage = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { verifyUser } = useContext(UserContext)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/start')
    }
  }, [navigate])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username: userName,
        password: password,
      })

      if (response.data.token) {
        localStorage.setItem('token', JSON.stringify(response.data.token))
        verifyUser()
        toast.success('Login successful!')
        navigate('/start')
      }
    } catch (error) {
      toast.error('Invalid username or password!')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md p-8 space-y-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-900">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <div>
            <Label htmlFor="username" className="mb-1">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Enter your username"
              required
              autoFocus
            />
          </div>
          <div>
            <Label htmlFor="password" className="mb-1">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </Card>
    </div>
  )
}

export default LoginPage
