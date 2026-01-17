import axios from "axios";
import africastalking from "africastalking";

export class AfricaTalkingSMSProvider {
    constructor(username, apiKey) {
        this.africastalking = africastalking({ username, apiKey });
        this.sms = this.africastalking.SMS;
    }

    async sendSMS(to, from, message, enqueue = true) {
        const smsData = {
            to,
            from,
            message,
            enqueue
        };

        try {
            const response = await this.sms.send(smsData);
            return response;
        } catch (error) {
            throw new Error(`Failed to send SMS: ${error.message}`);
        }
    }

    async sendBulkSMS(recipients, from, message, enqueue = true) {
        const to = recipients.join(',');
        try {
            const response = await this.sendSMS(to, from, message, enqueue);
            return response;
        }
        catch (error) {
            throw new Error(`Failed to send bulk SMS: ${error.message}`);
        }
    }
}