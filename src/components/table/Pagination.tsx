import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageNumbers: number[];
    showingFrom: number;
    showingTo: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onNext: () => void;
    onPrev: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    pageNumbers,
    showingFrom,
    showingTo,
    totalItems,
    onPageChange,
    onNext,
    onPrev,
}) => {
    if (totalPages <= 1) return null;

    return (
        <div className="bg-[#f8fbff] px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-400">
                Showing {showingFrom} to {showingTo} of {totalItems.toLocaleString()} results
            </span>

            <div className="flex items-center gap-1">
                {/* Prev Button */}
                <button
                    onClick={onPrev}
                    disabled={currentPage === 1}
                    className="p-1 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                {pageNumbers.map((page, index) => {
                    // -1 means ellipsis
                    if (page === -1) {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="w-8 h-8 flex items-center justify-center text-slate-400 font-bold"
                            >
                                ...
                            </span>
                        );
                    }

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`
                                w-8 h-8 rounded-lg font-bold text-sm flex items-center justify-center transition-colors
                                ${currentPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'text-slate-400 hover:bg-slate-200'
                                }
                            `}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Next Button */}
                <button
                    onClick={onNext}
                    disabled={currentPage === totalPages}
                    className="p-1 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
