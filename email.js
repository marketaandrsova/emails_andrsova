fetch("https://apps.kodim.cz/daweb/trening-api/apis/emails")
  .then((response) => response.json())
  .then((data) => EmailSubject(data, "#inbox"));

function EmailSubject(data, selector) {
  const mailList = document.querySelector(selector);
  data.emails.forEach((email) => {
    const mailText = document.createElement("div");
    let icon = "";
    if (email.unread) {
      icon = "closed";
    } else {
      icon = "opened";
    }

    mailText.innerHTML = `
        <div class="email">
                <div class="email__head">
                    <button class="email__icon email__icon--${icon}"></button>
                    <div class="email__info">
                        <div class="email__sender">${email.sender.name}</div>
                        <div class="email__subject">${email.subject}</div>
                    </div>
                    <div class="email__time">${email.time}</div>
                </div>
                <div class="email__body"></div>
            </div>
                         
                `;
    mailList.appendChild(mailText);
  });
}

fetch("https://apps.kodim.cz/daweb/trening-api/apis/emails/?folder=unread")
  .then((response) => response.json())
  .then((data) => EmailSubject(data, ".unread"));

fetch("https://apps.kodim.cz/daweb/trening-api/apis/emails/?folder=read")
  .then((response) => response.json())
  .then((data) => EmailSubject(data, ".read"));
