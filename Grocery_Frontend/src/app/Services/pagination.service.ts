import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  getPaginationArray(totalPages: number, currentPage: number, displayPages: number): number[] {
    const paginationArray: number[] = [];

    const halfDisplayPages = Math.floor(displayPages / 2);

    let startPage = currentPage - halfDisplayPages;
    let endPage = currentPage + halfDisplayPages;

    if (startPage <= 0) {
      startPage = 1;
      endPage = Math.min(displayPages, totalPages);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - displayPages + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      paginationArray.push(page);
    }

    return paginationArray;
  }
}
