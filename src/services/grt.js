import { HttpService } from './http';

export class GrtService {
  static getPackages(url, data) {
    return HttpService.post(url, data);
  }

  static authenticate(url, data) {
    return HttpService.post(url, data);
  }
}
