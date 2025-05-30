
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-tr from-primary/5 to-accent/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Comece agora mesmo</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Faça o upload dos seus dados ou experimente o sistema com nossos dados de demonstração.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/upload">Fazer upload de dados</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/dashboard">Explorar dashboard</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
