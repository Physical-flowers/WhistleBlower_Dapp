import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import axios, { AxiosError } from 'axios';
import { IncomingMessage } from 'http';

// 設置 multer
const upload = multer({ storage: multer.memoryStorage() });

interface ExtendedNextApiRequest extends NextApiRequest {
  file: Express.Multer.File;
}

// 使用 Promise 包裝中間件
const runMiddleware = (req: IncomingMessage, res: any, fn: Function) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async (req: NextApiRequest & { file: any }, res: NextApiResponse) => {
  await runMiddleware(req, res, upload.single('pdfFile'));

  const { email, walletAddress, token } = req.body;
  const pdfFile = req.file;

  if (!pdfFile || !email || !walletAddress || !token) {
    return res.status(400).send('Missing required fields');
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const link = `${baseUrl}/verify?token=${token}`;

  try {
    console.log(`發送的連結：${link}`);
    await axios.post('YOUR_PYTHON_BACKEND_API_URL', {
      email,
      walletAddress,
      pdfFile: pdfFile.buffer.toString('base64'),
      link,
    });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (axios.isAxiosError(error)) {
      if (error.response) {
        // 伺服器響應的錯誤
        errorMessage = error.response.data?.message || error.response.statusText;
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

    console.error('Error sending email to Python backend:', errorMessage);
    res.status(500).json({ error: 'Failed to send email', details: errorMessage });
  }
};

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, let multer handle it
  },
};
