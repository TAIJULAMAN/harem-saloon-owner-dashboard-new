"use client";

import React, { useState, useRef, useEffect } from "react";
import { User, File, Download, UploadCloud } from "lucide-react";
import Link from "next/link";

// Helper component for signature canvas
function SignatureCanvas({ onSave, onCancel }: { onSave: (img: string) => void, onCancel: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Set actual size in memory (scaled to account for extra pixel density if needed, but keeping it simple here)
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#1E293B";
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.beginPath();
    }
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      onSave(canvas.toDataURL());
    }
  };

  return (
    <div className="mt-2">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
        className="w-full h-[150px] border border-dashed border-[#CBD5E1] rounded-[12px] bg-white cursor-crosshair touch-none"
      />
      <div className="flex items-center gap-3 mt-4">
        <button onClick={onCancel} className="px-4 py-2 text-[13px] font-medium text-[#64748B] hover:bg-[#F1F5F9] rounded-lg transition-colors">
          Cancel
        </button>
        <button onClick={clearCanvas} className="px-4 py-2 text-[13px] font-medium text-[#F43F5E] bg-[#FDF2F8] hover:bg-[#FCE7F3] rounded-lg transition-colors">
          Reset
        </button>
        <button onClick={handleSave} className="px-4 py-2 text-[13px] font-medium text-[#0D9488] bg-[#F0FDFA] hover:bg-[#CCFBF1] rounded-lg transition-colors">
          Save Signature
        </button>
      </div>
    </div>
  );
}

export default function DocumentSigningPage() {
  const [signer2Signature, setSigner2Signature] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Checkboxes state
  const [checks, setChecks] = useState({
    terms: false,
    documents: false,
    accurate: false,
    privacy: false
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[20px] font-semibold text-[#1E293B]">Document Signing</h1>
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 30L20 15L27.5 30H32.5L20 5L7.5 30H12.5Z" fill="#635BFF" />
            </svg>
            <span className="text-[#635BFF] font-bold text-xl">Your logo</span>
          </div>
        </div>

        {/* Signers Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Signer 1 */}
          <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[#EEF2FF] rounded-lg flex items-center justify-center text-[#635BFF]">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#1E293B]">Signer 1</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 text-[11px] font-medium text-[#0D9488] bg-[#CCFBF1] rounded-lg">Pre-signed</span>
                  <span className="px-2 py-0.5 text-[11px] font-medium text-white bg-[#10B981] rounded-lg">Signed</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[11px] text-[#94A3B8] uppercase font-bold tracking-wider mb-1">NAME</p>
                <p className="text-[14px] font-medium text-[#1E293B]">Mario Rossi</p>
              </div>
              <div>
                <p className="text-[11px] text-[#94A3B8] uppercase font-bold tracking-wider mb-1">EMAIL</p>
                <p className="text-[14px] font-medium text-[#1E293B]">mario.rossi@email.com</p>
              </div>
              <div>
                <p className="text-[11px] text-[#94A3B8] uppercase font-bold tracking-wider mb-1">CATEGORY OF SIGNER</p>
                <p className="text-[14px] font-medium text-[#1E293B]">Owner</p>
              </div>
              <div>
                <p className="text-[11px] text-[#94A3B8] uppercase font-bold tracking-wider mb-2">SIGNATURE</p>
                <div className="w-full h-[150px] border border-dashed border-[#CBD5E1] rounded-[12px] flex items-center justify-center bg-[#F8FAFC]">
                  {/* Mock signature for pre-signed */}
                  <span className="font-caveat text-4xl text-gray-800 transform -rotate-2">Vicky</span>
                </div>
              </div>
            </div>
          </div>

          {/* Signer 2 */}
          <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[#EEF2FF] rounded-lg flex items-center justify-center text-[#635BFF]">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#1E293B]">Signer 2</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 text-[11px] font-medium text-[#635BFF] bg-[#EEF2FF] rounded-lg">Recipient</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[11px] text-[#94A3B8] uppercase font-bold tracking-wider mb-1">NAME</p>
                <p className="text-[14px] font-medium text-[#1E293B]">Client Name</p>
              </div>
              <div>
                <p className="text-[11px] text-[#94A3B8] uppercase font-bold tracking-wider mb-1">EMAIL</p>
                <p className="text-[14px] font-medium text-[#1E293B]">client@email.com</p>
              </div>
              <div>
                <p className="text-[11px] text-[#94A3B8] uppercase font-bold tracking-wider mb-1">CATEGORY OF SIGNER</p>
                <p className="text-[14px] font-medium text-[#1E293B]">Client</p>
              </div>
              <div>
                <p className="text-[11px] text-[#94A3B8] uppercase font-bold tracking-wider mb-2">SIGNATURE</p>

                {signer2Signature ? (
                  <div className="w-full h-[150px] border border-dashed border-[#CBD5E1] rounded-[12px] flex items-center justify-center bg-white relative">
                    <img src={signer2Signature} alt="Signature" className="max-h-[130px] object-contain" />
                    <button
                      onClick={() => setSigner2Signature(null)}
                      className="absolute top-2 right-2 text-xs bg-[#F1F5F9] px-2 py-1 rounded text-[#64748B] hover:text-[#EF4444]"
                    >
                      Clear
                    </button>
                  </div>
                ) : isDrawing ? (
                  <SignatureCanvas
                    onCancel={() => setIsDrawing(false)}
                    onSave={(img) => {
                      setSigner2Signature(img);
                      setIsDrawing(false);
                    }}
                  />
                ) : (
                  <div
                    onClick={() => setIsDrawing(true)}
                    className="w-full h-[150px] border border-dashed border-[#CBD5E1] rounded-[12px] flex items-center justify-center bg-white cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                  >
                    <span className="text-[14px] font-medium text-[#635BFF]">Click to draw</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Required Fields */}
        <div className="mb-8">
          <h2 className="text-[15px] font-bold text-[#1E293B] mb-4">Required Fields For Signer</h2>
          <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-sm">
            <label className="block text-[13px] font-medium text-[#1E293B] mb-2">Waiver Name *</label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full md:w-1/2 border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-[#635BFF]"
            />
          </div>
        </div>

        {/* Contract Attachments */}
        <div className="mb-8">
          <h2 className="text-[15px] font-bold text-[#1E293B] mb-4">Contract Attachments</h2>
          <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-sm">
            <div className="border border-[#E2E8F0] rounded-[16px] p-6 flex flex-col items-center text-center bg-[#F8FAFC] w-full max-w-[280px]">
              <div className="w-12 h-12 rounded-lg bg-[#EEF2FF] flex items-center justify-center mb-4">
                <File className="w-6 h-6 text-[#635BFF]" />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B] mb-1">Chamber of commerce certificate</h4>
              <p className="text-[12px] font-medium text-[#94A3B8] mb-1">PDF - 2.1 MB</p>
              <p className="text-[12px] font-medium text-[#94A3B8] mb-6">Updated: March 15, 2024</p>

              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#635BFF] flex items-center justify-center hover:bg-[#E0E7FF]">
                  <EyeIcon className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#FDF2F8] text-[#F43F5E] flex items-center justify-center hover:bg-[#FCE7F3]">
                  <TrashIcon className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#475569] flex items-center justify-center hover:bg-[#E2E8F0]">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Attachment Requirement */}
        <div className="mb-8">
          <h2 className="text-[15px] font-bold text-[#1E293B] mb-4">Attachment Requirement</h2>
          <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-sm">
            <label className="block text-[13px] font-medium text-[#1E293B] mb-2">Requirement 1 *</label>
            <div className="border border-dashed border-[#CBD5E1] rounded-[16px] p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-[#F8FAFC] transition-colors">
              <div className="w-12 h-12 bg-[#EEF2FF] rounded-lg flex items-center justify-center text-[#635BFF] mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-[14px] font-medium text-[#635BFF]">Drop here or click to browse</p>
            </div>
          </div>
        </div>

        {/* Document Preview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-bold text-[#1E293B]">Document Name</h2>
            <button className="bg-[#EEF2FF] text-[#635BFF] px-4 py-2 rounded-lg text-[12px] font-bold flex items-center gap-2 hover:bg-[#E0E7FF] transition-colors uppercase tracking-wide">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-12 shadow-sm flex justify-center overflow-hidden h-[800px] overflow-y-auto">
            <div className="max-w-[700px] w-full">
              <div className="flex items-center justify-between mb-12">
                <h1 className="text-2xl font-bold text-[#1E293B]">Document Name</h1>
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 30L20 15L27.5 30H32.5L20 5L7.5 30H12.5Z" fill="#635BFF" />
                  </svg>
                  <span className="text-[#635BFF] font-bold text-lg">Your logo</span>
                </div>
              </div>

              <div className="space-y-6 text-[14px] text-[#475569] leading-relaxed">
                <div>
                  <h3 className="font-bold text-[#1E293B] mb-2">What is Lorem Ipsum?</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#1E293B] mb-2">Why do we use it?</h3>
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#1E293B] mb-2">Where does it come from?</h3>
                  <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#1E293B] mb-2">Where can I get some?</h3>
                  <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                </div>
              </div>

              <div className="mt-24 grid grid-cols-2 gap-12">
                <div>
                  <div className="border-b border-[#E2E8F0] pb-2 mb-2">
                    {/* Simulated Signature */}
                  </div>
                  <p className="text-[12px] text-[#64748B] text-center">Mario Rossi (Owner)</p>
                </div>
                <div>
                  <div className="border-b border-[#E2E8F0] pb-2 mb-2">
                    {signer2Signature && <img src={signer2Signature} alt="Signature" className="h-10 object-contain mx-auto" />}
                  </div>
                  <p className="text-[12px] text-[#64748B] text-center">Client Name (Client)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-sm mb-8 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checks.terms}
              onChange={(e) => setChecks({ ...checks, terms: e.target.checked })}
              className="w-5 h-5 rounded border-[#CBD5E1] text-[#635BFF] focus:ring-[#635BFF]"
            />
            <span className="text-[14px] text-[#475569]">I agree to the Terms and Conditions</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checks.documents}
              onChange={(e) => setChecks({ ...checks, documents: e.target.checked })}
              className="w-5 h-5 rounded border-[#CBD5E1] text-[#635BFF] focus:ring-[#635BFF]"
            />
            <span className="text-[14px] text-[#475569]">I confirm that I have read and understood all documents</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checks.accurate}
              onChange={(e) => setChecks({ ...checks, accurate: e.target.checked })}
              className="w-5 h-5 rounded border-[#CBD5E1] text-[#635BFF] focus:ring-[#635BFF]"
            />
            <span className="text-[14px] text-[#475569]">I acknowledge that the information provided is accurate</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checks.privacy}
              onChange={(e) => setChecks({ ...checks, privacy: e.target.checked })}
              className="w-5 h-5 rounded border-[#CBD5E1] text-[#635BFF] focus:ring-[#635BFF]"
            />
            <span className="text-[14px] text-[#475569]">I accept the privacy policy</span>
          </label>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pb-12">
          <Link
            href="/dashboard/waivers"
            className="bg-[#635BFF] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#524be0] transition-colors shadow-lg shadow-[#635BFF]/30"
          >
            Save & Send
          </Link>
        </div>

      </div>
    </div>
  );
}

// Simple icons for the attachment card
function EyeIcon(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
}

function TrashIcon(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;
}
