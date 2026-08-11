"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { MacroCategorySidebar } from "./MacroCategorySidebar";
import { CategoriesList } from "./CategoriesList";
import { AddMacroCategoryModal, MacroCategoryFormData } from "./modals/AddMacroCategoryModal";
import { AddCategoryModal, CategoryFormData } from "./modals/AddCategoryModal";
import { MOCK_MACRO_CATEGORIES, MOCK_CATEGORIES } from "../data";

export default function CategoriesManagement() {
  const [macroCategories, setMacroCategories] = useState<MacroCategoryFormData[]>(MOCK_MACRO_CATEGORIES);
  const [categories, setCategories] = useState<CategoryFormData[]>(MOCK_CATEGORIES);

  const [selectedMacroId, setSelectedMacroId] = useState<string | null>(macroCategories[0]?.id || null);

  // Modals state
  const [isAddMacroOpen, setIsAddMacroOpen] = useState(false);
  const [editingMacro, setEditingMacro] = useState<MacroCategoryFormData | undefined>(undefined);

  const [isAddCatOpen, setIsAddCatOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoryFormData | undefined>(undefined);

  // Handlers for Macro Categories
  const handleSaveMacro = (data: MacroCategoryFormData) => {
    if (data.id) {
      setMacroCategories(prev => prev.map(mc => mc.id === data.id ? data : mc));
    } else {
      const newMc = { ...data, id: Date.now().toString() };
      setMacroCategories([...macroCategories, newMc]);
      if (!selectedMacroId) setSelectedMacroId(newMc.id);
    }
    setIsAddMacroOpen(false);
    setEditingMacro(undefined);
  };

  const handleDeleteMacro = (id: string) => {
    setMacroCategories(prev => prev.filter(mc => mc.id !== id));
    if (selectedMacroId === id) {
      setSelectedMacroId(macroCategories.find(mc => mc.id !== id)?.id || null);
    }
    // Also delete associated categories
    setCategories(prev => prev.filter(c => c.macroCategoryId !== id));
  };

  // Handlers for Categories
  const handleSaveCategory = (data: CategoryFormData) => {
    if (data.id) {
      setCategories(prev => prev.map(c => c.id === data.id ? data : c));
    } else {
      setCategories([...categories, { ...data, id: Date.now().toString() }]);
    }
    setIsAddCatOpen(false);
    setEditingCat(undefined);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const selectedMacro = macroCategories.find(mc => mc.id === selectedMacroId);
  const selectedMacroCategories = categories.filter(c => c.macroCategoryId === selectedMacroId);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 sm:p-6 bg-white shrink-0">
        <h1 className="text-[16px] sm:text-xl font-bold text-[#1E293B]">Macro-categories and Categories</h1>
        <button
          onClick={() => { setEditingMacro(undefined); setIsAddMacroOpen(true); }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#635BFF] text-white px-4 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#5249ea] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Macro-category
        </button>
      </div>

      {/* Main Content Split */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden py-5">
        {/* Left Sidebar */}
        <MacroCategorySidebar
          macroCategories={macroCategories}
          selectedId={selectedMacroId}
          onSelect={setSelectedMacroId}
        />

        {/* Right Content */}
        {selectedMacro ? (
          <CategoriesList
            macroCategory={selectedMacro}
            categories={selectedMacroCategories}
            onEditMacroCategory={(mc) => { setEditingMacro(mc); setIsAddMacroOpen(true); }}
            onDeleteMacroCategory={handleDeleteMacro}
            onAddCategory={() => { setEditingCat(undefined); setIsAddCatOpen(true); }}
            onEditCategory={(c) => { setEditingCat(c); setIsAddCatOpen(true); }}
            onDeleteCategory={handleDeleteCategory}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#94A3B8] text-[14px]">
            {macroCategories.length > 0 ? "Select a macro-category to view details." : "Add a macro-category to get started."}
          </div>
        )}
      </div>

      {/* Modals */}
      <AddMacroCategoryModal
        isOpen={isAddMacroOpen}
        onClose={() => { setIsAddMacroOpen(false); setEditingMacro(undefined); }}
        onSave={handleSaveMacro}
        initialData={editingMacro}
      />

      <AddCategoryModal
        isOpen={isAddCatOpen}
        onClose={() => { setIsAddCatOpen(false); setEditingCat(undefined); }}
        onSave={handleSaveCategory}
        initialData={editingCat}
        macroCategoryId={selectedMacroId || undefined}
      />
    </div>
  );
}
