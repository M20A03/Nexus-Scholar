import React, { useState, useCallback, useEffect } from 'react';
import { Upload as UploadIcon, X, FileText, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { io } from 'socket.io-client';
import ProcessingPipeline from '../components/ProcessingPipeline';

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  
  useEffect(() => {
    // Connect to Socket.io for live updates
    const socket = io('http://localhost:4000');
    
    socket.on('ingest_progress', (data) => {
      setStatusMessage(data.status);
      if (data.status === 'Complete') {
        setStatus('success');
        setProgress(100);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setStatus('uploading');
    setProgress(10);
    setStatusMessage('Uploading files to server...');
    
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('http://localhost:4000/api/ingest/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Upload failed');
      
      setStatus('processing');
      setProgress(50);
      setStatusMessage('Files uploaded. Awaiting AI processing...');
      // Note: The rest of the updates come from the Socket.io connection
      
    } catch (error) {
      console.error(error);
      setStatus('error');
      setStatusMessage('An error occurred during upload.');
      setUploading(false);
    }
  };

  const reset = () => {
    setFiles([]);
    setUploading(false);
    setStatus('idle');
    setProgress(0);
    setStatusMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="academic-title text-3xl mb-2">Ingest Data</h1>
        <p className="text-slate-500">
          Upload research papers, Markdown files, or code repositories to automatically extract entities and relationships into the Knowledge Graph.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="academic-card p-6">
            <h3 className="font-serif font-bold text-lg text-slate-800 mb-4">Upload Documents</h3>
            
            {status === 'idle' || status === 'error' ? (
              <>
                <div 
                  className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${
                    isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
                  }`}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mb-4 text-slate-400">
                      <UploadIcon size={28} />
                    </div>
                    <p className="text-slate-700 font-medium mb-1">Drag & drop files here</p>
                    <p className="text-sm text-slate-500 mb-6">Supports PDF, Markdown, TXT, and ZIP (Code)</p>
                    
                    <label className="btn-secondary cursor-pointer">
                      Browse Files
                      <input type="file" multiple className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>

                {status === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="text-red-500 mt-0.5" size={18} />
                    <div>
                      <h4 className="text-sm font-semibold text-red-800">Upload Failed</h4>
                      <p className="text-sm text-red-600">{statusMessage}</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="border border-slate-200 rounded-xl p-8 bg-slate-50 text-center">
                <div className="w-16 h-16 mx-auto bg-white shadow-sm rounded-full flex items-center justify-center mb-6">
                  {status === 'success' ? (
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  ) : (
                    <Loader2 size={32} className="text-blue-500 animate-spin" />
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {status === 'success' ? 'Processing Complete' : 'Processing Documents'}
                </h3>
                
                <p className="text-slate-600 text-sm mb-6">{statusMessage}</p>
                
                <div className="w-full bg-slate-200 rounded-full h-2 mb-6 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      status === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                {status === 'success' && (
                  <button onClick={reset} className="btn-secondary">
                    Upload More Files
                  </button>
                )}
              </div>
            )}
          </div>

          {files.length > 0 && status === 'idle' && (
            <div className="academic-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif font-bold text-lg text-slate-800">Selected Files ({files.length})</h3>
                <button 
                  onClick={startUpload} 
                  disabled={uploading}
                  className="btn-primary"
                >
                  Start Ingestion
                </button>
              </div>
              
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-white rounded shadow-sm text-slate-500 shrink-0">
                        <FileText size={16} />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-medium text-slate-700 truncate">{file.name}</p>
                        <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFile(i)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <ProcessingPipeline activeStep={status === 'success' ? 5 : status === 'processing' ? 2 : status === 'uploading' ? 1 : 0} />
        </div>
      </div>
    </div>
  );
}
