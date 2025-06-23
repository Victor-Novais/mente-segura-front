'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hooks do Framer Motion para capturar o scroll vertical
  const { scrollY } = useScroll();
  // Transformamos a distância rolada em um valor de blur
  // Quando scrollY for 0 => blur(0px), quando scrollY chegar em 200px => blur(8px)
  const backdropBlur = useTransform(
    scrollY,
    [0, 200],
    ['blur(0px)', 'blur(8px)']
  );

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    // Transformamos <nav> em um <motion.nav> para aplicar a propriedade backdropFilter animada
    <motion.nav
      style={{ backdropFilter: backdropBlur }}
      className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-md z-50"
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-16 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-1">
          <span className="font-poppins text-2xl font-bold text-mental-purple">Mente</span>
          <span className="font-poppins text-2xl font-bold text-mental-purple-dark">Segura</span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-6">
            <li>
              <a
                href="#ferramentas-mentais"
                onClick={(e) => handleSmoothScroll(e, 'ferramentas-mentais')}
                className="text-mental-gray hover:text-mental-purple font-medium transition-colors duration-150"
              >
                O que é
              </a>
            </li>
            <li>
              <Link
                href="/calculadora"
                className="text-mental-gray hover:text-mental-purple font-medium transition-colors duration-150"
              >
                Calculadora
              </Link>
            </li>
            <li>
              <a
                href="#como-implementamos"
                onClick={(e) => handleSmoothScroll(e, 'como-implementamos')}
                className="text-mental-gray hover:text-mental-purple font-medium transition-colors duration-150"
              >
                Como Funciona
              </a>
            </li>
          </ul>

          {/* Botões Desktop */}
          <div className="flex items-center space-x-4">
            <Link href="/register/choice">
              <Button
                variant="default"
                className="bg-mental-purple text-white hover:bg-mental-purple-dark focus:outline-none focus:ring-2 focus:ring-mental-purple/40 px-4 py-2 rounded-lg transition"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Criar Conta
              </Button>
            </Link>

            <Link href="/login">
              <Button
                variant="ghost"
                className="border-mental-purple text-mental-purple hover:bg-mental-purple/10 focus:ring-2 focus:ring-mental-purple/30 px-4 py-2 rounded-lg transition"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </Button>
            </Link>
          </div>
        </div>

        {/* Botão Mobile */}
        <button
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="md:hidden text-mental-gray focus:outline-none focus:ring-2 focus:ring-mental-purple/30 rounded"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md animate-fade-in-down">
          <div className="container mx-auto px-6 pb-6 flex flex-col space-y-4">
            <ul className="flex flex-col space-y-2 mt-2">
              <li>
                <a
                  href="#ferramentas-mentais"
                  onClick={(e) => handleSmoothScroll(e, 'ferramentas-mentais')}
                  className="block text-mental-gray hover:text-mental-purple font-medium px-2 py-2 rounded"
                >
                  O que é
                </a>
              </li>
              <li>
                <Link
                  href="/calculadora"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-mental-gray hover:text-mental-purple font-medium px-2 py-2 rounded"
                >
                  Calculadora
                </Link>
              </li>
              <li>
                <a
                  href="#como-implementamos"
                  onClick={(e) => handleSmoothScroll(e, 'como-implementamos')}
                  className="block text-mental-gray hover:text-mental-purple font-medium px-2 py-2 rounded"
                >
                  Como Funciona
                </a>
              </li>
            </ul>

            {/* Botões Mobile */}
            <div className="flex flex-col space-y-3 mt-4">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-mental-purple text-mental-purple hover:bg-mental-purple/10 px-4 py-2 rounded-lg transition"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </Button>
              </Link>

              <Link href="/register/choice" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="default"
                  className="w-full bg-mental-purple text-white hover:bg-mental-purple-dark px-4 py-2 rounded-lg transition"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Criar Conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navigation;
