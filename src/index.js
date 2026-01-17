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

export class SMSLeopardSMSProvider {
    constructor(apiKey, apiSecret, senderId, timeout = 10000) {
        if (!apiKey || !apiSecret) {
            throw new Error("SMS Leopard API key and secret are required");
        }

        if (!senderId) {
            throw new Error("SMS Leopard sender_id is required");
        }

        const credentials = `${apiKey}:${apiSecret}`;
        const encodedCredentials = Buffer.from(credentials).toString('base64');

        this.headers = {
            "Authorization": `Basic ${encodedCredentials}`,
            "Content-Type": "application/json",
        };
        this.senderId = senderId;
        this.timeout = timeout;
        this.BASE_URL = "https://api.smsleopard.com/v1/sms/send";
    }

    static normalizePhoneNumber(phone) {
        phone = phone.replace(/\s+/g, '');

        if (phone.startsWith("0")) {
            return `254${phone.slice(1)}`;
        }
        if (phone.startsWith("2")) {
            return phone;
        }
        if (phone.startsWith("+")) {
            return phone.slice(1);
        }
        return phone;
    }

    async send(recipients, message) {
        if (!recipients || recipients.length === 0) {
            throw new Error("At least one recipient is required");
        }

        const destinations = recipients.map(phone => ({
            number: SMSLeopardSMSProvider.normalizePhoneNumber(phone)
        }));

        const payload = {
            message,
            source: this.senderId,
            destination: destinations,
        };

        try {
            const response = await axios.post(this.BASE_URL, payload, {
                headers: this.headers,
                timeout: this.timeout,
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to send SMS via SMS Leopard: ${error.message}`);
        }
    }

    async sendBulk(messages) {
        const responses = [];

        for (const msg of messages) {
            try {
                const response = await this.send([msg.recipient], msg.message);
                responses.push(response);
            } catch (error) {
                responses.push({
                    recipient: msg.recipient,
                    error: error.message,
                });
            }
        }

        return responses;
    }
}