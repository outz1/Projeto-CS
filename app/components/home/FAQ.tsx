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
      question: 'Como ingressar no curso de Ciência da Computação da UFG?',
      answer: 'O ingresso é feito exclusivamente pelo SiSU (Sistema de Seleção Unificada), utilizando a nota do ENEM. São oferecidas 40 vagas no 1º semestre e 40 vagas no 2º semestre de cada ano. Acompanhe os processos seletivos em: https://prograd.ufg.br e https://sisu.mec.gov.br'
    },
    {
      question: 'Qual é a duração do curso?',
      answer: 'O curso tem duração de 9 semestres (aproximadamente 4 anos e meio), em período integral, no Campus Samambaia, em Goiânia. Mais detalhes: https://inf.ufg.br/p/ciencia-computacao'
    },
    {
      question: 'Onde fica o curso e qual é o contato da coordenação?',
      answer: 'O curso está no Instituto de Informática (INF), Campus Samambaia, Goiânia-GO. A coordenadora é a Profa. Dra. Erika Morais Martins Coelho. Contato: coord-cc@inf.ufg.br | Telefone: (62) 3521-1181 | Atendimento: terças e quintas, das 15h às 17h (Sala 143).'
    },
    {
      question: 'Como é a grade curricular do curso?',
      answer: 'A grade inclui disciplinas de Algoritmos, Estruturas de Dados, Programação, Banco de Dados, Redes de Computadores, Inteligência Artificial, Engenharia de Software, entre outras. Você pode consultar a matriz curricular vigente (versão 2024) em: https://files.cercomp.ufg.br/weby/up/1218/o/PPC_BCC_2024_Grade_Curricular.pdf'
    },
    {
      question: 'O curso tem boa avaliação pelo MEC?',
      answer: 'Sim! O curso obteve nota 5 (máxima) no ENADE nas edições de 2008, 2011 e 2014, sendo o único curso de Computação em Goiás com esse desempenho em todas as edições. Também recebeu 5 estrelas no Guia do Estudante Abril e 1º lugar no Ranking Universitário Folha em Goiás. Avaliações: https://analisa.ufg.br/p/34885-avaliacao-institucional'
    },
    {
      question: 'Como funcionam os estágios no curso?',
      answer: 'O curso possui coordenação específica de estágio: Prof. Dr. Bruno Oliveira Silvestre (coord.) e Prof. Dr. Daniel Lima Ventura (vice-coord.). Contato: estagio-cc@inf.ufg.br. Oportunidades de estágio são divulgadas em: https://inf.ufg.br/p/42852-mural-de-oportunidades-estagios'
    },
    {
      question: 'Quais são as oportunidades após a formatura?',
      answer: 'Egressos atuam como desenvolvedores de software, analistas de TI, arquitetos de software, engenheiros de dados, pesquisadores em IA e gerentes de TI, em empresas públicas ou privadas. O curso também prepara para pós-graduação (mestrado e doutorado) no PPGCC/UFG: https://ppgcc.inf.ufg.br'
    },
    {
      question: 'O INF oferece outros cursos além de Ciência da Computação?',
      answer: 'Sim. O Instituto de Informática oferece quatro cursos de graduação: Ciência da Computação, Engenharia de Software, Inteligência Artificial e Sistemas de Informação. Cerca de 120 alunos ingressam por semestre. Veja todos em: https://inf.ufg.br'
    },
    {
      question: 'Onde posso tirar dúvidas sobre atividades complementares e extensão (ACEx)?',
      answer: 'O INF disponibiliza um FAQ específico sobre ACEx e Atividades Complementares em: https://docs.google.com/document/d/1s3O0C2rMT6dLfadnGFEtAsYi97eCs72mnW5G9nuXST0'
    },
    {
      question: 'Como acessar os horários de aulas e laboratórios?',
      answer: 'Os horários de aulas estão disponíveis em: https://docs.google.com/spreadsheets/d/1Z8Uomw1sFowkBVqkrRTfPtRMUiSgxwPMKwh090ItQB4 — e os horários dos laboratórios em: https://inf.ufg.br/p/48587-horarios-dos-laboratorios-de-graduacao'
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
            <h3 className="text-lg font-black uppercase tracking-wide text-[#0b1d4d] sm:text-xl">
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
              <p className="text-sm leading-relaxed text-[#0b1d4d]/90 sm:text-base">
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