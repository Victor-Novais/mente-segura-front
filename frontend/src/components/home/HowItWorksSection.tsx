import React from 'react';
import Image from 'next/image';

const steps = [
  {
    number: "01",
    title: "Diagnóstico Inicial",
    description: "Aplicação de questionários e coleta de dados para entender o cenário atual da empresa."
  },
  {
    number: "02",
    title: "Identificação de Riscos",
    description: "Mapeamento dos principais fatores de risco psicossocial presentes no ambiente de trabalho."
  },
  {
    number: "03",
    title: "Plano de Ação",
    description: "Desenvolvimento de estratégias personalizadas para mitigar os riscos identificados."
  },
  {
    number: "04",
    title: "Monitoramento Contínuo",
    description: "Acompanhamento contínuo dos indicadores e ajuste das ações conforme necessário."
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-mental-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <Image 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80" 
              alt="Equipe trabalhando em ambiente saudável" 
              width={1051}
              height={700}
              className="rounded-lg shadow-xl max-w-full" 
            />
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Como <span className="gradient-text">implementamos</span> a solução
            </h2>
            <p className="text-mental-gray text-lg mb-8">
              Nossa metodologia estruturada garante a implementação completa da solução, desde o diagnóstico inicial até o monitoramento contínuo dos riscos psicossociais.
            </p>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex">
                  <div className="mr-6">
                    <div className="bg-mental-purple text-white font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-mental-gray">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 