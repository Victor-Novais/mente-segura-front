'use client';

import { useChecklistModal } from '@/components/context/ChecklistModalProvider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

export function ChecklistModal() {
    const { open, setOpen, setChecklistCompleted } = useChecklistModal();

    const [form, setForm] = useState({
        name: '',
        whatsapp: '',
        email: '',
        company: '',
        employees: '',
        group: false,
    });

    function generateWhatsAppLink(data: typeof form) {
        const message = `
🚀 *Checklist - Saúde Mental na Empresa*  

*Nome:* ${data.name}  
*WhatsApp:* ${data.whatsapp}  
*Email:* ${data.email}  
*Empresa:* ${data.company}  
*Quantidade de Funcionários:* ${data.employees}  
${data.group ? '✅ Desejo participar do grupo exclusivo.' : ''}  

_Gerado via Plataforma MenteSegura_
        `;

        return `https://api.whatsapp.com/send/?phone=5548996839045&text=${encodeURIComponent(
            message
        )}&type=phone_number&app_absent=1`;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const link = generateWhatsAppLink(form);
        window.open(link, '_blank');

        setChecklistCompleted(true);
        setOpen(false);
    };

    const textFields = [
        { label: 'Nome Completo', key: 'name' },
        { label: 'WhatsApp', key: 'whatsapp' },
        { label: 'Email Corporativo', key: 'email', type: 'email' },
        { label: 'Nome da Empresa', key: 'company' },
        { label: 'Quantidade de Funcionários', key: 'employees', type: 'number' },
    ];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg rounded-3xl p-8 shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-mental-purple">
                        Checklist Saúde Mental na Empresa
                    </DialogTitle>
                    <p className="text-sm text-zinc-500 mt-2">
                        Preencha os dados abaixo e receba <span className="font-semibold text-mental-purple">gratuitamente</span> um checklist exclusivo para avaliar a saúde mental organizacional da sua empresa.
                    </p>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {textFields.map(({ label, key, type }) => (
                        <div key={key} className="space-y-1">
                            <Label className="text-zinc-700 font-medium">{label}</Label>
                            <Input
                                type={type || 'text'}
                                value={String(form[key as keyof typeof form] ?? '')}
                                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                required
                                className="bg-zinc-50 border border-zinc-200 focus:ring-mental-purple focus:border-mental-purple rounded-xl"
                            />
                        </div>
                    ))}

                    <div className="flex items-start gap-2">
                        <Checkbox
                            checked={form.group}
                            onCheckedChange={(checked) => setForm({ ...form, group: Boolean(checked) })}
                        />
                        <Label className="text-sm text-zinc-700">
                            Desejo fazer parte do <span className="text-mental-purple font-semibold">grupo exclusivo</span> de empresas que priorizam saúde mental.
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-mental-purple hover:bg-mental-purple-dark text-white text-sm h-11 rounded-xl"
                    >
                        Acessar Checklist Gratuito
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
