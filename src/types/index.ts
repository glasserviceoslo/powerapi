import poProducts from '@data/po-product.json';

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

export type POProductsType = typeof poProducts;
