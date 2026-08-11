"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Eye,
  Edit2,
  Trash2,
  Plus
} from "lucide-react";
import Pagination from "@/components/saloonOwner/common/Pagination";
import AddGiftCardModal from "@/components/saloonOwner/financial/gifts-cards/AddGiftCardModal";
import ViewGiftCardModal from "@/components/saloonOwner/financial/gifts-cards/ViewGiftCardModal";
import EditGiftCardModal from "@/components/saloonOwner/financial/gifts-cards/EditGiftCardModal";
import DeleteGiftCardModal from "@/components/saloonOwner/financial/gifts-cards/DeleteGiftCardModal";

interface GiftCard {
  id: string;
  issueDate: string;
  expirationDate: string;
  amount: number;
  eligibleServices: string;
  usageLimit: number;
  status: "Used" | "No-Used";
  subStatus?: "Active" | "Expired";
}

const MOCK_GIFT_CARDS: GiftCard[] = [
  { id: "#0B0", issueDate: "5 Aug 2025", expirationDate: "8 Aug 2025", amount: 170, eligibleServices: "All", usageLimit: 1, status: "Used" },
  { id: "#0B0", issueDate: "5 Aug 2025", expirationDate: "8 Aug 2025", amount: 170, eligibleServices: "All", usageLimit: 1, status: "No-Used", subStatus: "Active" },
  { id: "#0B0", issueDate: "5 Aug 2025", expirationDate: "8 Aug 2025", amount: 170, eligibleServices: "All", usageLimit: 1, status: "No-Used", subStatus: "Expired" },
  { id: "#0B0", issueDate: "5 Aug 2025", expirationDate: "8 Aug 2025", amount: 170, eligibleServices: "All", usageLimit: 1, status: "Used" },
  { id: "#0B0", issueDate: "5 Aug 2025", expirationDate: "8 Aug 2025", amount: 170, eligibleServices: "All", usageLimit: 1, status: "Used" },
  { id: "#0B0", issueDate: "5 Aug 2025", expirationDate: "8 Aug 2025", amount: 170, eligibleServices: "All", usageLimit: 1, status: "No-Used", subStatus: "Active" },
  { id: "#0B0", issueDate: "5 Aug 2025", expirationDate: "8 Aug 2025", amount: 170, eligibleServices: "All", usageLimit: 1, status: "No-Used", subStatus: "Expired" },
  { id: "#0B0", issueDate: "5 Aug 2025", expirationDate: "8 Aug 2025", amount: 170, eligibleServices: "All", usageLimit: 1, status: "No-Used", subStatus: "Active" },
  { id: "#0B0", issueDate: "5 Aug 2025", expirationDate: "8 Aug 2025", amount: 170, eligibleServices: "All", usageLimit: 1, status: "No-Used", subStatus: "Expired" },
];

export default function GiftsCardsPage() {
  const [cards, setCards] = useState<GiftCard[]>(MOCK_GIFT_CARDS);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<GiftCard | null>(null);

  const handleAddCard = (data: any) => {
    setCards([data, ...cards]);
  };

  const handleEditCard = (data: any) => {
    setCards(cards.map(c => c.id === data.id ? data : c));
  };

  const handleDeleteCard = () => {
    if (activeCard) {
      setCards(cards.filter(c => c.id !== activeCard.id));
      setActiveCard(null);
    }
    setIsDeleteModalOpen(false);
  };

  const totalItems = cards.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCards = cards.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-[#E2E8F0]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-[#1E293B] font-manrope">Gifts Cards</h1>
          <Link
            href="/dashboard/clients/client_1/gift-cards/add"
            className="bg-[#635BFF] hover:bg-[#524be0] text-white px-5 py-2.5 rounded-lg font-bold text-[13px] flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Gift Card
          </Link>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">ID</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Date of issue</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Date of Expiration</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Amount</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Eligible Services</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Usage Limit</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">Status</th>
                <th className="py-5 px-6 text-[13px] font-bold text-[#1E293B] whitespace-nowrap font-manrope text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {paginatedCards.map((card, i) => (
                <tr key={card.id + i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className="text-[#635BFF] font-medium text-[13px]">{card.id}</span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className="text-[#475569] font-medium text-[13px] whitespace-nowrap">{card.issueDate}</span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className="text-[#475569] font-medium text-[13px] whitespace-nowrap">{card.expirationDate}</span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className="text-[#475569] font-medium text-[13px] whitespace-nowrap">€ {card.amount}</span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className="text-[#475569] font-medium text-[13px]">{card.eligibleServices}</span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E0E7FF] text-[#635BFF] text-[12px] font-bold">
                      {card.usageLimit}
                    </span>
                  </td>
                  <td className="py-4 px-6 border-r border-[#E2E8F0]">
                    <div className="flex items-center gap-2">
                      {card.status === "Used" ? (
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#16A34A] whitespace-nowrap">
                          {card.status}
                        </span>
                      ) : (
                        <>
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#D97706] whitespace-nowrap">
                            {card.status}
                          </span>
                          {card.subStatus === "Active" && (
                            <span className="px-3 py-1 rounded-full text-[11px] font-bold border border-[#22C55E] text-[#22C55E] bg-white whitespace-nowrap">
                              {card.subStatus}
                            </span>
                          )}
                          {card.subStatus === "Expired" && (
                            <span className="px-3 py-1 rounded-full text-[11px] font-bold border border-[#F43F5E] text-[#F43F5E] bg-white whitespace-nowrap">
                              {card.subStatus}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/dashboard/clients/client_1/gift-cards/view/1`}
                        className="text-[#64748B] hover:text-[#635BFF] transition-colors p-1.5 rounded-lg hover:bg-[#F1F5F9] inline-flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => { setActiveCard(card); setIsEditModalOpen(true); }}
                        className="text-[#64748B] hover:text-[#10B981] transition-colors p-1.5 rounded-lg hover:bg-[#F1F5F9] inline-flex items-center justify-center"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setActiveCard(card); setIsDeleteModalOpen(true); }}
                        className="text-[#64748B] hover:text-[#EF4444] transition-colors p-1.5 rounded-lg hover:bg-[#F1F5F9] inline-flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          itemName="gift cards"
          onPageChange={setCurrentPage}
        />
      </div>

      <AddGiftCardModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddCard}
      />
      <ViewGiftCardModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        cardData={activeCard}
      />
      <EditGiftCardModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditCard}
        initialData={activeCard}
      />
      <DeleteGiftCardModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteCard}
      />
    </div>
  );
}
