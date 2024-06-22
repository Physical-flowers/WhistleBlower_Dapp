// next-connect.d.ts
declare module 'next-connect' {
    import { NextApiRequest, NextApiResponse } from 'next';
  
    interface NextConnect {
      use: (...handlers: Array<(req: NextApiRequest, res: NextApiResponse, next: () => void) => void>) => this;
      get: (...handlers: Array<(req: NextApiRequest, res: NextApiResponse) => void>) => this;
      post: (...handlers: Array<(req: NextApiRequest, res: NextApiResponse) => void>) => this;
      put: (...handlers: Array<(req: NextApiRequest, res: NextApiResponse) => void>) => this;
      delete: (...handlers: Array<(req: NextApiRequest, res: NextApiResponse) => void>) => this;
      patch: (...handlers: Array<(req: NextApiRequest, res: NextApiResponse) => void>) => this;
      options: (...handlers: Array<(req: NextApiRequest, res: NextApiResponse) => void>) => this;
      handler: () => (req: NextApiRequest, res: NextApiResponse) => void;
    }
  
    export default function nextConnect(): NextConnect;
  }
  