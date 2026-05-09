/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Script from "next/script";

export function VLibrasWidget() {
  return (
    <>
      {/* 1. O HTML idêntico ao do governo (apenas usando className no lugar de class) */}
      <div {...({ vw: "true" } as any)} className="enabled">
        <div
          {...({ "vw-access-button": "true" } as any)}
          className="active"
        ></div>
        <div {...({ "vw-plugin-wrapper": "true" } as any)}>
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>

      {/* 2. As tags <script> substituídas pelo componente nativo do Next.js */}
      <Script
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="afterInteractive" // Mudei de lazyOnload para afterInteractive
        onLoad={() => {
          new (window as any).VLibras.Widget("https://vlibras.gov.br/app");
        }}
      />
    </>
  );
}
