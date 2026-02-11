"use client";
import React from 'react';
import { useTrip } from '@/contexts/TripContext';
import { Button } from '@/components/ui/Button';
import { Play, Square } from 'lucide-react';

export const CurrentMissionCard = () => {
    const { currentTrip, isTripActive, startTrip, endTrip, isLoading } = useTrip();

    if (isLoading) return <div className="p-6 bg-surface rounded-xl animate-pulse">Chargement de la mission...</div>;

    return (
        <div className="rounded-xl overflow-hidden bg-white dark:bg-[#1c2127] shadow-sm border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="font-bold text-lg mb-4">Course en cours</h3>
            
            {!isTripActive ? (
                <div className="text-center py-8">
                    <p className="text-slate-500 mb-6">Vous n'avez aucune course active sur ce véhicule.</p>
                    <Button 
                        onClick={() => startTrip()} // Appelle le backend POST /trips/start
                        className="w-full gap-2 bg-success hover:bg-success-dark"
                    >
                        <Play size={18} /> DÉMARRER MON SERVICE
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-primary/5 p-4 rounded-lg border border-primary/10">
                        <div>
                            <p className="text-[10px] font-bold text-primary uppercase">ID Trajet</p>
                            <p className="font-mono font-bold">#{currentTrip?.id.substring(0,8)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-primary uppercase">Statut</p>
                            <p className="text-success font-bold animate-pulse">EN ROUTE (GPS ACTIF)</p>
                        </div>
                    </div>

                    <Button 
                        variant="danger"
                        onClick={() => endTrip()} // Appelle le backend POST /trips/end
                        className="w-full gap-2"
                    >
                        <Square size={18} /> TERMINER LA COURSE
                    </Button>
                </div>
            )}
        </div>
    );
};