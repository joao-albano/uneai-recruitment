
import React from 'react';

const MessageListHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-2 p-3 bg-muted/50 text-sm font-medium border-b">
      <div className="col-span-3">Estudante</div>
      <div className="col-span-3">Turma / Segmento</div>
      <div className="col-span-2">Enviado em</div>
      <div className="col-span-2">Status</div>
      <div className="col-span-2 text-right">Ações</div>
    </div>
  );
};

export default MessageListHeader;
