let input_fontFamily = document.getElementById("input_fontFamily");
let select_fontWeight = document.getElementById("select_fontWeight");
let setFontButton = document.getElementById("setFontButton");

chrome.storage.sync.get("font", ({ font }) => {
  input_fontFamily.value = font;
});

chrome.storage.sync.get("fontWeight", ({ fontWeight }) => {
  select_fontWeight.value = fontWeight;
});

setFontButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.storage.sync.set({ font: input_fontFamily.value });
  chrome.storage.sync.set({ fontWeight: select_fontWeight.value });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setFont,
  });
});

function setFont() {
  chrome.storage.sync.get(["font", "fontWeight"], ({ font, fontWeight }) => {
    console.log(`font: ${font}`);
    console.log(`fontWeight: ${fontWeight}`);
    document.querySelectorAll("*").forEach((e) => {
      e.style.fontFamily = font;
      e.style.fontWeight = fontWeight;
    });
  });
}
