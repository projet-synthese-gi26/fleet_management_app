import { UUID } from "./base.types";

/**
 * Représente le portefeuille électronique de l'utilisateur
 */
export interface Wallet {
  id: UUID;
  ownerId: UUID;
  ownerName: string;
  balance: number; // Solde en FCFA (ou devise configurée)
}

/**
 * Statuts possibles pour une transaction
 */
export type TransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

/**
 * Représente une opération financière (Recharge ou Paiement)
 */
export interface Transaction {
  id: UUID;
  walletId: UUID;
  amount: number;
  type: 'RECHARGE' | 'PAYMENT';
  status: TransactionStatus;
  createdAt: string;
}