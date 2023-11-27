import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { Category } from '../models';
import { DEFAULT_CATEGORIES } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  authorizedUser = this.userStorageService.getAuthorizedUser();

  constructor(private userStorageService: UserStorageService) {}

  getCategories(): Category[] {
    const categories = localStorage.getItem(`categories: ${this.authorizedUser.email}`);
    if (!categories) {
      return DEFAULT_CATEGORIES;
    }
    return JSON.parse(categories);
  }

  updateCategories(categories: Category[]) {
    const serializedCategories = JSON.stringify(categories);
    localStorage.setItem(`categories: ${this.authorizedUser.email}`, serializedCategories);
  }
}
