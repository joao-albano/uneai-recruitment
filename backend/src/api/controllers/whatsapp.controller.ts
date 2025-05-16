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

    // Generate a unique instance ID
    const instanceId = `instance_${Date.now()}`;
    const instanceName = `WhatsApp_${organizationId}`;

    // Create instance record in database
    const { data, error } = await supabase
      .from('whatsapp_instances')
      .insert({
        organization_id: organizationId,
        instance_id: instanceId,
        instance_name: instanceName,
        status: 'connecting'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating WhatsApp instance:', error);
      res.status(500).json({ error: 'Failed to create WhatsApp instance' });
      return;
    }

    // In a real implementation, you would integrate with WhatsApp API here
    // For now, we'll return a mock QR code
    const mockQRCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

    res.json({
      success: true,
      qrcode: mockQRCode,
      instance: {
        id: instanceId,
        name: instanceName,
        status: 'connecting'
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