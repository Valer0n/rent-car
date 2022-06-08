import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PasswordInput, TextInput, Button, Container, Group } from '@mantine/core';
import { useAuth } from "../../HOC/Auth";


const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [problem, setProblem] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { signIn } = useAuth();


    const fromPage = location.state?.from?.pathname || '/';

    const logIn = (e) => {
        e.preventDefault();
        const localName = localStorage.getItem('name');
        const localPassword = localStorage.getItem('password');


        if (localName === name && localPassword === password) {
            signIn(name, password, () => {
                navigate(fromPage, { replace: true });
            })
        } else {
            setProblem(true);
        }

    }

    const changeInputName = (e) => {
        setName(e.target.value);
        setProblem(false);
    }
    const changeInputPassword = (e) => {
        setPassword(e.target.value);
        setProblem(false);
    }
    return (
        <>
            <Container size={1500}>
                <form style={{ maxWidth: '400px', margin: '100px auto 0' }} onSubmit={logIn}>
                    <TextInput
                        placeholder="Your name"
                        label="Your name"
                        required
                        onChange={changeInputName}
                        style={{ marginBottom: '20px' }}
                    />
                    <PasswordInput
                        placeholder="Password"
                        label="Password"
                        description="Password must include at least one letter, number and special character"
                        required
                        onChange={changeInputPassword}
                        style={{ marginBottom: '30px' }}
                    />
                    <Group position="center">
                        <Button type='submit'>
                            Sign in
                        </Button>
                    </Group>
                </form>
                {problem ? <div>Problem</div> : <div></div>}
            </Container>
        </>
    )
}
export default Login;