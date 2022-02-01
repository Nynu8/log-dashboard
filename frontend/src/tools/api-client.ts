import { Axios } from 'axios';
import { Data } from 'types/data';

class ApiClient {
  private httpClient: Axios;

  constructor() {
    this.httpClient = new Axios({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  async getLogs(): Promise<Data> {
    const res = await this.httpClient.get<string>('/logs');

    return JSON.parse(res.data);
  }
}

export default new ApiClient();
