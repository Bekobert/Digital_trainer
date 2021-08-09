export default class Api {
  constructor(httpService) {
    this.httpService = httpService;
  }

  _doPost = (endpoint, body) => {
    return this.httpService.fetch({
      pureHttpMode: false,
      method: 'post',
      body,
      endpoint,
    });
  };

  _doGet = endpoint => {
    return this.httpService.fetch({
      pureHttpMode: false,
      method: 'get',
      endpoint,
    });
  };

  getPosts = () => {
    return this._doGet('/posts');
  };
}
