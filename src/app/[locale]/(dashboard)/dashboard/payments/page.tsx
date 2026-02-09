"use client";

import React, { useEffect, useState } from "react";
import { paymentService } from "@/services/payment.service";
import { Wallet } from "@/types/payment.types";
import { Button } from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/Spinner";
import { toast } from "sonner";
import { 
  Wallet as WalletIcon, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  History, 
  CreditCard, 
  RefreshCw,
  Plus
} from "lucide-react";

export default function PaymentsPage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Chargement du solde et initialisation
  const loadWalletData = async () => {
    try {
      setIsLoading(true);
      // On initialise d'abord (sécurité backend) puis on prend le solde
      await paymentService.initializeWallet();
      const currentBalance = await paymentService.getBalance();
      setBalance(currentBalance);
    } catch (error: any) {
      toast.error("Erreur Wallet", { description: "Impossible de joindre le service de paiement." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadWalletData(); }, []);

  // Action : Recharger (Simulation)
  const handleRecharge = async () => {
    const amount = prompt("Entrez le montant à recharger (FCFA) :", "5000");
    if (!amount || isNaN(Number(amount))) return;

    try {
      setIsActionLoading(true);
      await paymentService.recharge(Number(amount));
      toast.success("Recharge réussie !", { description: `+${amount} FCFA ajoutés à votre solde.` });
      loadWalletData(); // Rafraîchir le solde
    } catch (error: any) {
      toast.error("Échec de la recharge");
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black text-text-primary tracking-tight">Mon Portefeuille</h1>
        <p className="text-text-secondary">Gérez vos crédits et vos transactions de service.</p>
      </div>

      {/* CARTE DE SOLDE (STYLE BANCAIRE) */}
      <div className="relative overflow-hidden bg-primary rounded-[2rem] p-8 text-white shadow-2xl shadow-primary/30">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <WalletIcon size={120} />
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Solde Disponible</p>
              <h2 className="text-5xl font-black tracking-tighter">
                {balance?.toLocaleString() || 0} <span className="text-2xl font-medium text-white/70">FCFA</span>
              </h2>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
              <CreditCard size={24} />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleRecharge} 
              isLoading={isActionLoading}
              className="bg-white text-primary hover:bg-white/90 border-none px-6 rounded-xl font-black text-xs uppercase tracking-widest"
            >
              <Plus size={16} className="mr-2" /> Recharger
            </Button>
            <button 
              onClick={loadWalletData}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* GRILLE D'ACTIONS & HISTORIQUE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Résumé des flux */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-surface p-5 rounded-2xl border border-border-default shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-xl bg-success/10 text-success">
              <ArrowUpCircle size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Entrées (Mois)</p>
              <p className="text-lg font-black text-text-primary">+ 45,000</p>
            </div>
          </div>
          <div className="bg-surface p-5 rounded-2xl border border-border-default shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-xl bg-error/10 text-error">
              <ArrowDownCircle size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Sorties (Mois)</p>
              <p className="text-lg font-black text-text-primary">- 12,500</p>
            </div>
          </div>
        </div>

        {/* Historique fictif (en attendant l'endpoint historique du backend) */}
        <div className="md:col-span-2 bg-surface rounded-2xl border border-border-default shadow-sm overflow-hidden">
          <div className="p-5 border-b border-border-default flex justify-between items-center bg-background-secondary/30">
            <h3 className="font-bold text-text-primary flex items-center gap-2">
              <History size={18} className="text-primary" /> Dernières Transactions
            </h3>
          </div>
          <div className="divide-y divide-border-default">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 flex justify-between items-center hover:bg-background-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <RefreshCw size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">Recharge Portefeuille</p>
                    <p className="text-[10px] text-text-tertiary uppercase font-medium">12 Fév 2026 • 14:30</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-success">+ 5,000 FCFA</p>
                  <p className="text-[9px] font-bold text-success/60 uppercase">Complété</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 text-xs font-bold text-text-tertiary hover:text-primary transition-colors border-t border-border-default">
            VOIR TOUT L'HISTORIQUE
          </button>
        </div>

      </div>
    </div>
  );
}