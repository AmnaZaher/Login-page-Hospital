import React from 'react';
import Pagination from './Pagination';
import { usePagination } from '../../hooks';

// Column Definition
export interface Column<T> {
    key: string;
    header: string;
    render: (item: T) => React.ReactNode;
    className?: string;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    totalItems: number;
    itemsPerPage?: number;
    onRowClick?: (item: T) => void;
    emptyMessage?: string;
    isLoading?: boolean;
}

function DataTable<T>({
    columns,
    data,
    totalItems,
    itemsPerPage = 5,
    onRowClick,
    emptyMessage = 'No data found',
    isLoading = false,
}: DataTableProps<T>) {
    const {
        currentPage,
        pageNumbers,
        showingFrom,
        showingTo,
        goToPage,
        nextPage,
        prevPage,
        totalPages,
    } = usePagination({ totalItems, itemsPerPage });

    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    {/* Header */}
                    <thead>
                        <tr className="bg-[#f8fbff] text-slate-400 text-xs font-extrabold uppercase tracking-widest border-b border-slate-100">
                            {columns.map((col, index) => (
                                <th
                                    key={col.key}
                                    className={`
                                        px-6 py-5
                                        ${index === 0 ? 'rounded-tl-2xl' : ''}
                                        ${index === columns.length - 1 ? 'rounded-tr-2xl' : ''}
                                        ${col.className || ''}
                                    `}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody className="divide-y divide-slate-100">
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-16 text-center text-slate-400 font-medium"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((item, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    onClick={() => onRowClick?.(item)}
                                    className={`
                                        hover:bg-slate-50 transition-colors
                                        ${onRowClick ? 'cursor-pointer' : ''}
                                    `}
                                >
                                    {columns.map((col) => (
                                        <td key={col.key} className={`px-6 py-4 ${col.className || ''}`}>
                                            {col.render(item)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageNumbers={pageNumbers}
                showingFrom={showingFrom}
                showingTo={showingTo}
                totalItems={totalItems}
                onPageChange={goToPage}
                onNext={nextPage}
                onPrev={prevPage}
            />
        </div>
    );
}

export default DataTable;