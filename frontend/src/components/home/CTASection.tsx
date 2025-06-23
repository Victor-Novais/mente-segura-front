"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Check } from "lucide-react";

const benefits = [
  "Conformidade com a nova NR-1",
  "Redução de afastamentos e turnover",
  "Aumento de produtividade",
  "Melhora no clima organizacional",
  "Proteção contra multas e processos",
  "Valorização da marca empregadora"
];

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-mental">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-7/12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Gere mais resultados investindo em <span className="gradient-text">
                  saúde mental
                  </span>{` `}
                  na sua empresa
              </h2>
              <p className="text-mental-gray text-lg mb-8">
                Com a MenteSegura, sua empresa estará preparada para atender às exigências da nova NR-1 e criar um ambiente de trabalho mais saudável e produtivo.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-mental-purple hover:bg-mental-purple-dark text-white px-6 py-5 rounded-lg text-lg">
                  Começar agora
                </Button>
                <Button variant="outline" className="border-mental-purple text-mental-purple hover:bg-mental-purple hover:text-white px-6 py-5 rounded-lg text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5" /> Agendar Demonstração
                </Button>
              </div>
            </div>
            
            <div className="md:w-5/12">
              <div className="bg-mental-light p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Solicite uma demonstração gratuita</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-mental-purple focus:border-mental-purple"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                    <input 
                      type="text" 
                      id="company" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-mental-purple focus:border-mental-purple"
                      placeholder="Nome da empresa"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail corporativo</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-mental-purple focus:border-mental-purple"
                      placeholder="seu@empresa.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-1">Número de funcionários</label>
                    <select 
                      id="employees" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-mental-purple focus:border-mental-purple"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="1-50">1-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="501+">501+</option>
                    </select>
                  </div>
                  <Button className="w-full bg-mental-purple hover:bg-mental-purple-dark text-white py-2">
                    Solicitar Demonstração
                  </Button>
                  <p className="text-xs text-center text-mental-gray">
                    Ao enviar, você concorda com nossa política de privacidade.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 