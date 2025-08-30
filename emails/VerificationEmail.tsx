import React from 'react';

interface EmailTemplateProps {
    email: string;
    verifyCode: string
}

export function VerificationEmailTemplate({ email, verifyCode }: EmailTemplateProps) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1>Welcome, {email}!</h1>
            <p>Enter your OTP</p>
            <h3>{verifyCode}</h3>
            <small>OTP will be valid for 5 min.</small>
        </div>
    );
}