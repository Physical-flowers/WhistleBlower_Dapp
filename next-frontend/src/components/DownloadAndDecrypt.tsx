import React, { useState } from 'react';
import { downloadFromIPFS } from '../utils/download_from_ipfs';
import { decryptFile } from '../utils/decryption';

const DownloadAndDecrypt: React.FC = () => {
  const [cid, setCid] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleCidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCid(e.target.value);
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecretKey(e.target.value);
  };

  const handleDownloadAndDecrypt = async () => {
    setIsLoading(true);
    setDownloadUrl(null);

    try {
      const encryptedBlob = await downloadFromIPFS(cid);
      const decryptedBlob = await decryptFile(encryptedBlob, secretKey);

      // 生成下载 URL
      const url = URL.createObjectURL(decryptedBlob);
      setDownloadUrl(url);
    } catch (error) {
      console.error('Error during download and decryption:', error);
      alert('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Download and Decrypt File</h2>
      <div className="mb-4">
        <label htmlFor="cid" className="block text-sm font-medium text-gray-700">
          CID:
        </label>
        <input
          type="text"
          value={cid}
          onChange={handleCidChange}
          className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="secretKey" className="block text-sm font-medium text-gray-700">
          Decryption Key:
        </label>
        <input
          type="text"
          value={secretKey}
          onChange={handleKeyChange}
          className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm w-full"
        />
      </div>
      <button
        onClick={handleDownloadAndDecrypt}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        {isLoading ? 'Processing...' : 'Download and Decrypt'}
      </button>
      {isLoading && (
        <div className="mt-4">
          <p>Loading...</p>
        </div>
      )}
      {downloadUrl && (
        <div className="mt-4">
          <a href={downloadUrl} download="decrypted_file.pdf" className="text-blue-500 underline">
            Click here to download the decrypted file
          </a>
        </div>
      )}
    </div>
  );
};

export default DownloadAndDecrypt;
