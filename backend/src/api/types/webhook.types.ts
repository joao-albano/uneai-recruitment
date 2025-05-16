export interface WhatsAppWebhookPayload {
  event: string;
  instance: string;
  data: {
    key: {
      remoteJid: string;
      fromMe: boolean;
      id: string;
    };
    pushName: string;
    status: string;
    message: {
      conversation?: string;
      messageContextInfo: {
        deviceListMetadata: {
          senderKeyHash: string;
          senderTimestamp: string;
          recipientKeyHash: string;
          recipientTimestamp: string;
        };
        deviceListMetadataVersion: number;
        messageSecret: string;
      };
    };
    messageType: string;
    messageTimestamp: number;
    instanceId: string;
    source: string;
  };
  destination: string;
  date_time: string;
  sender: string;
  server_url: string;
  apikey: string;
} 