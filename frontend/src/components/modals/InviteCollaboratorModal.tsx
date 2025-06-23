'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClipboardCopy, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";

interface Props {
    open: boolean;
    onClose: () => void;
}

export function InviteCollaboratorModal({ open, onClose }: Props) {
    const [code, setCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const baseUrl = "https://mentesegura.com.br/registro";

    // Busca o código atual
    const fetchCode = async () => {
        setLoading(true);
        try {
            const { data } = await api.get<{
                registrationCode: string | null;
            }>("/companies/registration-code");
            setCode(data.registrationCode);
        } catch (err) {
            console.error("❌ Erro ao buscar código:", err);
            toast({ title: "Erro ao buscar código de registro" });
        } finally {
            setLoading(false);
        }
    };

    // Regenera um novo código
    const regenerateCode = async () => {
        setLoading(true);
        try {
            const { data } = await api.post<{
                registrationCode: string;
            }>("/companies/generate-code");
            setCode(data.registrationCode);
            toast({ title: "Novo código gerado com sucesso!" });
        } catch (err) {
            console.error("❌ Erro ao gerar novo código:", err);
            toast({ title: "Erro ao gerar novo código" });
        } finally {
            setLoading(false);
        }
    };

    // Copia o link completo para a área de transferência
    const handleCopy = () => {
        if (!code) return;
        const fullLink = `${baseUrl}?code=${code}`;
        navigator.clipboard.writeText(fullLink);
        toast({ title: "Link copiado para a área de transferência!" });
    };

    // Ao abrir o diálogo, busca o código
    useEffect(() => {
        if (open) {
            fetchCode();
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg p-6 rounded-2xl shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-zinc-900">
                        Convite para Novo Colaborador
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Mostrar apenas o código puro */}
                    <div className="space-y-1">
                        <Label className="text-sm text-zinc-700">
                            Código de Registro
                        </Label>
                        <Input
                            readOnly
                            disabled={loading}
                            value={loading ? "Carregando..." : code || ""}
                            className="font-mono text-sm"
                        />
                    </div>

                    {/* Link completo para cadastro */}
                    <div className="space-y-1">
                        <Label className="text-sm text-zinc-700">
                            Link de Cadastro
                        </Label>
                        <div className="relative">
                            <Input
                                readOnly
                                disabled={!code}
                                value={`${baseUrl}?code=${code || ""}`}
                                className="pr-10 text-sm"
                            />
                            <ClipboardCopy
                                className="absolute right-3 top-2.5 h-4 w-4 text-zinc-500 hover:text-zinc-800 cursor-pointer"
                                onClick={handleCopy}
                            />
                        </div>
                    </div>

                    {/* Botões de regenerar e fechar */}
                    <div className="flex justify-between pt-2">
                        <Button
                            variant="outline"
                            className="border-zinc-300"
                            onClick={regenerateCode}
                            disabled={loading}
                        >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Novo Código
                        </Button>
                        <Button
                            onClick={onClose}
                            className="bg-mental-purple hover:bg-mental-purple-dark text-white"
                        >
                            Fechar
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
