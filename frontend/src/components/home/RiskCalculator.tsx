// File: components/RiskCalculator.tsx
'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertCircle,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { generatePDF } from '@/lib/generatePDF';

// Enum local idêntico ao usado no backend/Nest
export enum LeadFormType {
  RISK_CALCULATOR = 'RISK_CALCULATOR',
  DEMO_REQUEST = 'DEMO_REQUEST',
  HOME_FORM = 'HOME_FORM',
}

// Interface para capturar os valores do formulário
interface FormData {
  employees: string;
  monthlyPayroll: string;
  turnover: string;
  absences: string;
  companyName: string;
  responsible: string;
  whatsapp: string;
  email: string;
}

// Interface para os resultados calculados
interface Results {
  riskLevel: 'Baixo' | 'Médio' | 'Alto';
  riskScore: number;
  recommendations: string[];
  costs: {
    absenteism: number;
    presentism: number;
    turnover: number;
    legal: number;
    total: number;
    perEmployee: number;
  };
  productivity: number;
}

const RiskCalculator: React.FC = () => {
  // Estado do formulário
  const [formData, setFormData] = useState<FormData>({
    employees: '',
    monthlyPayroll: '',
    turnover: '15',
    absences: '5',
    companyName: '',
    responsible: '',
    whatsapp: '',
    email: '',
  });

  // Estado para armazenar resultados após o cálculo
  const [results, setResults] = useState<Results | null>(null);

  // Estado para controlar animação de entrada
  const [mounted, setMounted] = useState(false);

  // Lê a variável de ambiente definida em .env.local (Next.js)
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  // Ao montar, dispara animação (fade-in + slide)
  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  // Handler genérico para campos de input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Função que faz todos os cálculos de risco e custos
  const calculateRisk = () => {
    // Extrai valores numéricos do formulário
    const employees = parseInt(formData.employees) || 0;

    // Converte string “R$ 4.000,00” ou “4000” para number 4000.00
    const numericString = formData.monthlyPayroll.replace(/[^\d]/g, '');
    const monthlyPayroll = numericString
      ? parseFloat(numericString) / 100 // ex: “400000” vira 4000.00
      : 0;

    // Turnover e absences podem vir com “%” ou sem, ex: “15” ou “15%”
    const turnover = parseInt(formData.turnover.replace('%', '')) || 0;
    const absences = parseInt(formData.absences.replace('%', '')) || 0;

    // Cálculo de produtividade (0 a 100)
    const productivity = Math.max(0, 100 - (turnover * 0.5 + absences * 0.5));

    // Risk score (0 a 100)
    const riskScore = Math.min(100, Math.max(0, turnover * 0.5 + absences * 0.5));

    // Define nível de risco based on riskScore
    let riskLevel: 'Baixo' | 'Médio' | 'Alto';
    if (riskScore < 30) riskLevel = 'Baixo';
    else if (riskScore < 60) riskLevel = 'Médio';
    else riskLevel = 'Alto';

    // Cálculo do salário médio e salário diário
    const avgSalary = employees > 0 ? monthlyPayroll / employees : 0;
    const avgDailySalary = avgSalary / 22; // 22 dias úteis por mês

    // 1) Custo de absenteísmo
    // (absences% / 100) * employees * avgDailySalary * 22 dias * fator 1.5
    const absenteismCost =
      (absences / 100) * employees * avgDailySalary * 22 * 1.5;

    // 2) Custo de presenteísmo
    // assume: 18% dos funcionários sofrem presenteísmo, cada um com avgSalary * 0.3
    const presentismCost = Math.round(employees * 0.18) * avgSalary * 0.3;

    // 3) Custo de turnover
    // (turnover% / 100) * employees * avgSalary * 1.5
    const turnoverCost =
      Math.round((turnover / 100) * employees) * avgSalary * 1.5;

    // 4) Custo jurídico
    const legalCostMultiplier =
      riskLevel === 'Alto'
        ? 0.15
        : riskLevel === 'Médio'
          ? 0.08
          : 0.03;
    const legalCost = monthlyPayroll * legalCostMultiplier;

    // Soma de todos os custos
    const totalCosts = absenteismCost + presentismCost + turnoverCost + legalCost;
    const costsPerEmployee = employees > 0 ? totalCosts / employees : 0;

    // Recomendações fixas (static array)
    const recommendations = [
      'Implementar programa de saúde mental',
      'Realizar avaliações periódicas',
      'Capacitar gestores em saúde mental',
      'Criar canais de comunicação',
      'Estabelecer políticas de bem-estar',
    ];

    // Atualiza estado de resultados
    setResults({
      riskLevel,
      riskScore,
      recommendations,
      costs: {
        absenteism: absenteismCost,
        presentism: presentismCost,
        turnover: turnoverCost,
        legal: legalCost,
        total: totalCosts,
        perEmployee: costsPerEmployee,
      },
      productivity,
    });
  };

  // Função para gerar o PDF, enviar lead ao backend e abrir o WhatsApp
  const handleSendWhatsApp = async () => {
    if (!results) return;

    // Monta a mensagem que será preenchida no WhatsApp
    const message = `🚨 Relatório de Riscos Psicossociais - ${formData.companyName}

👤 Responsável: ${formData.responsible}
📞 WhatsApp: ${formData.whatsapp}
✉️ Email: ${formData.email}

🔍 Nível de Risco: ${results.riskLevel}
📊 Score: ${results.riskScore.toFixed(1)}/100
⚙️ Produtividade: ${results.productivity.toFixed(1)}%

💰 Prejuízo Total: R$ ${results.costs.total.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}
📄 Prejuízo por Colaborador: R$ ${results.costs.perEmployee.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}

✅ Recomendações:
${results.recommendations.map((rec) => '- ' + rec).join('\n')}

Relatório gerado na Calculadora MenteSegura.`;

    try {
      // 1) Envia o lead ao backend antes de gerar PDF
      await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.responsible,
          email: formData.email,
          whatsapp: formData.whatsapp,
          pageUrl: window.location.href,
          formType: LeadFormType.RISK_CALCULATOR,
          payload: {
            companyName: formData.companyName,
            employees: Number(formData.employees),
            turnover: formData.turnover,
            absences: formData.absences,
            // Você pode adicionar o objeto `results` inteiro ou apenas partes que desejar:
            riskScore: results.riskScore,
            totalCost: results.costs.total,
          },
        }),
      });

      // 2) Gera o PDF (capturando o container "calculator" sem cortes)
      await generatePDF('calculator');

      // 3) Depois abre o WhatsApp com a mensagem já preenchida
      const whatsappURL = `https://api.whatsapp.com/send/?phone=55${formData.whatsapp.replace(
        /[^\d]/g,
        ''
      )}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=1`;

      window.open(whatsappURL, '_blank');
    } catch (err) {
      console.error('Erro ao enviar lead ou gerar PDF:', err);
      alert('Houve um problema ao gerar o relatório. Tente novamente mais tarde.');
    }
  };

  return (
    <section
      id="calculator"
      className={`py-20 bg-mental-light transition-opacity transition-transform duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      <div className="container mx-auto px-4">
        {/* Título e descrição */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Calculadora</span> de Riscos Psicossociais
          </h2>
          <p className="text-mental-gray text-lg">
            Avalie gratuitamente o impacto dos riscos psicossociais na sua empresa e gere
            um relatório profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* ====== Formulário de entrada ====== */}
          <Card className="bg-white shadow-lg transform transition-transform duration-500 ease-out hover:scale-[1.02]">
            <CardContent className="p-6">
              <form
                onSubmit={(e: FormEvent) => {
                  e.preventDefault();
                  calculateRisk();
                }}
                className="space-y-5"
              >
                {/* Campos numéricos: employees, monthlyPayroll, turnover, absences */}
                {['employees', 'monthlyPayroll', 'turnover', 'absences'].map((field) => (
                  <div key={field}>
                    <Label htmlFor={field} className="font-medium">
                      {field === 'employees' && 'Número de Colaboradores'}
                      {field === 'monthlyPayroll' && 'Folha de Pagamento Mensal'}
                      {field === 'turnover' && 'Taxa de Rotatividade (%)'}
                      {field === 'absences' && 'Taxa de Absenteísmo (%)'}
                    </Label>
                    <Input
                      id={field}
                      type={field === 'employees' ? 'number' : 'text'}
                      value={(formData as any)[field]}
                      onChange={handleInputChange}
                      placeholder={
                        field === 'monthlyPayroll'
                          ? 'R$ 0,00'
                          : field === 'turnover' || field === 'absences'
                            ? '0'
                            : 'Ex: 100'
                      }
                      className="mt-1"
                      required
                    />
                  </div>
                ))}

                <Button
                  type="submit"
                  className="w-full bg-mental-purple hover:bg-mental-purple-dark text-white"
                >
                  Calcular Riscos
                </Button>

                {/* Se já existirem resultados, mostra a seção "Receba o relatório completo" */}
                {results && (
                  <div className="border-t pt-6 space-y-4">
                    <h3 className="text-lg font-semibold">
                      Receba o relatório completo
                    </h3>

                    {/* Campos para receber nome da empresa, responsável, WhatsApp e email */}
                    {['companyName', 'responsible', 'whatsapp', 'email'].map(
                      (field) => (
                        <div key={field}>
                          <Label htmlFor={field} className="font-medium">
                            {field === 'companyName' && 'Nome da Empresa'}
                            {field === 'responsible' && 'Nome do Responsável'}
                            {field === 'whatsapp' && 'WhatsApp'}
                            {field === 'email' && 'Email'}
                          </Label>
                          <Input
                            id={field}
                            type={field === 'email' ? 'email' : 'text'}
                            value={(formData as any)[field]}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                          />
                        </div>
                      )
                    )}

                    <Button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="w-full bg-mental-purple hover:bg-mental-purple-dark text-white"
                    >
                      Gerar PDF e Enviar por WhatsApp
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* ====== Resultado dos Cálculos ====== */}
          {results && (
            <div className="space-y-6">
              {/* --- Nível de Risco --- */}
              <Card className="bg-white shadow-md transform transition-transform duration-500 ease-out hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Nível de Risco</h3>
                    <div
                      className={`px-4 py-2 rounded-full ${results.riskLevel === 'Baixo'
                          ? 'bg-green-100 text-green-800'
                          : results.riskLevel === 'Médio'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {results.riskLevel}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${results.riskLevel === 'Baixo'
                          ? 'bg-green-500'
                          : results.riskLevel === 'Médio'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                      style={{ width: `${results.riskScore}%` }}
                    />
                  </div>
                  <p className="text-sm text-mental-gray mt-2">
                    Score: {results.riskScore.toFixed(1)}/100
                  </p>
                </CardContent>
              </Card>

              {/* --- Nível de Produtividade --- */}
              <Card className="bg-white shadow-md transform transition-transform duration-500 ease-out hover:scale-[1.02]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Nível de Produtividade
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${results.productivity >= 80
                          ? 'bg-green-500'
                          : results.productivity >= 60
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                      style={{ width: `${results.productivity}%` }}
                    />
                  </div>
                  <p className="text-sm text-mental-gray mt-2">
                    Produtividade: {results.productivity.toFixed(1)}%
                  </p>
                </CardContent>
              </Card>

              {/* --- Estimativa de Custos --- */}
              <Card className="bg-white shadow-md transform transition-transform duration-500 ease-out hover:scale-[1.02]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Estimativa de Custos
                  </h3>
                  <div className="space-y-6">
                    {/* Absenteísmo */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-mental-purple" />
                          <span>Absenteísmo</span>
                        </div>
                        <span className="font-bold">
                          R${' '}
                          {results.costs.absenteism.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-mental-gray pl-7">
                        Custos com faltas e ausências dos colaboradores, incluindo
                        substituição temporária e perda de produtividade.
                      </p>
                    </div>

                    {/* Presenteísmo */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-mental-purple" />
                          <span>Presenteísmo</span>
                        </div>
                        <span className="font-bold">
                          R${' '}
                          {results.costs.presentism.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-mental-gray pl-7">
                        Impacto financeiro da baixa produtividade de colaboradores que
                        estão presentes, mas com problemas de saúde mental.
                      </p>
                    </div>

                    {/* Turnover */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-mental-purple" />
                          <span>Turnover</span>
                        </div>
                        <span className="font-bold">
                          R${' '}
                          {results.costs.turnover.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-mental-gray pl-7">
                        Custos com desligamento, recrutamento, seleção e treinamento de
                        novos colaboradores.
                      </p>
                    </div>

                    {/* Custos Jurídicos */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-mental-purple" />
                          <span>Custos Jurídicos</span>
                        </div>
                        <span className="font-bold">
                          R${' '}
                          {results.costs.legal.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-mental-gray pl-7">
                        Estimativa de custos com processos trabalhistas, indenizações e
                        ações judiciais relacionadas à saúde mental.
                      </p>
                    </div>

                    {/* Total de Prejuízos */}
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-mental-purple" />
                          <span>Total de Prejuízos</span>
                        </div>
                        <span className="font-bold text-mental-purple">
                          R${' '}
                          {results.costs.total.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-mental-gray pl-7">
                        Soma de todos os custos diretos e indiretos relacionados aos
                        riscos psicossociais na empresa.
                      </p>
                      <p className="text-sm text-mental-gray mt-2 pl-7">
                        Impacto por colaborador:{' '}
                        <span className="font-semibold text-mental-purple">
                          R${' '}
                          {results.costs.perEmployee.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* --- Outros Prejuízos --- */}
              <Card className="bg-white shadow-md transform transition-transform duration-500 ease-out hover:scale-[1.02]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Outros Prejuízos</h3>
                  <div className="space-y-6">
                    {/* Desvalorização da Marca */}
                    <div>
                      <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-mental-purple" />
                        Desvalorização da Marca
                      </h4>
                      <ul className="space-y-2 pl-7">
                        <li className="flex items-start gap-2">
                          <span className="text-mental-purple">•</span>
                          <span>Impacto negativo na reputação da empresa</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-mental-purple">•</span>
                          <span>Percepção negativa no mercado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-mental-purple">•</span>
                          <span>Indenizações por danos morais</span>
                        </li>
                      </ul>
                    </div>

                    {/* Impactos Operacionais */}
                    <div>
                      <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-mental-purple" />
                        Impactos Operacionais
                      </h4>
                      <ul className="space-y-2 pl-7">
                        <li className="flex items-start gap-2">
                          <span className="text-mental-purple">•</span>
                          <span>Redução na eficiência operacional</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-mental-purple">•</span>
                          <span>Comprometimento na qualidade do trabalho</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-mental-purple">•</span>
                          <span>Queda na satisfação dos clientes</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* --- Retorno do Investimento --- */}
              <Card className="bg-white shadow-md transform transition-transform duration-500 ease-out hover:scale-[1.02]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Retorno do Investimento Mente Segura</h3>
                  <div className="space-y-6">
                    {/* Investimento Mensal */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-mental-purple" />
                          <span>Investimento Mensal</span>
                        </div>
                        <span className="font-bold">
                          R${' '}
                          {(results.costs.total * 0.05).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-mental-gray pl-7">
                        Valor mensal equivalente a 5% do custo total de prejuízos identificados.
                      </p>
                    </div>

                    {/* Economia Anual Estimada */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-mental-purple" />
                          <span>Economia Anual Estimada</span>
                        </div>
                        <span className="font-bold text-green-600">
                          R${' '}
                          {(results.costs.total * 0.6).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-mental-gray pl-7">
                        Redução estimada de 60% nos custos com riscos psicossociais após 12 meses de programa.
                      </p>
                    </div>

                    {/* ROI em 12 meses */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-mental-purple" />
                          <span>ROI em 12 meses</span>
                        </div>
                        <span className="font-bold text-green-600">12,1x</span>
                      </div>
                      <p className="text-sm text-mental-gray pl-7">
                        Para cada real investido, a empresa recebe de volta 12,1 reais em economia e produtividade.
                      </p>
                    </div>

                    {/* Observação final */}
                    <div className="border-t pt-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-mental-purple mt-1" />
                        <div>
                          <p className="text-sm text-mental-gray">
                            * Estimativas baseadas em estudos de caso e resultados médios de empresas que implementaram programas similares de saúde mental.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RiskCalculator;  
