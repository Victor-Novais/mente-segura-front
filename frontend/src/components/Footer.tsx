"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Linkedin, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="font-poppins text-2xl font-bold text-mental-purple mb-4">Mente<span className="text-mental-blue">Segura</span></div>
            <p className="text-gray-400 mb-4">
              Plataforma completa para gestão de riscos psicossociais no trabalho, em conformidade com a nova NR-1.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-mental-purple">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-mental-purple">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-mental-purple">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Produto</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-mental-purple transition-colors">Funcionalidades</a></li>
              <li><a href="#" className="text-gray-400 hover:text-mental-purple transition-colors">Preços</a></li>
              <li><a href="#" className="text-gray-400 hover:text-mental-purple transition-colors">Integrações</a></li>
              <li><a href="#" className="text-gray-400 hover:text-mental-purple transition-colors">Estudos de caso</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-mental-purple transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-mental-purple transition-colors">Guia da NR-1</a></li>
              <li><a href="#" className="text-gray-400 hover:text-mental-purple transition-colors">Webinars</a></li>
              <li><a href="#" className="text-gray-400 hover:text-mental-purple transition-colors">Base de conhecimento</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Entre em contato</h3>
            <p className="text-gray-400 mb-4">Receba nossas atualizações sobre a NR-1 e saúde mental no trabalho.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-mental-purple"
              />
              <Button className="bg-mental-purple hover:bg-mental-purple-dark text-white rounded-l-none rounded-r-lg">
                Enviar
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 MenteSegura. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="/terms" className="text-gray-400 hover:text-mental-purple text-sm">Política de Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-mental-purple text-sm">Termos de Uso</a>
              <a href="#" className="text-gray-400 hover:text-mental-purple text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 