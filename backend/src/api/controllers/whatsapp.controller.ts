import { Request, Response } from 'express';
import fetch from 'node-fetch';
import supabase from '../../config/supabaseClient';

interface SendTextMessageRequest {
  number: string;
  text: string;
  delay?: number;
  message?: {
    conversation: string;
  };
}

export const createWhatsAppInstance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { organizationId } = req.body;

    if (!organizationId) {
      res.status(400).json({ error: 'Organization ID is required' });
      return;
    }

    // Usa o organization_id como instance_id
    const instanceId = organizationId;
    const instanceName = `WhatsApp_${organizationId}`;

    // Verifica se já existe uma instância para esta organização
    const { data: existingInstance, error: checkError } = await supabase
      .from('whatsapp_instances')
      .select('*')
      .eq('organization_id', organizationId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 é o código para "não encontrado"
      console.error('Error checking existing instance:', checkError);
      res.status(500).json({ error: 'Failed to check existing WhatsApp instance' });
      return;
    }

    let instance;
    if (existingInstance) {
      // Atualiza a instância existente
      const { data: updatedInstance, error: updateError } = await supabase
        .from('whatsapp_instances')
        .update({
          instance_name: instanceName,
          status: 'connecting',
          updated_at: new Date().toISOString()
        })
        .eq('organization_id', organizationId)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating WhatsApp instance:', updateError);
        res.status(500).json({ error: 'Failed to update WhatsApp instance' });
        return;
      }

      instance = updatedInstance;
    } else {
      // Cria uma nova instância
      const { data: newInstance, error: createError } = await supabase
        .from('whatsapp_instances')
        .insert({
          organization_id: organizationId,
          instance_id: instanceId,
          instance_name: instanceName,
          status: 'connecting'
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creating WhatsApp instance:', createError);
        res.status(500).json({ error: 'Failed to create WhatsApp instance' });
        return;
      }

      instance = newInstance;
    }

    // In a real implementation, you would integrate with WhatsApp API here
    // For now, we'll return a mock QR code
    const mockQRCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

    res.json({
      success: true,
      qrcode: mockQRCode,
      instance: {
        id: instance.instance_id,
        name: instance.instance_name,
        status: instance.status
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
      .eq('instance_id', instanceId)
      .single();

    if (error || !instance) {
      res.status(404).json({ error: 'Instance not found' });
      return;
    }

    // In a real implementation, you would check actual WhatsApp connection state
    // For now, we'll simulate a successful connection
    res.json({
      instance: {
        instanceName: instance.instance_name,
        state: 'open'
      }
    });
  } catch (err) {
    console.error('Error in checkConnectionState:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const sendTextMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { instanceId } = req.params;
    const { number, text, delay = 1200, message } = req.body as SendTextMessageRequest;

    if (!instanceId || !number || !text) {
      res.status(400).json({ error: 'Instance ID, number, and text are required' });
      return;
    }

    // Validate phone number format (559999999999)
    const phoneNumberRegex = /^55\d{10,11}$/;
    if (!phoneNumberRegex.test(number)) {
      res.status(400).json({ error: 'Invalid phone number format. Must be in format: 559999999999' });
      return;
    }

    const evolutionUrl = process.env.EVOLUTION_URL;
    const apiKey = process.env.EVOLUTION_API_KEY;

    if (!evolutionUrl || !apiKey) {
      res.status(500).json({ error: 'Evolution API configuration is missing' });
      return;
    }

    // Verifica se a instância existe e está conectada
    const { data: instance, error: instanceError } = await supabase
      .from('whatsapp_instances')
      .select('*')
      .eq('instance_id', instanceId)
      .eq('status', 'connected')
      .single();

    if (instanceError || !instance) {
      res.status(404).json({ error: 'WhatsApp instance not found or not connected' });
      return;
    }

    console.log('Sending message to Evolution API:', {
      url: `${evolutionUrl}/message/sendText/${instanceId}`,
      number,
      text
    });

    const response = await fetch(`${evolutionUrl}/message/sendText/${instanceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
      body: JSON.stringify({
        number,
        text,
        delay,
        message: message || {
          conversation: text
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Evolution API error:', errorData);
      res.status(response.status).json(errorData);
      return;
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error sending text message:', err);
    res.status(500).json({ error: 'Failed to send text message' });
  }
}; 