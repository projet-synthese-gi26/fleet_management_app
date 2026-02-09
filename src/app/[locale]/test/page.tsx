
'use client';

import React, { useState, useEffect } from 'react';
import { superAdminService } from '@/services/super-admin.service';
import { AdminUser } from '@/types/super-admin.types';
import { Plus, UserCog, ShieldCheck, Mail, Phone, Power, Loader2, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export default function SuperAdminPage() {
    const [admins, setAdmins] = useState<AdminUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        username: '', email: '', phone: '', firstName: '', lastName: '', password: 'Password123!'
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const loadAdmins = async () => {
        setIsLoading(true);
        try {
            const data = await superAdminService.listAdmins();
            setAdmins(data);
        } catch (error) {
            toast.error("Erreur de chargement");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { loadAdmins(); }, []);

    const handleToggle = async (id: string) => {
        try {
            await superAdminService.toggleStatus(id);
            toast.success("Statut mis à jour");
            loadAdmins();
        } catch (error) {
            toast.error("Action impossible");
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await superAdminService.createAdmin(formData, selectedFile || undefined);
            toast.success("Administrateur créé avec succès");
            setIsModalOpen(false);
            loadAdmins();
        } catch (error: any) {
            toast.error(error.detail || "Erreur de création");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 lg:p-10 space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Super Administration</h1>
                    <p className="text-slate-500 font-medium">Gestion des accès de niveau système.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="h-12 rounded-2xl gap-2">
                    <Plus size={20} /> Ajouter un admin
                </Button>
            </div>

            {/* Liste des Admins (Style Premium) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>
                ) : admins.map((admin) => (
                    <motion.div 
                        key={admin.id}
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-6 rounded-[2rem] shadow-sm relative overflow-hidden"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-16 w-16 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden border-2 border-white dark:border-slate-950 shadow-md">
                                {admin.photoUrl ? <img src={admin.photoUrl} className="object-cover h-full w-full" alt="" /> : <UserCog className="m-4 text-slate-400" />}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white truncate">{admin.firstName} {admin.lastName}</h3>
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-md">Admin Système</span>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400 mb-6">
                            <div className="flex items-center gap-2"><Mail size={14} /> {admin.email}</div>
                            <div className="flex items-center gap-2"><Phone size={14} /> {admin.phone}</div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                            <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${admin.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                                <span className="text-xs font-bold uppercase tracking-tighter">{admin.isActive ? 'Actif' : 'Suspendu'}</span>
                            </div>
                            <button 
                                onClick={() => handleToggle(admin.id)}
                                className={`p-2.5 rounded-xl transition-all ${admin.isActive ? 'text-red-500 hover:bg-red-50' : 'text-emerald-500 hover:bg-emerald-50'}`}
                                title={admin.isActive ? "Désactiver" : "Activer"}
                            >
                                <Power size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal de création */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nouvel Administrateur">
                <form onSubmit={handleCreate} className="space-y-5">
                    {/* Upload Photo Simple */}
                    <div className="flex justify-center mb-4">
                        <label className="relative cursor-pointer group">
                            <div className="h-20 w-20 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group-hover:border-primary transition-all">
                                {selectedFile ? <img src={URL.createObjectURL(selectedFile)} className="object-cover h-full w-full" alt="" /> : <Camera className="text-slate-400" />}
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])} />
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input className="input-premium" placeholder="Prénom" onChange={e => setFormData({...formData, firstName: e.target.value})} required />
                        <input className="input-premium" placeholder="Nom" onChange={e => setFormData({...formData, lastName: e.target.value})} required />
                    </div>
                    <input className="input-premium" placeholder="Nom d'utilisateur" onChange={e => setFormData({...formData, username: e.target.value})} required />
                    <input className="input-premium" type="email" placeholder="Email @entreprise.cm" onChange={e => setFormData({...formData, email: e.target.value})} required />
                    <input className="input-premium" placeholder="Téléphone" onChange={e => setFormData({...formData, phone: e.target.value})} required />
                    
                    <div className="pt-4 flex gap-3">
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1 h-12">Annuler</Button>
                        <Button type="submit" isLoading={isSubmitting} className="flex-1 h-12 shadow-lg shadow-primary/20">Créer le compte</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
