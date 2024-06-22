import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

interface GoogleResponse {
  access_token: string;
}

interface GoogleUserInfo {
  email: string;
}

const VerifyPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const googleLogin = useGoogleLogin({
    onSuccess: async (response: GoogleResponse) => {
      try {
        const { data: { email: userEmail } } = await axios.get<GoogleUserInfo>(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${response.access_token}`
        );

        if (userEmail === email) {
          alert('Email verified, you can download the PDF');
          // 這裡可以添加下載 PDF 的邏輯
        } else {
          setError('Email verification failed');
        }
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user information');
        setLoading(false);
      }
    },
    onError: () => setError('Google login failed'),
  });

  useEffect(() => {
    if (token) {
      axios.get<{ email: string }>(`${process.env.PYTHON_BACKEND_API_URL}/verify?token=${token}`)
        .then(response => {
          setEmail(response.data.email);
          googleLogin();
        })
        .catch(() => setError('Invalid token'))
        .finally(() => setLoading(false));
    }
  }, [token, googleLogin]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return null;
};

export default VerifyPage;
