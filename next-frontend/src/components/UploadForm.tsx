import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { v4 as uuidv4 } from 'uuid';
import { encryptFile } from '../utils/encryption';
import { uploadToIPFS } from '../utils/upload_to_ipfs';
// import { sendToSmartContract } from '../utils/smartContract'; // 預留

const UploadForm: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [secretKey, setSecretKey] = useState<string | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
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

  const sendToBackend = async (email: string, url: string, cid: string, secretKey: string, walletAddress: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_PYTHON_BACKEND_API_URL; // 從環境變數中讀取後端的 base url
    console.log("Python backend baseUrl: ", baseUrl)
    const data = {
      email,
      url,  // 使用生成的 URL
      decryption_key: secretKey,
      ipfs_cid: cid,
      deposit_amount: '100 USD', // 假設固定金額，或可以從其他地方獲取
      description: 'Please click the link to verify your account.',
      wallet_address: walletAddress  // 傳遞錢包地址
    };

    try {
      const response = await axios.post(`${baseUrl}/send-mail`, data);
      return response.data.message;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return error.response.data.error;
      }
      return 'An error occurred';
    }
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

    setLoading(true);
    setResultMessage(null);

    try {
      const secretKey = uuidv4();
      setSecretKey(secretKey);
      const encryptedFile = await encryptFile(pdfFile, secretKey);
      const cid = await uploadToIPFS(encryptedFile);
      setCid(cid);
      const token = uuidv4();
      const url = `http://localhost:3000/verify?token=${token}`;  // 生成包含 Token 的 URL
      const result = await sendToBackend(email, url, cid, secretKey, walletAddress);
      setResultMessage(result);
    } catch (error) {
      console.error('Error during upload:', error);
      setResultMessage('An error occurred');
    } finally {
      setLoading(false);
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
      {loading && (
        <div className="mt-4">
          <p>Sending email, please wait...</p>
          <div className="loader">Loading...</div>
        </div>
      )}
      {resultMessage && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold">Result:</h3>
          <p>{resultMessage}</p>
        </div>
      )}
      {secretKey && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold">Decryption Key:</h3>
          <p>{secretKey}</p>
        </div>
      )}
      {cid && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold">IPFS CID:</h3>
          <p>{cid}</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
