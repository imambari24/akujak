const fetch = require("node-fetch");
const fs = require("fs");
const readlineSync = require("readline-sync");
const cheerio = require("cheerio");
const moment = require("moment");
const chalk = require("chalk");

class ItsLoginJack {
  async getRandomNumber(digits) {
    return Math.floor(Math.random() * Math.pow(10, digits));
  }

  async getRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  async generateRandomId() {
    const randomNumber = await this.getRandomNumber(13);
    const randomString = await this.getRandomString(6);
    return `${randomNumber}.${randomString}`;
  }
  async beforeRequestOtp(email, password, salus) {
    return new Promise(function (resolve, reject) {
      fetch(
        "https://api2.enterprise.transfez.app/api/v1/authenticate/before_request_otp",
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            authorization: "",
            "content-type": "application/json",
            origin: "https://business.itsjack.com",
            priority: "u=1, i",
            referer: "https://business.itsjack.com/",
            "sec-ch-ua":
              '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": '"Android"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "user-agent":
              "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            salus: salus,
          }),
        }
      )
        .then((ress) => ress.json())
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async requestOtp(email, password, salus) {
    return new Promise(function (resolve, reject) {
      fetch(
        "https://api2.enterprise.transfez.app/api/v1/authenticate/request_otp",
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            authorization: "",
            "content-type": "application/json",
            origin: "https://business.itsjack.com",
            priority: "u=1, i",
            referer: "https://business.itsjack.com/",
            "sec-ch-ua":
              '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": '"Android"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "user-agent":
              "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            salus: salus,
            otp_with: "SMS",
          }),
        }
      )
        .then((ress) => ress.json())
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async authenticationAccount(otpCode, email, password, salus) {
    return new Promise(function (resolve, reject) {
      fetch("https://api2.enterprise.transfez.app/api/v1/authenticate", {
        method: "POST",
        headers: {
          accept: "*/*",
          "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          authorization: "",
          "content-type": "application/json",
          origin: "https://business.itsjack.com",
          priority: "u=1, i",
          referer: "https://business.itsjack.com/",
          "sec-ch-ua":
            '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": '"Android"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
        },
        body: JSON.stringify({
          otp_code: otpCode,
          email: email,
          password: password,
          salus: salus,
          device_info: "Linux",
          browser_info: "Chrome version 116.0",
        }),
      })
        .then((ress) => ress.json())
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

(async () => {
  const jack = new ItsLoginJack();

  const emailAccount = readlineSync.question("Enter your email address: ");
  const passwordAccount = readlineSync.question("Enter your password: ");

  const salus = await jack.generateRandomId();

  const beforeReqOtp = await jack.beforeRequestOtp(
    emailAccount,
    passwordAccount,
    salus
  );

  if (beforeReqOtp.status !== 200) {
    const errorMessage = "Error: " + beforeReqOtp.message;
    const errorOutput = chalk.red(
      moment().format("YYYY-MM-DD HH:mm") + " " + errorMessage
    );

    console.log(errorOutput);
    return;
  }

  const reqOtp = await jack.requestOtp(emailAccount, passwordAccount, salus);

  if (reqOtp.status !== 200) {
    const errorMessage = "Error: " + reqOtp.message;
    const errorOutput = chalk.red(
      moment().format("YYYY-MM-DD HH:mm") + " " + errorMessage
    );

    console.log(errorOutput);
    return;
  }

  const reqOtpUser = readlineSync.question("Send OTP: ");

  const authentcationAccount = await jack.authenticationAccount(
    reqOtpUser,
    emailAccount,
    passwordAccount,
    salus
  );

  if (authentcationAccount) {
    const jwtKey = authentcationAccount.auth_token;
    // console.log("jwt key: " + jwtKey);
  } else {
    return;
  }

  const jwtKey = authentcationAccount.auth_token;

  const sessionsJwt = `${jwtKey}\n`;
  if (sessionsJwt) {
    fs.appendFileSync("./sessionsJwt.txt", jwtKey);
  }
})();
