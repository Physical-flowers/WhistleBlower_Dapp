import axios from 'axios';

export const downloadFromIPFS = async (cid: string): Promise<Blob> => {
  try {
    const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
    const response = await axios.get(url, { responseType: 'blob' });
    return response.data;
  } catch (error) {
    console.error('Error downloading from IPFS:', error);
    throw new Error('Error downloading from IPFS');
  }
};
