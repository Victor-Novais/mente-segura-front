"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, BookOpen, Award, Briefcase, Code } from "lucide-react";

const FoundersSection = () => {
  return (
    <section className="py-16 bg-mental-light">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Conheça os <span className="gradient-text">Fundadores</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Djalma Pinho */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex-shrink-0 mb-6">
              <Avatar className="h-32 w-32 border-4 border-mental-purple shadow-lg">
                <AvatarImage
                  src="/images/djalma.png"
                  alt="Djalma Pinho"
                />
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">
                <span className="gradient-text">Djalma Pinho</span>
              </h2>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
                  <GraduationCap className="h-4 w-4 text-mental-purple" />
                  <span className="text-sm font-medium">Ph.D</span>
                </div>
                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
                  <BookOpen className="h-4 w-4 text-mental-purple" />
                  <span className="text-sm font-medium">Best-seller Author</span>
                </div>
                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
                  <Award className="h-4 w-4 text-mental-purple" />
                  <span className="text-sm font-medium">Membro IOC Harvard</span>
                </div>
              </div>

              <p className="text-mental-gray">
                Neurociência & Comportamento • Fundador Spiritual Intelligence Institute • Giant Menthor
              </p>
            </div>
          </div>

          {/* Marco Sulzbacher */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex-shrink-0 mb-6">
              <Avatar className="h-32 w-32 border-4 border-mental-purple shadow-lg">
                <AvatarImage
                  src="/images/marco.jpg"
                  alt="Marco Sulzbacher"
                />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">
                <span className="gradient-text">Marco Sulzbacher</span>
              </h2>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
                  <Code className="h-4 w-4 text-mental-purple" />
                  <span className="text-sm font-medium">Tech Entrepreneur</span>
                </div>
                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
                  <Briefcase className="h-4 w-4 text-mental-purple" />
                  <span className="text-sm font-medium">CEO GR Digital</span>
                </div>
                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
                  <Award className="h-4 w-4 text-mental-purple" />
                  <span className="text-sm font-medium">Fundador FreeSpirit</span>
                </div>
              </div>

              <p className="text-mental-gray">
                Empreendedor Digital • Especialista em Tecnologia • Desenvolvedor Full Stack
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection; 