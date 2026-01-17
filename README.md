# js_notifykit_sms 📲

**js_notifykit_sms** is a provider-agnostic Javascript notification toolkit that enables developers to send SMS (and other notifications) through a unified, extensible API.

It abstracts away provider-specific SDKs and APIs, making it easy to switch providers or add new notification channels without rewriting application logic.

> **One interface. Multiple notification providers.**

---

## Features

- 🔌 Pluggable notification providers
- 📩 SMS support (Africa’s Talking)
- 🧩 Clean, provider-agnostic API
- 🔁 Easy provider switching
- ⚙️ Framework-friendly (Node, Express)
- 🚀 Designed for future channels (Push)

---

## Installation

---

```bash
npm install js_notifykit_sms
```

---

## Usage

Initialize an SMS provider

Africastalking

```bash
import { AfricaTalkingSMSProvider } from "js_notifykit_sms";

const smsProvider = new AfricaTalkingSMSProvider(
    process.env.AFRICASTALKING_USERNAME,
    process.env.AFRICASTALKING_API_KEY
);
```

SMSLeopard

```bash
import { SMSLeopardSMSProvider } from "js_notifykit_sms";

const smsProvider = new SMSLeopardSMSProvider(
    process.env.SMSLEOPARD_API_KEY,
    process.env.SMSLEOPARD_API_SECRET,
    process.env.SMSLEOPARD_SENDER_ID
);
```

---

## Sending an SMS

---

Africastalking

```bash
await smsProvider.sendSMS(
    "+254712345678",
    "NotifyKit",
    "Hello from NotifyKit 🚀"
);
```

SMSLeopard

```bash
await smsProvider.send(
    ["0712345678", "+254798765432"],
    "Hello from NotifyKit via SMS Leopard"
);
```

---

## Sending to multiple recipients

---

Africastalking

```bash
await smsProvider.sendBulkSMS(
    ["+254712345678", "+254798765432"],
    "NotifyKit",
    "Bulk SMS from NotifyKit"
);
```

SMSLeopard

```bash
await smsProvider.sendBulkSMS(
    ["+254712345678", "+254798765432"],
    "NotifyKit",
    "Bulk SMS from NotifyKit"
);
```

---

## Supported Providers

---

✅ Africa’s Talking
✅ SMS Leopard
