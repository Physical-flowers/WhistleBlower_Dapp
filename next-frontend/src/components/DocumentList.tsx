// components/DocumentList.tsx
import React, { useEffect, useState } from 'react';

interface Document {
  id: string;
  name: string;
  url: string;
}

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await fetch('/api/documents');
      const data = await response.json();
      setDocuments(data);
    };

    fetchDocuments();
  }, []);

  return (
    <div className="h-full overflow-y-auto"> {/* 确保有滚动条 */}
      <h2 className="text-xl font-bold p-4">文件列表</h2>
      <ul>
        {documents.map((document) => (
          <li key={document.id} className="p-4 border-b border-gray-300">
            <a href={document.url} download={document.name} className="text-blue-500 hover:underline">
              {document.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
