import poProducts from '$data/po-product.json';
import poProductGroup from '$data/po-productgroup.json';

export interface ITokenResponse {
  access_token: string;
  token_type: 'bearer';
  expires_in: number;
  refresh_token: string;
}

export interface IError {
  message: string;
  status?: number;
}

export interface AuthHeaders {
  appKey: string;
  clientKey: string;
}

export type POProductsType = typeof poProducts;

export type POProductGroupT = typeof poProductGroup;
