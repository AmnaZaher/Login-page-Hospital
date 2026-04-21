import { useState, useMemo } from 'react';

interface UsePaginationProps {
    totalItems: number;
    itemsPerPage?: number;
    initialPage?: number;
}

interface UsePaginationReturn {
    currentPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    goToPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    pageNumbers: number[];
    showingFrom: number;
    showingTo: number;
}

/**
 * Pagination hook — بيتحكم في الـ pagination
 * مثال: Staff table, Patient table
 * ترقيم الصفحات وعرض العناصر
 */
export const usePagination = ({
    totalItems,
    itemsPerPage = 5,
    initialPage = 1,
}: UsePaginationProps): UsePaginationReturn => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [prevInitialPage, setPrevInitialPage] = useState(initialPage);

    // Sync state if initialPage changes (e.g. on search reset)
    if (initialPage !== prevInitialPage) {
        setPrevInitialPage(initialPage);
        setCurrentPage(initialPage);
    }

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    const showingFrom = totalItems === 0 ? 0 : startIndex + 1;
    const showingTo = endIndex;

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    // Generate page numbers with ellipsis logic
    const pageNumbers = useMemo(() => {
        const pages: number[] = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push(-1); // ellipsis
            for (
                let i = Math.max(2, currentPage - 1);
                i <= Math.min(totalPages - 1, currentPage + 1);
                i++
            ) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push(-1); // ellipsis
            pages.push(totalPages);
        }
        return pages;
    }, [currentPage, totalPages]);

    return {
        currentPage,
        totalPages,
        startIndex,
        endIndex,
        goToPage,
        nextPage,
        prevPage,
        pageNumbers,
        showingFrom,
        showingTo,
    };
};

// we will use it in tables to paginate the data
