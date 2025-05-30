import { Request, Response } from 'express';
import fetch from 'node-fetch';
import supabase from '../../config/supabaseClient';

interface SendTextMessageRequest {
  number: string;
  text: string;
  delay?: number;
  message?: string;
}

interface EvolutionCreateInstanceRequest {
  instanceName: string;
  token?: string;
  qrcode?: boolean;
  number?: string;
  webhook?: string;
  webhook_by_events?: boolean;
  events?: string[];
}

interface EvolutionInstanceResponse {
  instance: {
    instanceName: string;
    status: string;
  };
  hash: {
    apikey: string;
  };
  qrcode?: {
    code: string;
    base64: string;
  };
}

console.log('[DEBUG] process.env.EVOLUTION_API_KEY:', process.env.EVOLUTION_API_KEY);
console.log('[DEBUG] process.env.EVOLUTION_URL:', process.env.EVOLUTION_URL);

export const createWhatsAppInstance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { organizationId, instanceName } = req.body;

    if (!organizationId) {
      res.status(400).json({ error: 'Organization ID is required' });
      return;
    }

    // Use organizationId as instanceName if not provided
    const finalInstanceName = instanceName || organizationId;

    // Check environment variables
    const apiKey = process.env.EVOLUTION_API_KEY;
    const apiUrl = process.env.EVOLUTION_URL;
    
    if (!apiKey || !apiUrl) {
      console.error('[WhatsApp] Missing environment variables:', { apiKey: !!apiKey, apiUrl: !!apiUrl });
      res.status(500).json({ error: 'EVOLUTION_API_KEY or EVOLUTION_URL environment variable is missing' });
      return;
    }

    // Check if instance already exists in database
    const { data: existingInstance, error: checkError } = await supabase
      .from('whatsapp_instances')
      .select('*')
      .eq('organization_id', organizationId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing instance:', checkError);
      res.status(500).json({ error: 'Failed to check existing WhatsApp instance' });
      return;
    }

    let dbInstance;
    let shouldCreateEvolutionInstance = true;

    if (existingInstance) {
      // Check if Evolution instance exists
      try {
        const checkResponse = await fetch(`${apiUrl}/instance/fetchInstances`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey,
          },
        });

        if (checkResponse.ok) {
          const instances = await checkResponse.json();
          const evolutionInstance = instances.find((inst: any) => inst.instance.instanceName === finalInstanceName);
          
          if (evolutionInstance) {
            shouldCreateEvolutionInstance = false;
            console.log('[WhatsApp] Evolution instance already exists:', finalInstanceName);
          }
        }
      } catch (error) {
        console.log('[WhatsApp] Could not check existing Evolution instances, will try to create:', error);
      }

      // Update existing database instance
      const { data: updatedInstance, error: updateError } = await supabase
        .from('whatsapp_instances')
        .update({
          instance_name: finalInstanceName,
          status: 'connecting',
          updated_at: new Date().toISOString(),
        })
        .eq('organization_id', organizationId)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating WhatsApp instance:', updateError);
        res.status(500).json({ error: 'Failed to update WhatsApp instance' });
        return;
      }

      dbInstance = updatedInstance;
    } else {
      // Create new database instance
      const { data: newInstance, error: createError } = await supabase
        .from('whatsapp_instances')
        .insert({
          organization_id: organizationId,
          instance_id: organizationId,
          instance_name: finalInstanceName,
          status: 'connecting',
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creating WhatsApp instance:', createError);
        res.status(500).json({ error: 'Failed to create WhatsApp instance' });
        return;
      }

      dbInstance = newInstance;
    }

    let qrCodeData = null;
    let instanceStatus = 'connecting';

    if (shouldCreateEvolutionInstance) {
      // Create instance in EvolutionAPI
      const evolutionPayload: EvolutionCreateInstanceRequest = {
        instanceName: finalInstanceName,
        qrcode: true,
        webhook: `${process.env.WEBHOOK_URL || 'http://localhost:3001'}/api/webhook/whatsapp`,
        webhook_by_events: true,
        events: [
          'APPLICATION_STARTUP',
          'QRCODE_UPDATED',
          'CONNECTION_UPDATE',
          'MESSAGES_UPSERT',
          'MESSAGES_UPDATE',
          'SEND_MESSAGE'
        ]
      };

      console.log('[WhatsApp] Creating Evolution instance:', evolutionPayload);

      try {
        const evolutionResponse = await fetch(`${apiUrl}/instance/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey,
          },
          body: JSON.stringify(evolutionPayload),
        });

        const evolutionData: EvolutionInstanceResponse = await evolutionResponse.json();

        if (!evolutionResponse.ok) {
          console.error('[WhatsApp] Evolution API error:', evolutionData);
          throw new Error(`Evolution API error: ${JSON.stringify(evolutionData)}`);
        }

        console.log('[WhatsApp] Evolution instance created successfully:', evolutionData);

        // Extract QR code if available
        if (evolutionData.qrcode?.base64) {
          qrCodeData = evolutionData.qrcode.base64;
        }

        // Update database with Evolution data
        await supabase
          .from('whatsapp_instances')
          .update({
            evolution_api_key: evolutionData.hash?.apikey,
            status: evolutionData.instance?.status === 'open' ? 'connected' : 'connecting',
            updated_at: new Date().toISOString(),
          })
          .eq('id', dbInstance.id);

        instanceStatus = evolutionData.instance?.status === 'open' ? 'connected' : 'connecting';

      } catch (error) {
        console.error('[WhatsApp] Error creating Evolution instance:', error);
        
        // Update database to reflect error
        await supabase
          .from('whatsapp_instances')
          .update({
            status: 'disconnected',
            updated_at: new Date().toISOString(),
          })
          .eq('id', dbInstance.id);

        res.status(500).json({ error: 'Failed to create WhatsApp instance in Evolution API' });
        return;
      }
    } else {
      // Instance exists, try to get QR code if not connected
      try {
        const qrResponse = await fetch(`${apiUrl}/instance/connect/${finalInstanceName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey,
          },
        });

        if (qrResponse.ok) {
          const qrData = await qrResponse.json();
          if (qrData.base64) {
            qrCodeData = qrData.base64;
          }
        }

        // Check current status
        const statusResponse = await fetch(`${apiUrl}/instance/connectionState/${finalInstanceName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey,
          },
        });

        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          instanceStatus = statusData.instance?.state === 'open' ? 'connected' : 'connecting';
          
          // Update database status
          await supabase
            .from('whatsapp_instances')
            .update({
              status: instanceStatus,
              updated_at: new Date().toISOString(),
            })
            .eq('id', dbInstance.id);
        }

      } catch (error) {
        console.log('[WhatsApp] Could not get QR code or status for existing instance:', error);
      }
    }

    res.json({
      success: true,
      qrcode: qrCodeData,
      instance: {
        id: dbInstance.instance_id,
        instance_name: dbInstance.instance_name,
        status: instanceStatus
      }
    });

  } catch (err) {
    console.error('Error in createWhatsAppInstance:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const checkConnectionState = async (req: Request, res: Response): Promise<void> => {
  try {
    const { instanceId } = req.params;

    if (!instanceId) {
      res.status(400).json({ error: 'Instance ID is required' });
      return;
    }

    // Check instance in database
    const { data: instance, error } = await supabase
      .from('whatsapp_instances')
      .select('*')
      .eq('instance_name', instanceId)
      .single();

    if (error || !instance) {
      res.status(404).json({ error: 'Instance not found' });
      return;
    }

    const apiKey = process.env.EVOLUTION_API_KEY;
    const apiUrl = process.env.EVOLUTION_URL;

    if (!apiKey || !apiUrl) {
      res.status(500).json({ error: 'Evolution API configuration missing' });
      return;
    }

    try {
      // Check real connection state from Evolution API
      const response = await fetch(`${apiUrl}/instance/connectionState/${instanceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': apiKey,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const status = data.instance?.state === 'open' ? 'connected' : 'connecting';
        
        // Update database status
        await supabase
          .from('whatsapp_instances')
          .update({
            status: status,
            updated_at: new Date().toISOString(),
          })
          .eq('id', instance.id);

        // Try to get QR code if not connected
        let qrCode = null;
        if (status !== 'connected') {
          try {
            const qrResponse = await fetch(`${apiUrl}/instance/connect/${instanceId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey,
              },
            });

            if (qrResponse.ok) {
              const qrData = await qrResponse.json();
              if (qrData.base64) {
                qrCode = qrData.base64;
              }
            }
          } catch (qrError) {
            console.log('[WhatsApp] Could not get QR code:', qrError);
          }
        }

        res.json({
          id: instance.instance_id,
          instance_name: instance.instance_name,
          status: status,
          qrcode: qrCode
        });
      } else {
        // Evolution API error, return database status
        res.json({
          id: instance.instance_id,
          instance_name: instance.instance_name,
          status: instance.status || 'disconnected'
        });
      }
    } catch (evolutionError) {
      console.error('[WhatsApp] Evolution API error:', evolutionError);
      
      // Return database status as fallback
      res.json({
        id: instance.instance_id,
        instance_name: instance.instance_name,
        status: instance.status || 'disconnected'
      });
    }

  } catch (err) {
    console.error('Error in checkConnectionState:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const sendTextMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('[WhatsApp] Corpo da requisição recebida:', req.body);
    const { instanceId } = req.params;
    const { number, text, delay = 1200, message } = req.body as SendTextMessageRequest;

    if (!instanceId || !number || !text) {
      console.log('[WhatsApp] Faltam parâmetros obrigatórios:', { instanceId, number, text });
      res.status(400).json({ error: 'Instance ID, number, and text are required' });
      return;
    }

    // Validate phone number format (559999999999)
    const phoneNumberRegex = /^55\d{10,11}$/;
    if (!phoneNumberRegex.test(number)) {
      console.log('[WhatsApp] Número de telefone inválido:', number);
      res.status(400).json({ error: 'Invalid phone number format. Must be in format: 559999999999' });
      return;
    }

    // Buscar dados da instância pelo instance_name (que é o id da organização)
    const { data: instance, error: instanceError } = await supabase
      .from('whatsapp_instances')
      .select('*')
      .eq('instance_name', instanceId)
      .eq('status', 'connected')
      .single();

    if (instanceError || !instance) {
      console.log('[WhatsApp] Instância não encontrada ou não conectada:', { instanceId, instanceError });
      res.status(404).json({ error: 'WhatsApp instance not found or not connected' });
      return;
    }

    // Usar apenas variáveis de ambiente
    const apiKey = process.env.EVOLUTION_API_KEY;
    const apiUrl = process.env.EVOLUTION_URL;
    if (!apiKey || !apiUrl) {
      console.log('[WhatsApp] Variáveis de ambiente ausentes:', { apiKey, apiUrl });
      res.status(500).json({ error: 'EVOLUTION_API_KEY or EVOLUTION_URL env var is missing' });
      return;
    }

    const evolutionApiUrl = `${apiUrl}/message/sendText/${instanceId}`;
    const evolutionPayload = {
      number,
      text,
      delay,
      message: message || { conversation: text }
    };
    console.log('[WhatsApp] Enviando para Evolution API:', {
      url: evolutionApiUrl,
      payload: evolutionPayload
    });

    let response;
    let responseBody;
    try {
      response = await fetch(evolutionApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
        body: JSON.stringify(evolutionPayload)
      });
      responseBody = await response.text();
      try { responseBody = JSON.parse(responseBody); } catch {}
      console.log('[WhatsApp] Resposta Evolution API:', {
        status: response.status,
        body: responseBody
      });
    } catch (err) {
      console.error('[WhatsApp] Erro ao chamar Evolution API:', err);
      res.status(500).json({ error: 'Erro ao chamar Evolution API', details: err instanceof Error ? err.message : err });
      return;
    }

    if (!response.ok) {
      // Log detalhado do erro
      if (responseBody && responseBody.response && Array.isArray(responseBody.response.message)) {
        console.error('[WhatsApp] Evolution API retornou erro detalhado:',
          JSON.stringify(responseBody.response.message, null, 2)
        );
      }
      console.error('[WhatsApp] Evolution API retornou erro:', responseBody);
      res.status(response.status).json(responseBody);
      return;
    }

    res.json(responseBody);
  } catch (err) {
    console.error('Error sending text message:', err);
    res.status(500).json({ error: 'Failed to send text message', details: err instanceof Error ? err.message : err });
  }
};

// Log para endpoints não encontrados
export const notFound = (req: Request, res: Response) => {
  console.log(`[WhatsApp] Endpoint não encontrado: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Endpoint não encontrado' });
}; 