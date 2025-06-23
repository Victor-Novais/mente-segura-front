import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const statistics = [
  {
    value: "40%",
    description: "de redução no absenteísmo após implementação de programas de saúde mental",
    source: "Estudo Harvard Business Review"
  },
  {
    value: "R$ 2.500",
    description: "é o custo médio por colaborador em afastamentos por questões de saúde mental",
    source: "Pesquisa ABRH"
  },
  {
    value: "3.5x",
    description: "maior produtividade em equipes com bem-estar mental adequado",
    source: "Estudo McKinsey"
  },
  {
    value: "85%",
    description: "de retenção de talentos em empresas com programas de saúde mental",
    source: "Pesquisa Deloitte"
  }
];

const StatisticsSection = () => {
  return (
    <section id="statistics" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O <span className="gradient-text">impacto financeiro</span> da saúde mental nas empresas
          </h2>
          <p className="text-mental-gray text-lg max-w-2xl mx-auto">
            Dados concretos que demonstram como investir em saúde mental gera resultados tangíveis para sua organização.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <Card key={index} className="border-t-4 border-t-mental-purple hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-mental-purple-dark mb-3">{stat.value}</p>
                <p className="text-mental-gray mb-3">{stat.description}</p>
                <p className="text-xs text-mental-gray opacity-70">Fonte: {stat.source}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection; 