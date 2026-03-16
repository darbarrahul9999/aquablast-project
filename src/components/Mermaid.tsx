import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor: '#00E5FF',
    primaryTextColor: '#141414',
    primaryBorderColor: '#141414',
    lineColor: '#141414',
    secondaryColor: '#E4E3E0',
    tertiaryColor: '#fff',
  }
});

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div className="mermaid flex justify-center py-8 overflow-x-auto" ref={ref}>
      {chart}
    </div>
  );
}
