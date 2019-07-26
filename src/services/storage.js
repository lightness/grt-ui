import { LocalStorage } from 'quasar';

export class StorageService {
  static getToken() {
    return LocalStorage.getItem('token');
  }

  static setToken(token) {
    LocalStorage.set('token', token);
  }

  static resetToken() {
    LocalStorage.remove('token');
  }
}
