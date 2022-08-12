export interface ITokenResponse {
  access_token: string;
  token_type: 'bearer';
  expires_in: number;
  refresh_token: string;
}

export interface IRequestHeaders {
  application_key: string;
  client_key: string;
}
