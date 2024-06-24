import axios from 'axios';

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;

if (!PINATA_API_KEY || !PINATA_SECRET_API_KEY) {
  throw new Error('Missing Pinata API key or secret. Please check your environment variables.');
}

export const uploadToIPFS = async (file: Blob): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_API_KEY,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data && response.data.IpfsHash) {
      return response.data.IpfsHash;
    } else {
      throw new Error('Failed to retrieve CID from Pinata response.');
    }
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw new Error('Error uploading to Pinata');
  }
};
