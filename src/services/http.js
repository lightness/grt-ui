import axios from 'axios';

export class HttpService {
  static source = axios.CancelToken.source();

  static get(url, options) {
    return HttpService.makeRequest({
      url,
      method: 'get',
      ...options,
    });
  }

  static post(url, data, options) {
    return HttpService.makeRequest({
      url,
      method: 'post',
      data,
      ...options,
    });
  }

  static put(url, data, options) {
    return HttpService.makeRequest({
      url,
      method: 'put',
      data,
      ...options,
    });
  }

  static delete(url, data, options) {
    return HttpService.makeRequest({
      url,
      method: 'delete',
      data,
      ...options,
    });
  }

  static makeRequest(config) {
    const cancelToken = this.source.token;

    return axios
      .request({ ...config, cancelToken });
  }
}
