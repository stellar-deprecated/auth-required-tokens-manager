import { AssetType, Keypair } from "stellar-sdk";

export interface HorizonBalanceLine {
  balance: string;
  asset_type: AssetType;
  buying_liabilities: string;
  selling_liabilities: string;
  limit?: string | undefined;
  asset_code?: string | undefined;
  asset_issuer?: string | undefined;
  last_modified_ledger?: number | undefined;
  is_authorized?: boolean | undefined;
}

export interface KeySecret {
  publicKey: string;
  secret: string;
}

export const getKeySecret = (kp: Keypair): KeySecret => {
  return {
    publicKey: kp.publicKey(),
    secret: kp.secret(),
  };
};

export interface Dict {
  [props: string]: any;
}

export interface UpdatedAt {
  date: Date;
  errorMessage: any;
}
