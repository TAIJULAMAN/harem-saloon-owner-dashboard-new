"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Map,
  Bold,
  Italic,
  Strikethrough,
  Code,
  PenTool,
  Heading1,
  Heading2,
  Pilcrow,
  List,
  ListOrdered,
  Image as ImageIcon,
  Quote,
  Minus,
  AlignLeft,
  AlignRight,
  Undo,
  Redo,
  Type,
  Hash,
  Calendar,
  Mail,
  Phone,
  MapPin,
  FileText,
  Edit2,
  Trash2,
  Plus,
  ChevronDown,
  Users,
  X,
  Inbox,
  File,
  Eye,
  Download,
  MousePointerClick
} from "lucide-react";

const REQ_TYPES = ["pdf", "docx", "png", "jpg", "jpeg"];

interface WaiverField {
  id: string;
  fieldName: string;
  label: string;
  type: string;
  placeholder: string;
  description: string;
  required: boolean;
}

const FIELD_TYPES = [
  { value: "Text", icon: Type },
  { value: "Number", icon: Hash },
  { value: "Date", icon: Calendar },
  { value: "Email", icon: Mail },
  { value: "Telephone", icon: Phone },
  { value: "Address", icon: MapPin },
  { value: "Text Area", icon: AlignLeft },
];

export default function ViewWaiverPage() {
  const [activeTab, setActiveTab] = useState("Required Fields For Signer");
  const [fields, setFields] = useState<WaiverField[]>([
    {
      id: "1",
      fieldName: "client_name",
      label: "Client Name",
      type: "Text",
      placeholder: "Enter client name",
      description: "Client's complete name",
      required: true,
    },
    {
      id: "2",
      fieldName: "client_name",
      label: "Client Name",
      type: "Text",
      placeholder: "Enter client name",
      description: "Client's complete name",
      required: true,
    }
  ]);
  const [signers, setSigners] = useState<{
    id: string;
    type: "Pre-signed" | "Recipient";
    category: string;
    name: string;
    email: string;
    isDrawing: boolean;
    signature: string | null;
  }[]>([
    {
      id: "1",
      type: "Pre-signed",
      category: "Owner",
      name: "Owner",
      email: "mario.rossi@email.com",
      isDrawing: false,
      signature: "Vicky",
    },
    {
      id: "2",
      type: "Recipient",
      category: "Owner",
      name: "Client Name",
      email: "",
      isDrawing: false,
      signature: null,
    }
  ]);
  const [isAddingField, setIsAddingField] = useState(false);
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [editingSignerId, setEditingSignerId] = useState<string | null>(null);
  const [contractAttachments, setContractAttachments] = useState<any[]>([
    {
      id: "1",
      name: "Chamber of Commerce Certificate",
      type: "PDF",
      size: "2.1 MB",
      updatedAt: "March 15, 2020",
      file: null
    }
  ]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newAttachmentName, setNewAttachmentName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadDocument = () => {
    if (!newAttachmentName || !selectedFile) return;

    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const sizeInMB = (selectedFile.size / (1024 * 1024)).toFixed(1);

    setContractAttachments([
      ...contractAttachments,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: newAttachmentName,
        type: selectedFile.name.split('.').pop()?.toUpperCase() || "DOC",
        size: `${sizeInMB} MB`,
        updatedAt: date,
        file: selectedFile
      }
    ]);

    setIsUploadModalOpen(false);
    setNewAttachmentName("");
    setSelectedFile(null);
  };

  const handleViewAttachment = (file: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
  };

  const handleDownloadAttachment = (file: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Attachment Requirements State
  const [attachmentRequirements, setAttachmentRequirements] = useState<any[]>([]);
  const [isAddingRequirement, setIsAddingRequirement] = useState(true);
  const [newRequirement, setNewRequirement] = useState({ name: "", types: [] as string[] });
  const [isReqTypesDropdownOpen, setIsReqTypesDropdownOpen] = useState(false);

  // New Field State
  const [newField, setNewField] = useState({
    fieldName: "",
    label: "",
    type: "Text",
    placeholder: "",
    description: "",
    required: false,
  });

  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);



  const addSigner = (type: "Pre-signed" | "Recipient") => {
    const newId = Math.random().toString(36).substr(2, 9);
    setSigners([
      ...signers,
      {
        id: newId,
        type,
        category: "Owner",
        name: "",
        email: "",
        isDrawing: false,
        signature: null,
      }
    ]);
    setEditingSignerId(newId);
    setIsAddSignerDropdownOpen(false);
  };

  const updateSigner = (id: string, updates: Partial<typeof signers[0]>) => {
    setSigners(signers.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSigner = (id: string) => {
    setSigners(signers.filter(s => s.id !== id));
  };

  const [isAddSignerDropdownOpen, setIsAddSignerDropdownOpen] = useState(false);
  const addSignerDropdownRef = useRef<HTMLDivElement>(null);
  const reqTypesDropdownRef = useRef<HTMLDivElement>(null);

  // Signature Drawing Logic
  const [signingSignerId, setSigningSignerId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawingSignature, setIsDrawingSignature] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawingSignature(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingSignature) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawingSignature(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawnSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !signingSignerId) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dataUrl = canvas.toDataURL();
    updateSigner(signingSignerId, { signature: dataUrl, isDrawing: false });
    setSigningSignerId(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(e.target as Node)) {
        setIsTypeDropdownOpen(false);
      }
      if (addSignerDropdownRef.current && !addSignerDropdownRef.current.contains(e.target as Node)) {
        setIsAddSignerDropdownOpen(false);
      }
      if (reqTypesDropdownRef.current && !reqTypesDropdownRef.current.contains(e.target as Node)) {
        setIsReqTypesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveField = () => {
    if (!newField.fieldName || !newField.label) return; // Simple validation

    if (editingFieldId) {
      setFields(fields.map(f => f.id === editingFieldId ? { ...f, ...newField } : f));
      setEditingFieldId(null);
    } else {
      setFields([
        ...fields,
        {
          id: Math.random().toString(36).substr(2, 9),
          fieldName: newField.fieldName,
          label: newField.label,
          type: newField.type,
          placeholder: newField.placeholder,
          description: newField.description,
          required: newField.required,
        }
      ]);
    }

    setNewField({
      fieldName: "",
      label: "",
      type: "Text",
      placeholder: "",
      description: "",
      required: false,
    });
    setIsAddingField(false);
  };

  const handleEditField = (field: WaiverField) => {
    setNewField({
      fieldName: field.fieldName,
      label: field.label,
      type: field.type,
      placeholder: field.placeholder,
      description: field.description || "",
      required: field.required,
    });
    setEditingFieldId(field.id);
    setIsAddingField(true);
  };

  const handleDeleteField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };


  const handleSaveRequirement = () => {
    if (!newRequirement.name || newRequirement.types.length === 0) return;
    setAttachmentRequirements([
      ...attachmentRequirements,
      {
        id: Math.random().toString(36).substr(2, 9),
        ...newRequirement
      }
    ]);
    setNewRequirement({ name: "", types: [] });
    setIsAddingRequirement(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6 lg:p-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 bg-white border border-[#E2E8F0] rounded-[16px] px-6 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/waivers" className="text-[#635BFF] hover:bg-[#EEF2FF] p-2 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-[16px] font-bold text-[#1E293B]">View Waiver</h1>
          </div>
          <div className="flex items-center gap-2 text-[13px] font-bold text-[#64748B]">
            <Map className="w-[18px] h-[18px]" />
            <span className="text-[#E2E8F0] text-[16px]">/</span>
            <span className="bg-[#EEF2FF] text-[#635BFF] px-3 py-1.5 rounded-lg text-[13px] font-medium">
              Waiver Templates
            </span>
          </div>
        </div>

        {/* Waiver Document Body */}
        <div className="bg-white border border-[#E2E8F0] rounded-[16px] mb-6 shadow-sm flex flex-col">
          {/* Content Area */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto">
            <h2 className="text-[18px] font-bold text-[#1E293B] mb-6">Waiver Name</h2>

            <div className="space-y-6 text-[13px] text-[#94A3B8] leading-relaxed">
              <div>
                <h3 className="font-bold text-[#475569] mb-2">What is Lorem Ipsum?</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#475569] mb-2">What is Lorem Ipsum?</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#475569] mb-2">What is Lorem Ipsum?</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fields and Attachments Card */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-visible">
          {/* Tabs */}
          <div className="flex items-center border-b border-[#E2E8F0] overflow-x-auto px-4 sm:px-8">
            {["Required Fields For Signer", "Signers", "Contract Attachments", "Attachment Requirement"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-4 text-[14px] font-bold whitespace-nowrap border-b-[3px] transition-colors ${activeTab === tab
                  ? "border-[#635BFF] text-[#635BFF]"
                  : "border-transparent text-[#64748B] hover:text-[#1E293B]"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {activeTab === "Required Fields For Signer" && (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-medium text-[#1E293B]">Required Fields For Signer</h3>
                  {(fields.length > 0 || isAddingField) && (
                    <button
                      onClick={() => setIsAddingField(true)}
                      className="bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF] px-5 py-2 rounded-lg font-medium text-[13px] flex items-center gap-2 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Field
                    </button>
                  )}
                </div>

                {/* Empty State */}
                {!isAddingField && fields.length === 0 && (
                  <div className="border border-[#E2E8F0] rounded-lg p-12 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center mb-4">
                      <FileText className="w-8 h-8 text-[#64748B]" />
                    </div>
                    <h4 className="text-[14px] font-bold text-[#1E293B] mb-4">No fields added</h4>
                    <button
                      onClick={() => setIsAddingField(true)}
                      className="bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF] px-6 py-2.5 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Field
                    </button>
                  </div>
                )}

                {/* Fields List & Add Form */}
                {(fields.length > 0 || isAddingField) && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                    {/* Existing Fields */}
                    {fields.map((field) => (
                      <div key={field.id} className="border border-[#E2E8F0] rounded-[16px] p-6 space-y-5 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-lg bg-[#F8FAFC] flex items-center justify-center flex-shrink-0">
                              {FIELD_TYPES.find(t => t.value === field.type)?.icon && React.createElement(FIELD_TYPES.find(t => t.value === field.type)!.icon, { className: "w-6 h-6 text-[#64748B]" })}
                            </div>
                            <div>
                              <h4 className="text-[15px] font-medium text-[#1E293B]">{field.label}</h4>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[11px] font-medium text-[#475569] bg-[#F1F5F9] px-2.5 py-0.5 rounded-lg">{field.type}</span>
                                {field.required && (
                                  <span className="text-[11px] font-medium text-[#F43F5E] bg-[#FDF2F8] px-2.5 py-0.5 rounded-lg">Required</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditField(field)}
                              className="w-9 h-9 rounded-lg bg-[#F0F9FF] text-[#38BDF8] flex items-center justify-center hover:bg-[#E0F2FE] transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteField(field.id)}
                              className="w-9 h-9 rounded-lg bg-[#FDF2F8] text-[#F43F5E] flex items-center justify-center hover:bg-[#FCE7F3] transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-1">
                          <div>
                            <p className="text-[12px] font-medium text-[#94A3B8] mb-1">Field Name</p>
                            <p className="text-[14px] font-medium text-[#1E293B]">{field.fieldName}</p>
                          </div>
                          <div>
                            <p className="text-[12px] font-medium text-[#94A3B8] mb-1">Placeholder</p>
                            <p className="text-[14px] font-medium text-[#1E293B]">{field.placeholder || "-"}</p>
                          </div>
                          {field.description && (
                            <div className="col-span-2 pt-1">
                              <p className="text-[12px] font-medium text-[#94A3B8] mb-1">Description</p>
                              <p className="text-[14px] font-medium text-[#1E293B]">{field.description}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </>
            )}

            {activeTab === "Signers" && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[16px] font-medium text-[#1E293B]">Signers</h3>

                  <div className="relative" ref={addSignerDropdownRef}>
                    <button
                      onClick={() => setIsAddSignerDropdownOpen(!isAddSignerDropdownOpen)}
                      className="bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF] px-4 py-2 rounded-lg font-medium text-[13px] flex items-center gap-2 transition-colors"
                    >
                      Add Signer
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {isAddSignerDropdownOpen && (
                      <div className="absolute top-[calc(100%+8px)] right-0 w-32 bg-white rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-[#E2E8F0] py-2 z-10">
                        <button
                          onClick={() => addSigner("Pre-signed")}
                          className="w-full px-4 py-2 text-[13px] text-[#475569] hover:bg-[#F8FAFC] text-left transition-colors font-medium"
                        >
                          Pre-signed
                        </button>
                        <button
                          onClick={() => addSigner("Recipient")}
                          className="w-full px-4 py-2 text-[13px] text-[#475569] hover:bg-[#F8FAFC] text-left transition-colors font-medium"
                        >
                          Recipient
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  {signers.map((signer, index) => (
                    <div key={signer.id} className="border border-[#E2E8F0] rounded-[16px] p-6 space-y-5 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-fit">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-[12px] bg-[#EEF2FF] flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-[#635BFF]" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <h4 className="text-[14px] font-bold text-[#1E293B] leading-none">{signer.name}</h4>
                            <div className="flex items-center gap-2">
                              {signer.type === "Pre-signed" ? (
                                <>
                                  <span className="bg-[#ECFEFF] text-[#14B8A6] px-2 py-0.5 rounded-[4px] text-[10px] font-bold">Pre-signed</span>
                                  {signer.signature && <span className="bg-[#22C55E] text-white px-2 py-0.5 rounded-[4px] text-[10px] font-bold">Signed</span>}
                                </>
                              ) : (
                                <span className="bg-[#EEF2FF] text-[#635BFF] px-2 py-0.5 rounded-[4px] text-[10px] font-bold">Recipient</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {editingSignerId === signer.id ? (
                            <button
                              onClick={() => setEditingSignerId(null)}
                              className="px-4 py-1.5 rounded-lg bg-[#EEF2FF] text-[#635BFF] text-[13px] font-bold hover:bg-[#E0E7FF] transition-colors"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => setEditingSignerId(signer.id)}
                              className="w-9 h-9 rounded-lg bg-[#F0F9FF] text-[#38BDF8] flex items-center justify-center hover:bg-[#E0F2FE] transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteSigner(signer.id)}
                            className="w-9 h-9 rounded-lg bg-[#FDF2F8] text-[#F43F5E] flex items-center justify-center hover:bg-[#FCE7F3] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {editingSignerId === signer.id ? (
                        <div className={`grid ${signer.type === "Pre-signed" ? 'grid-cols-2 gap-4' : 'grid-cols-1'} pt-2`}>
                          <div className="space-y-2 relative">
                            <label className="text-[13px] font-medium text-[#1E293B]">Category of Signer *</label>
                            <div className="relative">
                              <select
                                value={signer.category}
                                onChange={(e) => updateSigner(signer.id, { category: e.target.value })}
                                className="w-full border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#635BFF] text-[#94A3B8] appearance-none bg-white"
                              >
                                <option>Owner</option>
                                <option>Client</option>
                                <option>Staff</option>
                              </select>
                              <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          {signer.type === "Pre-signed" && (
                            <div className="space-y-2">
                              <label className="text-[13px] font-medium text-[#1E293B]">Name *</label>
                              <input
                                type="text"
                                value={signer.name}
                                onChange={(e) => updateSigner(signer.id, { name: e.target.value })}
                                placeholder="Enter name"
                                className="w-full border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8] text-[#1E293B]"
                              />
                            </div>
                          )}

                          {signer.type === "Pre-signed" && (
                            <div className="space-y-2 col-span-2">
                              <label className="text-[13px] font-medium text-[#1E293B]">Email</label>
                              <input
                                type="email"
                                value={signer.email}
                                onChange={(e) => updateSigner(signer.id, { email: e.target.value })}
                                placeholder="Enter email"
                                className="w-full border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8] text-[#1E293B]"
                              />
                            </div>
                          )}
                        </div>
                      ) : signer.type === "Pre-signed" ? (
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4 pt-2">
                          <div>
                            <p className="text-[10px] font-medium text-[#94A3B8] mb-1">Name</p>
                            <p className="text-[13px] font-medium text-[#1E293B]">{signer.name || "-"}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-medium text-[#94A3B8] mb-1">Email</p>
                            <p className="text-[13px] font-medium text-[#1E293B]">{signer.email || "-"}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-[10px] font-medium text-[#94A3B8] mb-1">Category of Signer</p>
                            <p className="text-[13px] font-medium text-[#1E293B]">{signer.category}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4 pt-2">
                          <div>
                            <p className="text-[10px] font-medium text-[#94A3B8] mb-1">Field Name</p>
                            <p className="text-[13px] font-medium text-[#1E293B]">client_name</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-medium text-[#94A3B8] mb-1">Placeholder</p>
                            <p className="text-[13px] font-medium text-[#1E293B]">Enter client name</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-[10px] font-medium text-[#94A3B8] mb-1">Category of Signer</p>
                            <p className="text-[13px] font-medium text-[#1E293B]">{signer.category}</p>
                          </div>
                        </div>
                      )}

                      {signer.type === "Pre-signed" && (
                        <div className="space-y-3 pt-2">
                          <p className="text-[13px] font-bold text-[#1E293B]">Signature</p>
                          <div className="border border-dashed border-[#CBD5E1] rounded-[12px] p-2">
                            <div className="border border-[#E2E8F0] rounded-[8px] h-[100px] flex items-center justify-center bg-white overflow-hidden">
                              {signer.signature ? (
                                signer.signature.startsWith('data:image') ? (
                                  <img src={signer.signature} className="max-h-full max-w-full object-contain" alt="Signature" />
                                ) : (
                                  <span className="text-[#1E293B] text-4xl italic font-serif" style={{ fontFamily: "cursive" }}>{signer.signature}</span>
                                )
                              ) : (
                                <span className="text-[#94A3B8] text-[13px]">No signature</span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => setSigningSignerId(signer.id)}
                            className="w-full py-2.5 rounded-[8px] text-[12px] font-bold bg-[#ECFEFF] text-[#14B8A6] hover:bg-[#CFFAFE] transition-colors"
                          >
                            Edit Signature
                          </button>
                        </div>
                      )}
                    </div>
                  ))}

                  {signers.length === 0 && (
                    <div className="col-span-1 lg:col-span-2 border border-[#E2E8F0] border-dashed rounded-[16px] py-16 flex flex-col items-center justify-center text-center bg-white">
                      <div className="w-12 h-12 rounded-lg bg-[#EEF2FF] flex items-center justify-center mb-4">
                        <Plus className="w-6 h-6 text-[#635BFF]" />
                      </div>
                      <h4 className="text-[14px] font-medium text-[#1E293B] mb-2">No signers added</h4>
                      <p className="text-[13px] text-[#94A3B8]">Click "Add Signer" to add pre-signers or recipients to this template.</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex">
                  <span className="bg-[#EEF2FF] text-[#635BFF] px-4 py-2 rounded-lg text-[13px] font-medium">
                    Necessary Signers: {signers.length}
                  </span>
                </div>
              </>
            )}

            {activeTab === "Contract Attachments" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-medium text-[#1E293B]">Contract Attachments</h3>
                  {contractAttachments.length > 0 && (
                    <button
                      onClick={() => { setIsUploadModalOpen(true); setNewAttachmentName(""); setSelectedFile(null); }}
                      className="bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF] px-4 py-2 rounded-lg font-medium text-[13px] flex items-center gap-2 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add attachment
                    </button>
                  )}
                </div>

                {contractAttachments.length === 0 ? (
                  <div className="border border-[#E2E8F0] rounded-[16px] py-16 flex flex-col items-center justify-center text-center">
                    <div className="mb-4 text-[#475569]">
                      <Inbox className="w-12 h-12" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-[14px] font-medium text-[#1E293B] mb-4">No files added</h4>
                    <button
                      onClick={() => { setIsUploadModalOpen(true); setNewAttachmentName(""); setSelectedFile(null); }}
                      className="bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF] px-5 py-2.5 rounded-lg font-medium text-[13px] flex items-center gap-2 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add contract attachments
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contractAttachments.map((attachment) => (
                      <div key={attachment.id} className="border border-[#E2E8F0] rounded-[16px] p-6 flex flex-col items-center text-center bg-white shadow-sm">
                        <div className="w-10 h-10 rounded-[12px] bg-[#EEF2FF] flex items-center justify-center mb-4">
                          <File className="w-5 h-5 text-[#635BFF]" />
                        </div>
                        <h4 className="text-[13px] font-bold text-[#1E293B] mb-1">{attachment.name}</h4>
                        <p className="text-[10px] font-medium text-[#94A3B8] mb-1">{attachment.type} • {attachment.size}</p>
                        <p className="text-[10px] font-medium text-[#94A3B8] mb-6">Updated: {attachment.updatedAt}</p>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => attachment.file && handleViewAttachment(attachment.file)}
                            className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#635BFF] flex items-center justify-center hover:bg-[#E0E7FF] transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setContractAttachments(contractAttachments.filter(a => a.id !== attachment.id))}
                            className="w-8 h-8 rounded-lg bg-[#FDF2F8] text-[#F43F5E] flex items-center justify-center hover:bg-[#FCE7F3] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => attachment.file && handleDownloadAttachment(attachment.file)}
                            className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#475569] flex items-center justify-center hover:bg-[#E2E8F0] transition-colors"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "Attachment Requirement" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-medium text-[#1E293B]">Attachment Requirement</h3>
                  <button
                    onClick={() => setIsAddingRequirement(true)}
                    className="bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF] px-4 py-2 rounded-lg font-medium text-[13px] flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add attachment requirement
                  </button>
                </div>

                <div className="space-y-6">
                  {attachmentRequirements.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {attachmentRequirements.map((req) => (
                        <div key={req.id} className="border border-[#E2E8F0] rounded-[12px] p-4 bg-white flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#EEF2FF] flex items-center justify-center flex-shrink-0">
                              <File className="w-5 h-5 text-[#635BFF]" />
                            </div>
                            <div>
                              <p className="text-[14px] font-medium text-[#1E293B] leading-tight mb-1">{req.name}</p>
                              <p className="text-[12px] text-[#94A3B8] font-medium uppercase">{req.types.join(", ")}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setAttachmentRequirements(attachmentRequirements.filter(r => r.id !== req.id))}
                            className="w-10 h-10 rounded-lg bg-[#FDF2F8] text-[#F43F5E] flex items-center justify-center hover:bg-[#FCE7F3] transition-colors flex-shrink-0 ml-4"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {isAddingRequirement && (
                    <div className="border border-[#E2E8F0] rounded-[16px] p-6 bg-white shadow-sm space-y-6 relative">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[14px] font-bold text-[#1E293B]">Requirement {attachmentRequirements.length + 1}</h4>
                        <button
                          onClick={() => setIsAddingRequirement(false)}
                          className="text-[#F43F5E] hover:bg-[#FDF2F8] p-1.5 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2 md:w-1/3">
                          <label className="text-[13px] font-bold text-[#1E293B]">Name *</label>
                          <input
                            type="text"
                            value={newRequirement.name}
                            onChange={(e) => setNewRequirement({ ...newRequirement, name: e.target.value })}
                            placeholder="Enter name"
                            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8] text-[#1E293B]"
                          />
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-[13px] font-bold text-[#1E293B]">Types Accepted *</label>
                            <p className="text-[12px] text-[#94A3B8]">Select one or more</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* PDF Documents */}
                            <label className="cursor-pointer rounded-[16px] p-5 flex items-center justify-between transition-colors bg-[#F8FAFC]">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-[12px] bg-[#F43F5E] flex items-center justify-center flex-shrink-0">
                                  <FileText className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="text-[13px] font-bold text-[#1E293B]">PDF Documents</p>
                                  <div className="mt-1 flex gap-1.5 flex-wrap">
                                    <span className="bg-[#FDF2F8] text-[#F43F5E] text-[10px] font-bold px-2 py-0.5 rounded-full lowercase">.pdf</span>
                                  </div>
                                </div>
                              </div>
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded-[4px] border-[#CBD5E1] text-[#635BFF] focus:ring-[#635BFF] bg-white ml-2 flex-shrink-0"
                                checked={newRequirement.types.includes('pdf')}
                                onChange={(e) => {
                                  if (e.target.checked) setNewRequirement({ ...newRequirement, types: Array.from(new Set([...newRequirement.types, 'pdf'])) });
                                  else setNewRequirement({ ...newRequirement, types: newRequirement.types.filter(t => t !== 'pdf') });
                                }}
                              />
                            </label>

                            {/* Documents */}
                            <label className="cursor-pointer rounded-[16px] p-5 flex items-center justify-between transition-colors bg-[#F5F3FF]">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-[12px] bg-[#635BFF] flex items-center justify-center flex-shrink-0">
                                  <FileText className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="text-[13px] font-bold text-[#1E293B]">Documents</p>
                                  <div className="mt-1 flex gap-1.5 flex-wrap">
                                    <span className="bg-[#EEF2FF] text-[#635BFF] text-[10px] font-bold px-2 py-0.5 rounded-full lowercase">.doc</span>
                                    <span className="bg-[#EEF2FF] text-[#635BFF] text-[10px] font-bold px-2 py-0.5 rounded-full lowercase">.docx</span>
                                  </div>
                                </div>
                              </div>
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded-[4px] border-[#CBD5E1] text-[#635BFF] focus:ring-[#635BFF] bg-white ml-2 flex-shrink-0"
                                checked={newRequirement.types.some(t => ['docx', 'doc'].includes(t))}
                                onChange={(e) => {
                                  if (e.target.checked) setNewRequirement({ ...newRequirement, types: Array.from(new Set([...newRequirement.types, 'docx', 'doc'])) });
                                  else setNewRequirement({ ...newRequirement, types: newRequirement.types.filter(t => !['docx', 'doc'].includes(t)) });
                                }}
                              />
                            </label>

                            {/* Images */}
                            <label className="cursor-pointer rounded-[16px] p-5 flex items-center justify-between transition-colors bg-[#F0FDFA]">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-[12px] bg-[#14B8A6] flex items-center justify-center flex-shrink-0">
                                  <ImageIcon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="text-[13px] font-bold text-[#1E293B]">Images</p>
                                  <div className="mt-1 flex gap-1.5 flex-wrap">
                                    <span className="bg-[#ECFEFF] text-[#14B8A6] text-[10px] font-bold px-2 py-0.5 rounded-full lowercase">.png</span>
                                    <span className="bg-[#ECFEFF] text-[#14B8A6] text-[10px] font-bold px-2 py-0.5 rounded-full lowercase">.jpg</span>
                                    <span className="bg-[#ECFEFF] text-[#14B8A6] text-[10px] font-bold px-2 py-0.5 rounded-full lowercase">.jpeg</span>
                                  </div>
                                </div>
                              </div>
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded-[4px] border-[#CBD5E1] text-[#635BFF] focus:ring-[#635BFF] bg-white ml-2 flex-shrink-0"
                                checked={newRequirement.types.some(t => ['png', 'jpg', 'jpeg'].includes(t))}
                                onChange={(e) => {
                                  if (e.target.checked) setNewRequirement({ ...newRequirement, types: Array.from(new Set([...newRequirement.types, 'png', 'jpg', 'jpeg'])) });
                                  else setNewRequirement({ ...newRequirement, types: newRequirement.types.filter(t => !['png', 'jpg', 'jpeg'].includes(t)) });
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          onClick={() => {
                            setAttachmentRequirements([...attachmentRequirements, { id: Math.random().toString(), ...newRequirement }]);
                            setIsAddingRequirement(false);
                            setNewRequirement({ name: "", types: [] });
                          }}
                          className="border border-[#635BFF] text-[#635BFF] bg-white px-8 py-1.5 rounded-lg font-medium text-[13px] hover:bg-[#EEF2FF] transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Bottom Action */}
        <div className="flex justify-end mt-8 pb-12">
          <Link
            href={`/dashboard/waivers/sign`}
            className="bg-[#635BFF] text-white px-8 py-3 rounded-lg text-[14px] font-medium hover:bg-[#524be0] transition-colors shadow-sm shadow-[#635BFF]/20"
          >
            Send To
          </Link>
        </div>

        {/* Sign Now Modal */}
        {signingSignerId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1E293B]/40 backdrop-blur-sm">
            <div className="bg-white rounded-lg w-full max-w-[600px] shadow-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6">
                <h3 className="text-[16px] font-medium text-[#1E293B]">Sign Now</h3>
                <button
                  onClick={() => setSigningSignerId(null)}
                  className="text-[#64748B] hover:text-[#1E293B] transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 pt-0">
                <div className="border border-dashed border-[#635BFF]/50 rounded-lg p-2 bg-[#F8FAFC]/50">
                  <canvas
                    ref={canvasRef}
                    width={500}
                    height={240}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="rounded-lg h-[240px] bg-white w-full cursor-crosshair border border-[#E2E8F0]"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 pb-6">
                <button
                  onClick={() => setSigningSignerId(null)}
                  className="px-6 py-2.5 rounded-lg text-[13px] font-medium bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] transition-colors"
                >
                  Cancel
                </button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={clearSignature}
                    className="px-6 py-2.5 rounded-lg text-[13px] font-medium bg-[#FDF2F8] text-[#F43F5E] hover:bg-[#FCE7F3] transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={saveDrawnSignature}
                    className="px-6 py-2.5 rounded-lg text-[13px] font-medium bg-[#ECFEFF] text-[#0891B2] hover:bg-[#CFFAFE] transition-colors"
                  >
                    Save Signature
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1E293B]/40 backdrop-blur-sm">
            <div className="bg-white rounded-lg w-full max-w-[500px] shadow-2xl overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
                <h3 className="text-[16px] font-bold text-[#1E293B]">Attachment To Contract</h3>
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="text-[#64748B] hover:text-[#1E293B] transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#1E293B]">Name *</label>
                  <input
                    type="text"
                    value={newAttachmentName}
                    onChange={(e) => setNewAttachmentName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8] text-[#1E293B]"
                  />
                </div>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-[#818CF8] rounded-lg p-8 bg-[#EEF2FF]/50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#EEF2FF] transition-colors"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mb-4 shadow-sm border border-[#E2E8F0]">
                    <MousePointerClick className="w-6 h-6 text-[#635BFF]" />
                  </div>
                  <p className="text-[13px] font-medium text-[#635BFF]">
                    {selectedFile ? selectedFile.name : "Drop here or click to browse"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end px-6 pb-6 pt-2">
                <button
                  onClick={handleUploadDocument}
                  className="bg-[#635BFF] hover:bg-[#524be0] text-white px-6 py-2.5 rounded-lg font-bold text-[13px] transition-colors"
                >
                  Upload Document
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Add/Edit Field Modal */}
        {isAddingField && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1E293B]/40 backdrop-blur-sm">
            <div className="bg-white rounded-lg w-full max-w-[650px] shadow-2xl overflow-visible flex flex-col relative">
              <div className="p-6 sm:p-8 space-y-6">
                <h4 className="text-[16px] font-bold text-[#1E293B]">
                  {editingFieldId ? "Edit Field" : "Add New Field"}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-[#1E293B]">Field Name *</label>
                    <input
                      type="text"
                      value={newField.fieldName}
                      onChange={(e) => setNewField({ ...newField, fieldName: e.target.value })}
                      placeholder="Enter field name"
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8] text-[#1E293B]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-[#1E293B]">Label *</label>
                    <input
                      type="text"
                      value={newField.label}
                      onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                      placeholder="Enter label"
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8] text-[#1E293B]"
                    />
                  </div>
                  <div className="space-y-2 relative" ref={typeDropdownRef}>
                    <label className="text-[13px] font-medium text-[#1E293B]">Field Type *</label>
                    <button
                      type="button"
                      onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] flex items-center justify-between text-[#94A3B8] bg-white"
                    >
                      <span className="flex items-center gap-2">
                        {FIELD_TYPES.find(t => t.value === newField.type)?.icon && React.createElement(FIELD_TYPES.find(t => t.value === newField.type)!.icon, { className: "w-4 h-4 text-[#94A3B8]" })}
                        <span className="text-[#1E293B]">{newField.type}</span>
                      </span>
                      <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                    </button>

                    {isTypeDropdownOpen && (
                      <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 py-1.5">
                        {FIELD_TYPES.map((type) => (
                          <button
                            key={type.value}
                            onClick={() => {
                              setNewField({ ...newField, type: type.value });
                              setIsTypeDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2.5 text-[14px] text-[#475569] hover:bg-[#F8FAFC] flex items-center gap-3 text-left transition-colors"
                          >
                            <type.icon className="w-4 h-4 text-[#64748B]" />
                            {type.value}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-[#1E293B]">Placeholder *</label>
                    <input
                      type="text"
                      value={newField.placeholder}
                      onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                      placeholder="Enter placeholder"
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8] text-[#1E293B]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={`w-10 h-6 rounded-full flex items-center p-[2px] transition-colors ${newField.required ? 'bg-[#635BFF]' : 'bg-[#E2E8F0]'}`}
                      onClick={() => setNewField({ ...newField, required: !newField.required })}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${newField.required ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                    <span className="text-[14px] font-medium text-[#1E293B]">Required Field</span>
                  </label>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsAddingField(false);
                      setEditingFieldId(null);
                      setNewField({ fieldName: "", label: "", type: "Text", placeholder: "", description: "", required: false });
                    }}
                    className="px-6 py-2.5 rounded-lg text-[13px] font-bold bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveField}
                    className="px-6 py-2.5 rounded-lg text-[13px] font-bold bg-[#ECFEFF] text-[#0891B2] hover:bg-[#CFFAFE] transition-colors"
                  >
                    Save Field
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex justify-end pt-2 pb-12">
          <button className="bg-[#635BFF] hover:bg-[#5249ea] text-white px-8 py-2.5 rounded-[12px] text-[13px] font-medium transition-colors">
            Send To
          </button>
        </div>

      </div>
    </div>
  );
}
