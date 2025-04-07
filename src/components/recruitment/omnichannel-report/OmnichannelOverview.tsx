
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck, MessageCircle, Clock, Phone, Mail, MessagesSquare } from 'lucide-react';
import { OmnichannelReportData } from './data/types';

interface OmnichannelOverviewProps {
  data: OmnichannelReportData;
  dateRange: '7d' | '30d' | '90d' | 'all';
}

const OmnichannelOverview: React.FC<OmnichannelOverviewProps> = ({ data, dateRange }) => {
  // Filtrar dados baseado no intervalo de data selecionado
  // Na implementação real, isto seria feito com dados reais
  const filteredData = data;
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Atendimentos</CardTitle>
          <MessageCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{filteredData.totalInteractions}</div>
          <p className="text-xs text-muted-foreground">
            {filteredData.interactionGrowth > 0 ? '+' : ''}{filteredData.interactionGrowth}% vs período anterior
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tempo Médio de Resposta</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{filteredData.avgResponseTime} min</div>
          <p className="text-xs text-muted-foreground">
            {filteredData.responseTimeChange > 0 ? '+' : ''}{filteredData.responseTimeChange}% vs período anterior
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Resolução</CardTitle>
          <BadgeCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{filteredData.resolutionRate}%</div>
          <p className="text-xs text-muted-foreground">
            {filteredData.resolutionRateChange > 0 ? '+' : ''}{filteredData.resolutionRateChange}% vs período anterior
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Emoção Predominante</CardTitle>
          {filteredData.dominantEmotion === 'positiva' ? (
            <span className="text-green-500 text-xl">😊</span>
          ) : filteredData.dominantEmotion === 'neutra' ? (
            <span className="text-amber-500 text-xl">😐</span>
          ) : (
            <span className="text-red-500 text-xl">😟</span>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">{filteredData.dominantEmotion}</div>
          <p className="text-xs text-muted-foreground">
            {filteredData.positiveEmotionPercentage}% emoções positivas
          </p>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Distribuição por Canal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-blue-500" />
              <span>Telefone</span>
            </div>
            <div className="flex items-center">
              <div className="w-40 h-2 bg-gray-200 rounded-full mr-2">
                <div 
                  className="h-2 bg-blue-500 rounded-full" 
                  style={{ width: `${filteredData.channelDistribution.phone}%` }}
                ></div>
              </div>
              <span className="text-sm">{filteredData.channelDistribution.phone}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-purple-500" />
              <span>Email</span>
            </div>
            <div className="flex items-center">
              <div className="w-40 h-2 bg-gray-200 rounded-full mr-2">
                <div 
                  className="h-2 bg-purple-500 rounded-full" 
                  style={{ width: `${filteredData.channelDistribution.email}%` }}
                ></div>
              </div>
              <span className="text-sm">{filteredData.channelDistribution.email}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <MessagesSquare className="h-4 w-4 mr-2 text-green-500" />
              <span>WhatsApp</span>
            </div>
            <div className="flex items-center">
              <div className="w-40 h-2 bg-gray-200 rounded-full mr-2">
                <div 
                  className="h-2 bg-green-500 rounded-full" 
                  style={{ width: `${filteredData.channelDistribution.whatsapp}%` }}
                ></div>
              </div>
              <span className="text-sm">{filteredData.channelDistribution.whatsapp}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Principais Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {filteredData.keyInsights.map((insight, index) => (
            <div key={index} className="p-2 border rounded-md">
              <p className="text-sm">{insight}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default OmnichannelOverview;
