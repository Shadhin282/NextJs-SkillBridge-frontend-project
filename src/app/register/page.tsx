import RegisterForm from '@/components/authentication/register-form';
import React from 'react';

const RegisterPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
            <RegisterForm></RegisterForm>
        </div>
    );
};

export default RegisterPage;