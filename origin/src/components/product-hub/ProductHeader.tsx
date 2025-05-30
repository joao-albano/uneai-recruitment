
import React from 'react';

const ProductHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center mb-12">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Plataforma Une.AI</h1>
      <p className="text-gray-600 max-w-2xl text-center">
        Selecione o sistema que deseja acessar para gerenciar sua instituição de forma inteligente
      </p>
    </div>
  );
};

export default ProductHeader;
