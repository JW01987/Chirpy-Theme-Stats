const express = require("express");
const app = express();
const port = process.envPOST || 3000;
const { parse } = require("rss-to-json");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api", (req, res) => {
  const { xml } = req.query;
  parse(xml).then((rss) => {
    const data = rss.items;
    const createLatestCardTitle = (username) => {
      return `
          <g data-testid="card-title" transform="translate(25, 35)">
              <g transform="translate(0, 0)">
                <text x="0" y="0" class="header" data-testid="header"><tspan class="name">${username}</tspan>'s recent post</text>
              </g>
          </g>
          `;
    };

    const createLatestCardBody = () => {
      return `
        <g data-testid="main-card-body" transform="translate(0, 45)">
        <svg data-testid="lang-items" x="25" width="400" height="400" viewBox="0 0 400 400">
            <g transform="translate(0, 0)">
                <text data-testid="lang-list" class="list-style" x="5" y="20">•</text>
                <a href="${data[0].link}">
                    <text data-testid="lang-name" x="20" y="20" class="log-title">${
                      data[0]?.title || "-"
                    }</text>
                </a>
                <text data-testid="lang-list" class="list-style" x="5" y="43">•</text>
                <a href="${data[1].link}">
                    <text data-testid="lang-name" x="20" y="43" class="log-title">${
                      data[1]?.title || "-"
                    }</text>
                </a>
                <text data-testid="lang-list" class="list-style" x="5" y="66">•</text>
                <a href="${data[2].link}">
                    <text data-testid="lang-name" x="20" y="66" class="log-title">${
                      data[2]?.title || "-"
                    }</text>
                </a>
                <text data-testid="lang-list" class="list-style" x="5" y="89">•</text>
                <a href="${data[3].link}">
                    <text data-testid="lang-name" x="20" y="89" class="log-title">${
                      data[3]?.title || "-"
                    }</text>
                </a>
            </g>
        </svg>
      </g>
          `;
    };

    const latestCardStyle = `
          <style>
          @import url('https://fonts.googleapis.com/css2?family=Kanit');
              .header {
                  font: bold 18px 'Kanit', Ubuntu, Sans-Serif;
                  fill: #343A40;
                  animation: fadeInAnimation 0.8s ease-in-out forwards;
              }
              .name {fill: #00a8e8;}
              .log-title { font: bold 14px 'Kanit', Ubuntu, Sans-Serif; fill: #212529 }
              .log-description { font-size: 12px; fill: #495057}
              .tag-item { font-size: 12px; fill: #0CA678;}
              .heart-count { font-size: 12px; fill: #495057;}
              .log-title:hover{ fill: #00a8e8; text-decoration: underline;}
              .list-style{font-size:14px; fill: #212529; }
          </style>
      `;
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(`
              <svg xmlns="http://www.w3.org/2000/svg" width="430" height="160" viewBox="0 0 430 160" fill="none">
                  ${latestCardStyle}
                  <rect data-testid="card-bg" x="0.5" y="0.5" rx="4.5" height="99%" stroke="#e4e2e2" width="429" fill="#fffefe" stroke-opacity="1"/>
                  ${createLatestCardTitle(data[0].author)}
                  ${createLatestCardBody(data)}
              </svg>
          `);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
module.exports = app;
