const fetch = require("node-fetch");
const fs = require("fs");
const readlineSync = require("readline-sync");
const cheerio = require("cheerio");
const moment = require("moment");
const chalk = require("chalk");

class ItsJack {
  async getFileContent(filePrompt) {
    while (true) {
      try {
        const filename = readlineSync.question(filePrompt);
        const content = fs.readFileSync(filename, "utf8");
        const data = content.split("\n");
        console.log("File read successfully.");
        return { data };
      } catch (err) {
        if (err.code === "ENOENT") {
          console.error("File Not Found. Try Again!");
        } else {
          console.error("An error occurred:", err);
          break;
        }
      }
    }
  }

  async createCard(jwtKey, nickname) {
    return new Promise(function (resolve, reject) {
      fetch("https://api2.enterprise.transfez.app/api/v1/cards", {
        method: "POST",
        headers: {
          accept: "*/*",
          "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          authorization: jwtKey,
          "content-type": "application/json",
          origin: "https://business.itsjack.com",
          priority: "u=1, i",
          referer: "https://business.itsjack.com/",
          "sec-ch-ua":
            '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        },
        body: JSON.stringify({
          card_type: "virtual_prepaid",
          nickname: nickname,
          limit_type: "LIFETIME_AMOUNT_LIMIT",
          limit_value: 0,
          description: "",
          name: "IMAM BARI ' MU ' AFA MAHFDUZI",
          email: "awenfarlo@gmail.com",
          user_id: 6154,
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

  async activateTopUpCard(idCard, jwtKey, amount) {
    return new Promise(function (resolve, reject) {
      fetch(
        `https://api2.enterprise.transfez.app/api/v1/cards/${idCard}/move_main_balance`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            authorization: jwtKey,
            "content-type": "application/json",
            origin: "https://business.itsjack.com",
            priority: "u=1, i",
            referer: "https://business.itsjack.com/",
            "sec-ch-ua":
              '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
          },
          body: JSON.stringify({
            pin: "241099",
            action_type: "deposit",
            amount: amount,
            reason: "pemindahan dana",
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

  async createDetailsCard(idCard, jwtKey) {
    return new Promise(function (resolve, reject) {
      fetch(
        `https://api2.enterprise.transfez.app/api/v1/cards/${idCard}/card_detail?pin=241099`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            authorization: jwtKey,
            origin: "https://business.itsjack.com",
            priority: "u=1, i",
            referer: "https://business.itsjack.com/",
            "sec-ch-ua":
              '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
          },
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

  //Get Details All Cards from Account
  async getAllCardDetails(jwtKey) {
    return new Promise(function (resolve, reject) {
      fetch("https://api2.enterprise.transfez.app/api/v1/cards?per_page=100", {
        method: "GET",
        headers: {
          accept: "*/*",
          "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          authorization: jwtKey,
          origin: "https://business.itsjack.com",
          priority: "u=1, i",
          referer: "https://business.itsjack.com/",
          "sec-ch-ua":
            '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        },
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

  async getCardsById(idCard, jwtKey) {
    return new Promise(function (resolve, reject) {
      fetch(`https://api2.enterprise.transfez.app/api/v1/cards/${idCard}`, {
        method: "GET",
        headers: {
          accept: "*/*",
          "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          authorization: jwtKey,
          origin: "https://business.itsjack.com",
          priority: "u=1, i",
          referer: "https://business.itsjack.com/",
          "sec-ch-ua":
            '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        },
      })
        .then((ress) => ress.json())
        .then((result) => {
          resolve(result);
        });
    });
  }

  async blockCards(idCard, jwtKey) {
    return new Promise(function (resolve, reject) {
      fetch(
        `https://api2.enterprise.transfez.app/api/v1/cards/virtual_card/${idCard}/block`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            authorization: jwtKey,
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
            pin: "241099",
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
}

(async () => {
  const jack = new ItsJack();

  console.log("\nSelect Your Options:");
  console.log("1. Create Card");
  console.log("2. Delete Card");

  const userChoice = readlineSync.question("Enter your choice (1 or 2): ");

  const jwtKey = readlineSync.question("Enter your sessions token: ");

  switch (userChoice) {
    case "1":
      let create = parseInt(
        readlineSync.question("How many cards do you want to create ? ")
      );

      const amount = parseFloat(readlineSync.question("Input Amount Top Up: "));

      for (let i = 1; i <= create; i++) {
        const nickname = `${i + 100}`;

        const createCard = await jack.createCard(jwtKey, nickname);

        if (createCard.status !== 200) {
          const errorMessage = "Error: " + createCard.message;
          const errorOutput = chalk.red(
            moment().format("YYYY-MM-DD HH:mm") + " " + errorMessage
          );

          console.log(errorOutput);
          return;
        }

        const idCard = createCard.data.id;

        const topUpDeposit = await jack.activateTopUpCard(
          idCard,
          jwtKey,
          amount
        );

        if (topUpDeposit.status !== 200) {
          const errorMessage = "Error: " + topUpDeposit.message;
          const errorOutput = chalk.red(
            moment().format("YYYY-MM-DD HH:mm") + " " + errorMessage
          );

          console.log(errorOutput);
          return;
        }

        const cardDetail = await jack.createDetailsCard(idCard, jwtKey);

        if (cardDetail.status !== 200) {
          const errorMessage = "Error: " + cardDetail.message;
          const errorOutput = chalk.red(
            moment().format("YYYY-MM-DD HH:mm") + " " + errorMessage
          );

          console.log(errorOutput);
          return;
        }

        console.log(`Successfully created card: ${idCard}`);

        const card_number = cardDetail.data.card_number;
        const expiry_date = cardDetail.data.expiry_date;
        const cvv = cardDetail.data.cvv;

        const saveDetails = `${card_number}|${expiry_date}|${cvv}|${idCard}\n`;
        if (saveDetails) {
          fs.appendFileSync("./result.txt", saveDetails);
        } else {
          console.log("Error:", cardDetail);
          return;
        }
      }

      break;

    case "2":
      try {
        const inputIdCard = await jack.getFileContent("Input Your Id Card: ");

        const cardData = inputIdCard.data;

        for (let i = 0; i < cardData.length; i++) {
          const details = cardData[i].split("|");

          const id = details[3];

          const blockCardsById = await jack.blockCards(id, jwtKey);

          console.log(
            chalk.green(
              `[` + ["!"] + `]` + `Processing card ${i + 1}: ID Card ${id}`
            )
          );

          if (blockCardsById.status !== 200) {
            const errorMessage = "Error: " + blockCardsById.message;
            const errorOutput = chalk.red(
              moment().format("YYYY-MM-DD HH:mm") + " " + errorMessage
            );

            console.log(errorOutput);
            return;
          }
        }

        console.log(
          chalk.yellow(`[` + ["!"] + `]` + `All Processing successfully!`)
        );
      } catch (error) {
        console.log(error);
      }
      break;

    default:
      console.log("Invalid choice. Please enter 1, or 2.");
      break;
  }
})();
