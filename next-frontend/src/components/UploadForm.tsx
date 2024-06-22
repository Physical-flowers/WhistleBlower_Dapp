import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { v4 as uuidv4 } from 'uuid';

const UploadForm: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const { account } = useWallet();

  useEffect(() => {
    if (account?.address) {
      setWalletAddress(account.address);
    }
  }, [account?.address]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!walletAddress) {
      alert('Please connect your wallet first.');
      return;
    }
    if (!pdfFile) {
      alert('Please upload a PDF file.');
      return;
    }
    if (!email) {
      alert('Please provide an email address.');
      return;
    }

    const token = uuidv4(); // 生成唯一的 token
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const link = `${baseUrl}/verify?token=${token}`;
    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    formData.append('email', email);
    formData.append('walletAddress', walletAddress);
    formData.append('token', token); // 將 token 添加到表單數據中
    formData.append('link', link); // 將 link 添加到表單數據中

    const PYTHON_BACKEND_API_URL = process.env.NEXT_PUBLIC_PYTHON_BACKEND_API_URL;
    if (!PYTHON_BACKEND_API_URL) {
      alert("請聯繫開發人員，尚未指定後端 Python API 的 Base URL!");
      return;
    }

    try {
      const response = await axios.post(`${PYTHON_BACKEND_API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }); // 調用後端 API
      alert('File uploaded and email sent successfully');
    } catch (error) {
      let errorMessage = 'An unknown error occurred';

      if (axios.isAxiosError(error)) {
        if (error.response) {
          // 伺服器響應的錯誤
          errorMessage = error.response.data?.details || error.response.statusText;
        } else if (error.request) {
          // 請求發送失敗，伺服器未響應
          errorMessage = 'No response received from backend server';
        } else {
          // 其他錯誤
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload PDF and Send Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="pdfFile" className="block text-sm font-medium text-gray-700">
            Upload PDF:
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
