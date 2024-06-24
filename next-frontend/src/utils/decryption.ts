import CryptoJS from 'crypto-js';

export const decryptFile = (encryptedBlob: Blob, secretKey: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const decrypted = CryptoJS.AES.decrypt(e.target.result as string, secretKey);
        const typedArray = new Uint8Array(decrypted.words.map(word => {
          return [(word >> 24) & 0xff, (word >> 16) & 0xff, (word >> 8) & 0xff, word & 0xff];
        }).reduce((acc, val) => acc.concat(val), []));
        const decryptedBlob = new Blob([typedArray.buffer], { type: 'application/pdf' });
        resolve(decryptedBlob);
      } else {
        reject(new Error('File reading failed'));
      }
    };
    reader.onerror = () => reject(new Error('File reading failed'));
    reader.readAsText(encryptedBlob);
  });
};
