import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Brain, FileText, Shield, Users } from "lucide-react";

const features = [
  {
    icon: <Brain className="h-10 w-10 text-mental-purple" />,
    title: "Avaliação de Estresse",
    description: "Monitore níveis de estresse e burnout entre seus colaboradores com questionários cientificamente validados."
  },
  {
    icon: <Bell className="h-10 w-10 text-mental-purple" />,
    title: "Alerta de Assédio",
    description: "Canal seguro para reportar situações de assédio moral com total confidencialidade."
  },
  {
    icon: <Bell className="h-10 w-10 text-mental-purple" />,
    title: "Notificações Preventivas",
    description: "Alertas automáticos quando indicadores de risco psicossocial ultrapassam limites aceitáveis."
  },
  {
    icon: <FileText className="h-10 w-10 text-mental-purple" />,
    title: "Relatórios para NR-1",
    description: "Geração automática de relatórios em conformidade com as exigências da nova NR-1."
  },
  {
    icon: <Users className="h-10 w-10 text-mental-purple" />,
    title: "Gestão de Equipes",
    description: "Ferramentas para líderes monitorarem a saúde mental de suas equipes e intervirem preventivamente."
  },
  {
    icon: <Shield className="h-10 w-10 text-mental-purple" />,
    title: "Proteção de Dados",
    description: "Dados sensíveis protegidos com criptografia de ponta a ponta, respeitando a LGPD."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ferramentas completas para <span className="gradient-text">
              saúde mental corporativa</span>
          </h2>
          <p className="text-mental-gray text-lg max-w-2xl mx-auto">
            Nossa plataforma oferece recursos essenciais para identificar, avaliar e gerenciar os riscos psicossociais no ambiente de trabalho.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <Card className="h-full transition-all hover:shadow-lg hover:border-mental-purple">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-mental-gray">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 