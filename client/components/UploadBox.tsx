import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Check, Loader } from 'lucide-react';
import { analyzePlantImage } from '../lib/plantModel';

interface UploadBoxProps {
  isLoggedIn?: boolean;
  onLoginRequired?: () => void;
  onImageSelected?: (file: File, preview: string) => void;
}

export default function UploadBox({ isLoggedIn = false, onLoginRequired, onImageSelected }: UploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const acceptedFormats = ['.jpg', '.jpeg', '.png', '.webp'];

  const handleFile = (file: File) => {
    if (!isLoggedIn) {
      onLoginRequired?.();
      return;
    }

    if (!acceptedFormats.some((format) => file.name.toLowerCase().endsWith(format))) {
      alert('Please upload a valid image format: JPG, JPEG, PNG, or WEBP');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      onImageSelected?.(file, reader.result as string);
      
      // Show success toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  // Old - Previous backend detection method
  // const handleDetect = async () => {
  //   if (!selectedFile || !preview) return;

  //   setIsAnalyzing(true);
  //   try {
  //     const formData = new FormData();
  //     formData.append('image', selectedFile);

  //     const response = await fetch('/api/detect', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setAnalysisResult(data.result || 'Analysis completed. Your crop appears to be healthy!');
  //     } else {
  //       setAnalysisResult('Unable to analyze image. Please try again.');
  //     }
  //   } catch (error) {
  //     setAnalysisResult('Error analyzing image. Please try again.');
  //     console.error('Upload error:', error);
  //   } finally {
  //     setIsAnalyzing(false);
  //   }
  // };

  // Arxhana - Hybrid TensorFlow.js + Gemini approach
  const handleDetect = async () => {
    if (!selectedFile || !preview) return;

    setIsAnalyzing(true);
    try {
      console.log('Step 1: Analyzing image with TensorFlow.js...');
      
      // Arxhana - Step 1: Use TensorFlow.js to detect disease
      const tfResult = await analyzePlantImage(selectedFile);
      console.log('TensorFlow.js result:', tfResult);
      
      console.log('Step 2: Getting recommendations from Gemini...');
      
      // Arxhana - Step 2: Get detailed recommendations from Gemini
      const { getFunctions, httpsCallable } = await import('firebase/functions');
      const { initializeApp, getApps } = await import('firebase/app');
      
      const firebaseConfig = {
        apiKey: "AIzaSyB-Sfq9rFVaN9auKobciJrc_DxMDpw_iHs",
        authDomain: "cropsaavy.firebaseapp.com",
        projectId: "cropsaavy",
        storageBucket: "cropsaavy.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:123456789:web:abcdef123456"
      };
      
      // Arxhana - Initialize Firebase app only if not already initialized
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      const functions = getFunctions(app);
      const getRecommendations = httpsCallable(functions, 'getPlantRecommendations');
      
      // Arxhana - Call Gemini for detailed recommendations
      const geminiResult = await getRecommendations({ 
        disease: tfResult.disease, 
        confidence: tfResult.confidence 
      });
      const geminiData = geminiResult.data as any;
      
      console.log('Gemini result:', geminiData);
      
      // Arxhana - Combine TensorFlow.js detection + Gemini recommendations
      if (tfResult.isHealthy) {
        setAnalysisResult(`🌱 Great news! Your plant appears to be healthy!\n\n${geminiData.recommendations}`);
      } else {
        setAnalysisResult(
          `🔍 Disease Detected: ${tfResult.disease} (${tfResult.confidence}% confidence)\n\n` +
          `📋 AI Recommendations:\n${geminiData.recommendations}`
        );
      }
      
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisResult('Error analyzing image. Please try again later.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreview(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative rounded-3xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
          dragActive
            ? 'border-green-400 bg-green-900/40'
            : 'border-green-700/50 bg-green-900/20 hover:bg-green-900/30'
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-green-700/10" />
        </div>

        {/* Content */}
        <div className="p-12 text-center">
          {!preview ? (
            <motion.div
              animate={{ scale: dragActive ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
              onClick={() => !isLoggedIn && onLoginRequired ? onLoginRequired() : fileInputRef.current?.click()}
              className="space-y-4"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center"
              >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-green-600/40 to-green-700/30">
                  <Upload className="w-10 h-10 text-green-300" />
                </div>
              </motion.div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Upload Crop Image</h3>
                <p className="text-green-200/70 mb-2">Drag and drop your image or click to browse</p>
                <p className="text-green-200/50 text-sm">Supported formats: JPG, PNG, WEBP (Max 10MB)</p>
              </div>

              {!isLoggedIn && (
                <p className="text-yellow-400 text-sm mt-4">👤 Please log in to upload images</p>
              )}
            </motion.div>
          ) : (
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative inline-block max-w-sm mx-auto"
              >
                <img src={preview} alt="Preview" className="rounded-2xl max-h-96 object-cover shadow-lg" />

                {/* Clear button */}
                {!isAnalyzing && !analysisResult && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </motion.div>

              {/* Beautiful Results Display */}
              {analysisResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-5xl mx-auto"
                >
                  {/* Elegant Header */}
                  <div className="bg-gradient-to-r from-green-800/50 to-emerald-800/50 rounded-t-3xl p-6 border-x border-t border-green-500/30 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/20 rounded-2xl border border-green-400/30">
                          <Check className="w-7 h-7 text-green-300" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white tracking-wide">Analysis Complete</h3>
                          <p className="text-green-200/80 text-sm font-medium">AI-Powered Crop Health Assessment</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-green-300 mb-1">✓</div>
                        <p className="text-green-200/70 text-xs uppercase tracking-wider">Verified</p>
                      </div>
                    </div>
                  </div>

                  {/* Beautiful Content */}
                  <div className="bg-gradient-to-b from-slate-900/40 to-slate-800/60 border-x border-green-500/30 p-8 backdrop-blur-sm">
                    <div className="space-y-8">
                      {analysisResult.split('\n\n').map((section, index) => {
                        const lines = section.split('\n');
                        const title = lines[0];
                        const content = lines.slice(1).join('\n');
                        
                        // Consistent green color scheme for all cards
                        const colors = {
                          bg: 'from-green-900/40 to-green-800/30',
                          border: 'border-green-500/40',
                          title: 'text-green-300',
                          content: 'text-green-50/95',
                          accent: 'bg-green-500/20'
                        };
                        
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} shadow-2xl hover:shadow-3xl transition-all duration-500 group backdrop-blur-sm`}
                          >
                            {/* Elegant background effects */}
                            <div className="absolute inset-0 opacity-10">
                              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
                              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl transform -translate-x-16 translate-y-16"></div>
                            </div>
                            
                            <div className="relative p-8">
                              {/* Stylish Header */}
                              <div className="flex items-center gap-4 mb-6">
                                <div className={`w-1 h-12 rounded-full ${colors.accent} shadow-lg`}></div>
                                <h4 className={`font-bold text-2xl ${colors.title} tracking-wide leading-tight`}>
                                  {title}
                                </h4>
                              </div>
                              
                              {/* Beautiful Content */}
                              {content && (
                                <div className={`${colors.content} space-y-4`}>
                                  {content.split('\n').filter(line => line.trim()).map((line, lineIndex) => {
                                    const isImportant = line.includes('IMPORTANT') || line.includes('CRITICAL') || line.includes('EMERGENCY');
                                    const isBullet = line.trim().startsWith('-') || line.trim().startsWith('•');
                                    
                                    return (
                                      <motion.div
                                        key={lineIndex}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (index * 0.2) + (lineIndex * 0.1), duration: 0.6 }}
                                        className={`text-lg leading-relaxed ${
                                          isImportant ? `font-semibold ${colors.accent} px-4 py-3 rounded-xl border-l-4 ${colors.border} shadow-lg` :
                                          isBullet ? 'ml-6 pl-4 border-l-2 border-current/30' :
                                          'mb-3'
                                        } transition-all duration-300 hover:translate-x-2 hover:scale-[1.02]`}
                                      >
                                        <p className="font-medium">{line.trim()}</p>
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                            
                            {/* Elegant hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -skew-x-12 translate-x-full group-hover:translate-x-[-300%]"></div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Elegant Footer */}
                  <div className="bg-gradient-to-r from-green-800/50 to-emerald-800/50 rounded-b-3xl p-6 border-x border-b border-green-500/30 backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
                      <div className="text-center sm:text-left">
                        <p className="text-green-200/90 font-medium mb-1">Analysis powered by advanced AI technology</p>
                        <p className="text-green-300/70 text-sm">For professional consultation, contact your local agricultural extension</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearImage}
                        className="px-8 py-4 bg-gradient-to-r from-green-600/60 to-emerald-600/60 hover:from-green-500/70 hover:to-emerald-500/70 border border-green-400/50 rounded-2xl text-white font-semibold flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
                      >
                        <Upload className="w-5 h-5" />
                        Analyze Another Image
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <p className="text-green-100/70">Image ready for analysis</p>
              )}
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleChange}
          className="hidden"
          disabled={!isLoggedIn}
        />
      </motion.div>

      {/* Detect button */}
      {preview && !analysisResult && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDetect}
          disabled={isAnalyzing}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all ${
            isAnalyzing
              ? 'bg-green-600/50 text-white cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-2xl hover:shadow-green-500/50'
          }`}
        >
          {isAnalyzing ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="w-5 h-5 animate-spin" />
              Analyzing with AI...
            </div>
          ) : (
            'Detect Disease'
          )}
        </motion.button>
      )}

      {/* Success Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-6 right-6 z-50 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl border border-green-400/50 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/30 rounded-full">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">Upload Successful!</p>
              <p className="text-green-100/80 text-sm">Image ready for analysis</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
