"use strict";
import f from "cross-fetch";

module.exports.MailcowApiClient = class {
  baseurl: any;
  apikey: any;
  constructor(baseurl: any, apikey: any) {
    this.baseurl = baseurl;
    this.apikey = apikey;
  }

  async addMailbox(mailbox: any) {
    if (!mailbox) throw new Error("Mailbox must be provided as Mailbox Object");
    if (!mailbox.domain)
      throw new Error(
        'Mailbox object must at least contain a domain name. Example: {domain:"example.com"}'
      );
    if (!mailbox.domain.match(/[A-Z-a-z0-9]+\.[A-Z-a-z0-9]+$/))
      throw new Error("domain name is invalid");

    mailbox.active = mailbox.active;
    mailbox.password = mailbox.password;
    mailbox.password2 = mailbox.password;
    mailbox.quota = mailbox.quota;
    mailbox.name = mailbox.name;
    mailbox.local_part = mailbox.local_part;

    return f(`${this.baseurl}/api/v1/add/mailbox`, {
      method: "POST",
      headers: {
        "X-Api-Key": this.apikey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailbox),
    }).then(async (res: { json: () => Promise<any> }) => {
      const j = await res.json().catch();
      if (j && j[0] && j[0].type === "success")
        return {
          username: mailbox.local_part + "@" + mailbox.domain,
          password: mailbox.password,
          domain: mailbox.domain,
          name: mailbox.name,
          local_part: mailbox.local_part,
          quota: mailbox.quota,
        };
      console.error(j);
      return false;
    });
  }

  async deleteMailbox(mailboxes: any) {
    if (typeof mailboxes === "string") mailboxes = [mailboxes];
    if (!mailboxes[0].match(/[A-Z-a-z0-9]+\.[A-Z-a-z0-9]+$/))
      throw new Error("domain name is invalid");

    return f(`${this.baseurl}/api/v1/delete/mailbox`, {
      method: "POST",
      headers: {
        "X-Api-Key": this.apikey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailboxes),
    }).then(async (res: { json: () => Promise<any> }) => {
      const j = await res.json().catch();
      if (j && j[0] && j[0].type === "success") return true;
      console.error(j);
      return false;
    });
  }

  updateMailbox = async (mailbox: any): Promise<boolean> => {
    const response = await fetch(`${this.baseurl}/api/v1/edit/mailbox`, {
      method: "POST",
      headers: {
        "X-Api-Key": this.apikey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailbox),
    });

    const responseData = await response.json();

    if (response.status !== 200) {
      throw new Error(
        `${response.status} ${
          responseData === undefined ? "" : JSON.stringify(responseData)
        }`
      );
    }

    return true;
  };

  async rateLimitMailbox(mailbox: any): Promise<boolean> {
    if (!mailbox) throw new Error("Mailbox must be provided as Mailbox Object");

    const response = await fetch(`${this.baseurl}/api/v1/edit/rl-mbox/`, {
      method: "POST",
      headers: {
        "X-Api-Key": this.apikey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailbox),
    });

    const responseData = await response.json();

    if (responseData && responseData[0] && responseData[0].type === "success") {
      return true;
    } else {
      console.error(responseData);
      return false;
    }
  }

  async addAppPassword(mailbox: any): Promise<boolean> {
      if (!mailbox) throw new Error("Mailbox must be provided as Mailbox Object");

      const response = await fetch(`${this.baseurl}/api/v1/add/app-passwd`, {
        method: "POST",
        headers: {
          "X-Api-Key": this.apikey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mailbox),
      });

      const responseData = await response.json();

      if (responseData && responseData[0] && responseData[0].type === "success") {
        return true;
      } else {
        console.error(responseData);
        return false;
      }
    }

  async deleteAppPassword(passwordId: string[]): Promise<boolean> {
      if (!passwordId || !Array.isArray(passwordId)) throw new Error("Password ID(s) must be provided as an array of strings.");

      const response = await fetch(`${this.baseurl}/api/v1/delete/app-passwd`, {
        method: "POST",
        headers: {
          "X-Api-Key": this.apikey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordId),
      });

      const responseData = await response.json();

      if (responseData && responseData[0] && responseData[0].type === "success") {
        return true;
      } else {
        console.error(responseData);
        return false;
      }
  }

};