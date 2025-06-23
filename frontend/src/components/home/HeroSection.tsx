'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HeroSection() {
  const router = useRouter();

  // Função para navegar até /demo
  const handleTestDemos = () => {
    router.push('/demo');
  };

  return (
    <div className="relative bg-mental-light min-h-[85vh] flex items-center pt-16">
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
        {/* Conteúdo da esquerda */}
        <div className="md:w-1/2 mb-8 md:mb-0 z-10 animate-fade-in">
          <div className="bg-mental-blue/20 inline-block px-4 py-2 rounded-full mb-4">
            <p className="text-mental-purple-dark font-semibold text-sm">
              Nova NR-1: Em vigor a partir de 26 de maio de 2025
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Proteja a saúde mental no{' '}
            <span className="gradient-text">ambiente de trabalho</span>
          </h1>
          <p className="text-mental-gray text-xl mb-8 max-w-xl">
            Otimize a produtividade da sua empresa com a plataforma MenteSegura.
            Além disso, ajudamos a atender às novas exigências da NR-1, onde toda
            empresa deverá identificar, avaliar e gerenciar riscos psicossociais.
            <br />
            Conecte sua empresa e colaboradores com profissionais da saúde mental
            num ecossistema completo de ferramentas para o bem-estar psicológico e
            emocional, em conformidade com a NR-1 (Lei 14.831/2024).
          </p>

          <Button
            onClick={handleTestDemos}
            className="bg-mental-purple hover:bg-mental-purple-dark text-white px-8 py-6 rounded-lg text-lg"
          >
            Testar Demos
          </Button>
        </div>

        {/* Imagem da direita */}
        <div className="md:w-1/2 flex justify-center relative z-10">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-mental-purple/20 to-mental-blue/20 rounded-lg blur-lg"></div>
            <Image
              src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
              alt="Pessoa trabalhando em ambiente saudável"
              width={1050}
              height={700}
              className="w-full max-w-lg rounded-lg shadow-xl relative animate-float"
              priority
            />
            <div className="absolute -bottom-6 -left-6 md:-left-10 bg-white p-4 rounded-lg shadow-lg animate-pulse-light">
              <div className="flex items-center">
                <div className="bg-green-500 h-4 w-4 rounded-full mr-2"></div>
                <span className="text-sm font-medium">
                  89% dos funcionários se sentem mais apoiados
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}
