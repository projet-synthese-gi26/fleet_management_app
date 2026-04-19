import { apiClient } from "@/lib/api-client";
import { Wallet } from "@/types/payment.types";
import { UUID } from "@/types/base.types";

export const paymentService = {
  /**
   * 13. Consulter le solde actuel
   */
  getBalance: async (): Promise<number> => {
    const { data } = await apiClient.get<number>("/payments/balance");
    return data;
  },

  /**
   * 13. Initialiser le Wallet (si premier accès)
   * Le backend crée le wallet s'il n'existe pas encore
   */
  initializeWallet: async (): Promise<Wallet> => {
    const { data } = await apiClient.post<Wallet>("/payments/wallet");
    return data;
  },

  /**
   * 13. Recharger le compte
   * @param amount Montant à ajouter
   * @returns L'ID de la transaction créée
   */
  recharge: async (amount: number): Promise<UUID> => {
    const { data } = await apiClient.post<UUID>("/payments/recharge", null, {
      params: { amount }
    });
    return data;
  },

  /**
   * 13. Simuler un débit (Utile pour tester le paiement d'abonnement)
   */
  simulateDebit: async (amount: number): Promise<UUID> => {
    const { data } = await apiClient.post<UUID>("/payments/simulate-debit", null, {
      params: { amount }
    });
    return data;
  }
};