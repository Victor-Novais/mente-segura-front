"use client";

import React from 'react';

const ImplementationTimeline = () => {
  return (
    <section className="py-20 bg-mental-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Cronograma</span> de Implementação
          </h2>
          <p className="text-mental-gray text-lg max-w-2xl mx-auto">
            A nova NR-1 entra em vigor em maio de 2025. Prepare sua empresa agora com nosso plano estruturado.
          </p>
        </div>

        <div className="relative">
          {/* Linha central */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-32 w-1 bg-mental-purple/20 shadow-md"></div>

          {/* Timeline */}
          <div className="space-y-24">
            {/* Fase 1 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-16 md:text-right mb-8 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Fase 1: Avaliação Inicial</h3>
                <p className="text-mental-gray">
                  Diagnóstico completo do ambiente organizacional, identificação de pontos críticos e análise de indicadores atuais.
                </p>
                <p className="text-sm text-mental-purple-dark mt-2">2-3 semanas</p>
              </div>
              <div className="relative flex items-center justify-center md:w-0 my-4">
                <div className="h-12 w-12 rounded-full bg-mental-purple shadow-lg flex items-center justify-center z-10">
                  <div className="h-16 w-16 rounded-full bg-mental-purple shadow-lg flex items-center justify-center z-10">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-16 md:text-left">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="font-medium">Entregáveis:</p>
                  <ul className="list-disc ml-5 mt-2 text-mental-gray">
                    <li>Mapa de riscos psicossociais</li>
                    <li>Relatório de conformidade inicial</li>
                    <li>Análise de pontos críticos</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Fase 2 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-16 md:text-right order-1 md:order-1 mb-8 md:mb-0">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="font-medium">Atividades:</p>
                  <ul className="list-disc ml-5 mt-2 text-mental-gray">
                    <li>Treinamento para gestores</li>
                    <li>Implementação de canais de comunicação</li>
                    <li>Configuração do sistema de monitoramento</li>
                  </ul>
                </div>
              </div>
              <div className="relative flex items-center justify-center order-first md:order-2 md:w-0 my-4">
                <div className="h-12 w-12 rounded-full bg-mental-purple shadow-lg flex items-center justify-center z-10">
                  <div className="h-16 w-16 rounded-full bg-mental-purple shadow-lg flex items-center justify-center z-10">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-16 md:text-left order-last md:order-3">
                <h3 className="text-xl font-bold mb-2">Fase 2: Implementação</h3>
                <p className="text-mental-gray">
                  Configuração da plataforma, treinamento das equipes e início da coleta de dados em tempo real.
                </p>
                <p className="text-sm text-mental-purple-dark mt-2">1-2 meses</p>
              </div>
            </div>

            {/* Fase 3 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-16 md:text-right mb-8 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Fase 3: Monitoramento e Ajustes</h3>
                <p className="text-mental-gray">
                  Acompanhamento contínuo, análise de indicadores e ajustes no plano de ação conforme necessário.
                </p>
                <p className="text-sm text-mental-purple-dark mt-2">Contínuo</p>
              </div>
              <div className="relative flex items-center justify-center md:w-0 my-4">
                <div className="h-12 w-12 rounded-full bg-mental-purple shadow-lg flex items-center justify-center z-10">
                  <div className="h-16 w-16 rounded-full bg-mental-purple shadow-lg flex items-center justify-center z-10">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-16 md:text-left">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="font-medium">Benefícios a longo prazo:</p>
                  <ul className="list-disc ml-5 mt-2 text-mental-gray">
                    <li>Redução de 30% em afastamentos</li>
                    <li>Melhora de 25% no clima organizacional</li>
                    <li>Conformidade total com a NR-1</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Deadline */}
          <div className="flex justify-center mt-24">
            <div className="bg-gradient-mental p-1 rounded-full">
              <div className="bg-white px-8 py-4 rounded-full shadow-xl">
                <div className="text-2xl font-bold text-mental-purple text-center">
                  90 dias
                </div>
                <div className="text-sm text-center text-mental-gray">
                  Prazo final NR-1
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImplementationTimeline;
