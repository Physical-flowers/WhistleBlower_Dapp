// pages/api/documents.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface Document {
  id: string;
  name: string;
  url: string;
}

// 模擬的文件數量要夠多才可以有 Scroll Bar
const documents: Document[] = [
  { id: '1', name: 'Document 1.pdf', url: '/documents/document1.pdf' },
  { id: '2', name: 'Document 2.pdf', url: '/documents/document2.pdf' },
  { id: '3', name: 'Document 3.pdf', url: '/documents/document3.pdf' },
  { id: '4', name: 'Document 4.pdf', url: '/documents/document4.pdf' },
  { id: '5', name: 'Document 5.pdf', url: '/documents/document5.pdf' },
  { id: '6', name: 'Document 6.pdf', url: '/documents/document6.pdf' },
  { id: '7', name: 'Document 7.pdf', url: '/documents/document7.pdf' },
  { id: '8', name: 'Document 8.pdf', url: '/documents/document8.pdf' },
  { id: '9', name: 'Document 9.pdf', url: '/documents/document9.pdf' },
  { id: '10', name: 'Document 10.pdf', url: '/documents/document10.pdf' },
  { id: '11', name: 'Document 11.pdf', url: '/documents/document11.pdf' },
  { id: '12', name: 'Document 12.pdf', url: '/documents/document12.pdf' },
  { id: '13', name: 'Document 13.pdf', url: '/documents/document13.pdf' },
  { id: '14', name: 'Document 14.pdf', url: '/documents/document14.pdf' },
  { id: '15', name: 'Document 15.pdf', url: '/documents/document15.pdf' },
  { id: '16', name: 'Document 16.pdf', url: '/documents/document16.pdf' },
  { id: '17', name: 'Document 17.pdf', url: '/documents/document17.pdf' },
  { id: '18', name: 'Document 18.pdf', url: '/documents/document18.pdf' },
  { id: '19', name: 'Document 19.pdf', url: '/documents/document19.pdf' },
  { id: '20', name: 'Document 20.pdf', url: '/documents/document20.pdf' },
  { id: '21', name: 'Document 21.pdf', url: '/documents/document21.pdf' },
  { id: '22', name: 'Document 22.pdf', url: '/documents/document22.pdf' },
  { id: '23', name: 'Document 23.pdf', url: '/documents/document23.pdf' },
  { id: '24', name: 'Document 24.pdf', url: '/documents/document24.pdf' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(documents);
}
