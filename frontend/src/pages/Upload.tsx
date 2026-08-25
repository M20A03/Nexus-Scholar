import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { UploadCloud } from 'lucide-react';

const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      await axios.post('http://localhost:4000/api/ingest/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Document ingested and knowledge graph updated!');
      setFile(null);
    } catch (error) {
      toast.error('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ingest Data</h2>
        <p className="text-gray-500 mb-8">Upload PDFs, Markdown, or Code zips to extract entities and build the graph.</p>
        
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center transition-all ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
        >
          <UploadCloud size={48} className={`mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
          
          {file ? (
            <div className="text-center">
              <p className="text-lg font-medium text-gray-800">{file.name}</p>
              <p className="text-sm text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg font-medium text-gray-700">Drag & drop your file here</p>
              <p className="text-sm text-gray-500 mt-2">or click to browse from your computer</p>
            </div>
          )}
          
          <input 
            type="file" 
            className="hidden" 
            id="file-upload" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
          />
          <label 
            htmlFor="file-upload" 
            className="mt-6 cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            Select File
          </label>
        </div>

        {file && (
          <button 
            onClick={handleUpload}
            disabled={uploading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {uploading ? 'Processing & Extracting Entities...' : 'Upload & Build Graph'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Upload;
