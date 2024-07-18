import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/login';

function Login() {
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login(password)
            if (res.isAuthenticated) {
                navigate('/messages')
            }
        } catch (error) {
            console.error('Login error', error);
        }
    }

    return (
        <div>
            <h1>Express</h1>
            <p>Welcome</p>
            <p>Log in to see the messages</p>

            <form onSubmit={handleLogin}>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login