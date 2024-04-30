import { transactionType } from './dashboard/recent/child/data';

export interface TextProps {
  copyed?:
    | boolean
    | {
        text?: string;
      };
}

export interface s3DataType {
  key?: string;
  content: {
    authorAddress: string;
    blockGasUsed: string;
    blockHash: string;
    blockNumber: string;
    difficulty: string;
    gasLimit: string;
    numberOfTransactions: number;
    size: string;
    timestamp: string;
    transactions: transactionType[];
  };
}

export interface transfromTXDataType {
  blockNumber?: string;
  ethValue: number;
  from: string;
  hash: string;
  timestamp: string;
  to: string;
  transactionNumber: string;
  transactionType: string;
  blockInfo: s3DataType;
}
