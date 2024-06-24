import CryptoJS from 'crypto-js';

export const encryptFile = (file: File, secretKey: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const wordArray = CryptoJS.lib.WordArray.create(e.target.result as ArrayBuffer);
        const encrypted = CryptoJS.AES.encrypt(wordArray, secretKey).toString();
        const encryptedBlob = new Blob([encrypted], { type: file.type });
        resolve(encryptedBlob);
      } else {
        reject(new Error('File reading failed'));
      }
    };
    reader.onerror = () => reject(new Error('File reading failed'));
    reader.readAsArrayBuffer(file);
  });
};
