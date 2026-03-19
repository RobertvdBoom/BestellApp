function announceLoadFromLocalStorage() {
  announcementContainerRef.innerHTML += `Es wird geprüft, ob es Daten im Local Storage gibt.`
}

function announceAmount(dish, action, amountNew) {
  announcementContainerRef.innerHTML += `${dish} wurde ${action}. Aktuelle Menge im Warenkorb: ${amountNew}`;
}

function announcePrice(price) {
  if (price === undefined) {
    announcementContainerRef.innerHTML += `Dein Warenkorb ist derzeit leer. `;
    announceDeliveryState();
  } else {
    announcementContainerRef.innerHTML += `Die Summe der Produkte in deinem Warenkorb beträgt: ${price}. Lieferkosten betragen: ${deliveryCost} €. `;
  }
}

function announceActiveCategory(currentActiveCategory) {
  announcementContainerRef.innerHTML += `Die aktuelle Kategorie ist: ${currentActiveCategory}. `;
}

function announceCurrentActiveCategory() {
  announcementContainerRef.innerHTML += `Die aktuelle Kategorie ist: ${currentActiveCategory}. `;
}

function announceDeliveryState() {
  let deliveryStateForAnnouncement = "";
  if (delivery === true) {
    deliveryStateForAnnouncement = "Lieferung zu dir! ";
  } else if (delivery === false) {
    deliveryStateForAnnouncement = "Abholung bei uns vor Ort! ";
  } else {
    console.log("did not find option for delivery");
  }
  announcementContainerRef.innerHTML += `Du hast folgende Einstellung für deine Bestellung ausgewählt: ${deliveryStateForAnnouncement}`;
}

function updateAriaCurrent() {
  document.querySelectorAll('#resp_menu [aria-current');
}

window.addEventListener("resize", assignHidden);
window.addEventListener("resize", adjustTabSkip);
window.addEventListener("resize", updateVW);

function updateVW() {
  vw = window.innerWidth;
}

function assignHidden() {
  let respMenuBoxRef = document.getElementById('resp_menu');
  if (vw < 1266 && hiddenState == true) {
    respMenuBoxRef.removeAttribute("hidden");
    hiddenState = false;
  } else if (vw > 1266 && hiddenState == false) {
    respMenuBoxRef.setAttribute("hidden", "");
    hiddenState = true;
  }
}

function initializeHidden() {
  let respMenuBoxRef = document.getElementById('resp_menu');
  if (vw < 1266) {
    respMenuBoxRef.removeAttribute("hidden");
    hiddenState = false;
  } else if (vw > 1266) {
    respMenuBoxRef.setAttribute("hidden", "");
    hiddenState = true;
  }
}

function adjustTabSkip() {
  let linkToMainRef = document.getElementById('skip-to-main');
  let linkToCategoryRef = document.getElementById('skip-to-category');
  let linkToCategoryHeaderMobileRef = document.getElementById('mobile-category-header');
  if (vw < 1266) {
    linkToMainRef.removeAttribute("hidden");
    linkToCategoryRef.setAttribute("hidden", "");
    linkToCategoryHeaderMobileRef.removeAttribute("hidden");
  } else if (vw > 1266) {
    linkToCategoryRef.removeAttribute("hidden");
    linkToMainRef.setAttribute("hidden", "");
    linkToCategoryHeaderMobileRef.setAttribute("hidden", "");
  }
}