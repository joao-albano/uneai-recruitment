
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { MapPin, Map, ArrowUpRight } from 'lucide-react';

// Dados mock para localidades
const regionsData = [
  { name: 'Zona Sul', value: 187, color: '#4F46E5', matriculas: 42, conversao: 22.5 },
  { name: 'Zona Norte', value: 142, color: '#22C55E', matriculas: 28, conversao: 19.7 },
  { name: 'Centro', value: 95, color: '#F59E0B', matriculas: 17, conversao: 17.9 },
  { name: 'Zona Leste', value: 76, color: '#EC4899', matriculas: 14, conversao: 18.4 },
  { name: 'Zona Oeste', value: 65, color: '#3B82F6', matriculas: 11, conversao: 16.9 },
  { name: 'Outras cidades', value: 34, color: '#6B7280', matriculas: 5, conversao: 14.7 },
];

// Dados de bairros com melhor conversão
const topNeighborhoods = [
  { name: 'Moema', leads: 45, matriculas: 15, conversao: 33.3 },
  { name: 'Vila Mariana', leads: 38, matriculas: 12, conversao: 31.6 },
  { name: 'Pinheiros', leads: 42, matriculas: 13, conversao: 31.0 },
  { name: 'Perdizes', leads: 36, matriculas: 11, conversao: 30.6 },
  { name: 'Santana', leads: 34, matriculas: 10, conversao: 29.4 },
];

// Dados de distância
const distanceData = [
  { range: 'Até 1km', leads: 124, matriculas: 43, conversao: 34.7 },
  { range: '1km a 3km', leads: 186, matriculas: 47, conversao: 25.3 },
  { range: '3km a 5km', leads: 108, matriculas: 15, conversao: 13.9 },
  { range: '5km a 10km', leads: 87, matriculas: 8, conversao: 9.2 },
  { range: 'Acima de 10km', leads: 54, matriculas: 4, conversao: 7.4 },
];

const LocationsTabContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Região</CardTitle>
            <CardDescription>
              Leads captados por região geográfica
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={regionsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {regionsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} leads`, 'Quantidade']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Bairros com Maior Conversão</CardTitle>
            <CardDescription>
              Top 5 bairros com melhor taxa de conversão
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topNeighborhoods.map((neighborhood, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{neighborhood.name}</span>
                  </div>
                  <div>
                    <Badge className="bg-green-100 text-green-800">
                      {neighborhood.conversao.toFixed(1)}%
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      {neighborhood.matriculas} de {neighborhood.leads} leads
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center pt-2">
                <Badge variant="outline" className="flex items-center gap-1 cursor-pointer">
                  <span>Ver mapa completo</span>
                  <Map className="h-3 w-3" />
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Conversão por Distância</CardTitle>
            <CardDescription>
              Análise de conversão baseada na distância até a instituição
            </CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            Exportar dados
            <ArrowUpRight className="h-3 w-3" />
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr className="[&_th]:p-3 [&_th]:text-left [&_th]:font-medium [&_th]:text-muted-foreground">
                  <th>Distância</th>
                  <th className="text-right">Leads</th>
                  <th className="text-right">Matrículas</th>
                  <th className="text-right">Taxa de Conversão</th>
                  <th className="text-right">% do Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {distanceData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "" : "bg-muted/50"}>
                    <td className="p-3 font-medium">{item.range}</td>
                    <td className="p-3 text-right">{item.leads}</td>
                    <td className="p-3 text-right">{item.matriculas}</td>
                    <td className="p-3 text-right">
                      <span className={
                        item.conversao > 30 ? "text-green-600" : 
                        item.conversao > 15 ? "text-amber-600" : 
                        "text-red-600"
                      }>
                        {item.conversao.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {((item.leads / 559) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-muted/20 font-semibold">
                  <td className="p-3">Total</td>
                  <td className="p-3 text-right">559</td>
                  <td className="p-3 text-right">117</td>
                  <td className="p-3 text-right">20.9%</td>
                  <td className="p-3 text-right">100.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationsTabContent;
