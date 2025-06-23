"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  {
    year: '2019',
    total: 212256,
    ansiedade: null,
    depressao: null
  },
  {
    year: '2020',
    total: 285221,
    ansiedade: null,
    depressao: null
  },
  {
    year: '2021',
    total: 176177,
    ansiedade: 49481,
    depressao: 49582
  },
  {
    year: '2022',
    total: 201000,
    ansiedade: 54203,
    depressao: 50027
  },
  {
    year: '2023',
    total: 283471,
    ansiedade: 80516,
    depressao: 67966
  },
  {
    year: '2024',
    total: 472328,
    ansiedade: null,
    depressao: null
  }
];

const MentalHealthChart = () => {
  return (
    <section className="py-16 bg-mental-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Afastamentos por Transtornos Mentais crescem 67% no último ano
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    value ? value.toLocaleString('pt-BR') : 'N/A',
                    'Casos'
                  ]}
                />
                <Legend />
                <Bar
                  dataKey="total"
                  name="Total de Afastamentos"
                  fill="#9b87f5"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="ansiedade"
                  name="Ansiedade (CID F42)"
                  fill="#7E69AB"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="depressao"
                  name="Depressão (CID F32)"
                  fill="#D3E4FD"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-mental-gray mt-4 text-center">
            Fonte: Dados da Previdência Social (INSS/Ministério da Previdência e Trabalho)
          </p>
        </div>
      </div>
    </section>
  );
};

export default MentalHealthChart; 