import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck, MessageCircle, Clock, Phone, Mail, MessagesSquare } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { OmnichannelReportData } from './data/types';

interface OmnichannelOverviewProps {
  data: OmnichannelReportData;
  dateRange: '7d' | '30d' | '90d' | 'all';
}

const OmnichannelOverview: React.FC<OmnichannelOverviewProps> = ({ data, dateRange }) => {
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 min-w-[180px]">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Telefone</p>
                  <p className="text-sm text-muted-foreground">
                    {filteredData.channelDistribution.phone} atendimentos
                  </p>
                </div>
              </div>
              <div className="flex-1 px-4">
                <Progress 
                  value={filteredData.channelDistribution.phone} 
                  className="h-3"
                  indicatorClassName="bg-blue-500"
                />
              </div>
              <span className="text-sm font-medium min-w-[50px] text-right">
                {filteredData.channelDistribution.phone}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 min-w-[180px]">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {filteredData.channelDistribution.email} atendimentos
                  </p>
                </div>
              </div>
              <div className="flex-1 px-4">
                <Progress 
                  value={filteredData.channelDistribution.email} 
                  className="h-3"
                  indicatorClassName="bg-purple-500"
                />
              </div>
              <span className="text-sm font-medium min-w-[50px] text-right">
                {filteredData.channelDistribution.email}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 min-w-[180px]">
                <div className="bg-green-100 p-2 rounded-full">
                  <MessagesSquare className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">
                    {filteredData.channelDistribution.whatsapp} atendimentos
                  </p>
                </div>
              </div>
              <div className="flex-1 px-4">
                <Progress 
                  value={filteredData.channelDistribution.whatsapp} 
                  className="h-3"
                  indicatorClassName="bg-green-500"
                />
              </div>
              <span className="text-sm font-medium min-w-[50px] text-right">
                {filteredData.channelDistribution.whatsapp}%
              </span>
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
