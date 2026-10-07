export interface NotificationRecipient {
  email: string;
  phone?: string;
  name: string;
}

export interface INotificationProvider {
  sendEmail(recipient: NotificationRecipient, template: string, variables: Record<string, any>): Promise<boolean>;
  sendSMS(recipientPhone: string, message: string): Promise<boolean>;
}

export class MockNotificationProvider implements INotificationProvider {
  async sendEmail(recipient: NotificationRecipient, template: string, variables: Record<string, any>): Promise<boolean> {
    console.log(`[Notification Engine] Email dispatched to ${recipient.email} using template "${template}":`, variables);
    return true;
  }

  async sendSMS(recipientPhone: string, message: string): Promise<boolean> {
    console.log(`[Notification Engine] SMS sent to ${recipientPhone}: ${message}`);
    return true;
  }
}

export const notificationService = new MockNotificationProvider();
