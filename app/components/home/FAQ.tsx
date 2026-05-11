"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'Como entrar no curso de Ciência da Computação da UFG?',
      answer: 'Para entrar no curso, você deve participar do vestibular da UFG ou através do Sistema de Seleção Unificada (SiSU), utilizando a nota do Exame Nacional do Ensino Médio (ENEM). Mais detalhes estão disponíveis no site da UFG.'
    },
    {
      question: 'Qual é a duração do curso de Ciência da Computação?',
      answer: 'O curso tem duração de 4 anos, dividido em 8 semestres, com carga horária total de aproximadamente 3.200 horas.'
    },
    {
      question: 'Quais são os pré-requisitos para o curso?',
      answer: 'É necessário ter concluído o Ensino Médio. Não há exigência de vestibular específico para computação, mas conhecimentos básicos em matemática e lógica são recomendados.'
    },
    {
      question: 'Qual é a grade curricular do curso?',
      answer: 'A grade inclui disciplinas como Algoritmos, Estruturas de Dados, Programação, Banco de Dados, Redes de Computadores, Inteligência Artificial, entre outras. Você pode consultar a grade completa no site da UFG.'
    },
    {
      question: 'Quais são as oportunidades de carreira após o curso?',
      answer: 'Graduados podem trabalhar como desenvolvedores de software, analistas de sistemas, engenheiros de dados, pesquisadores em IA, e em diversas áreas da tecnologia da informação.'
    },
    {
      question: 'O curso oferece estágio obrigatório?',
      answer: 'Sim, o curso inclui atividades de estágio supervisionado como parte da formação prática.'
    },
    {
      question: 'Como posso obter mais informações sobre o curso?',
      answer: 'Visite o site oficial da UFG (www.ufg.br) ou entre em contato com a coordenação do curso através do e-mail ou telefone disponíveis no portal da instituição.'
    }
  ];

  return (
    <div className="faq-section space-y-4 ">
      {faqs.map((faq, index) => (
        <article key={index} className="flex w-full flex-col overflow-hidden rounded-xl border border-[#8eb1ff]/55 bg-white p-6 transition-all">
          <button
            onClick={() => toggleAccordion(index)}
            className="flex w-full items-center justify-between text-left focus:outline-none"
          >
            <h3 className="text-xl font-black uppercase tracking-wide text-[#0b1d4d] sm:text-2xl">
              {faq.question}
            </h3>
            {openIndex === index ? (
              <ChevronUp size={24} className="text-[#0b1d4d]" />
            ) : (
              <ChevronDown size={24} className="text-[#0b1d4d]" />
            )}
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              openIndex === index ? "grid-rows-[1fr] mt-5 opacity-100" : "grid-rows-[0fr] mt-0 opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="text-base leading-relaxed text-[#0b1d4d]/90 sm:text-lg">
                {faq.answer}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default FAQ;