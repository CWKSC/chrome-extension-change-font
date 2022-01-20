let input_fontFamily = document.getElementById("input_fontFamily");
let select_fontWeight = document.getElementById("select_fontWeight");

let setFontButton = document.getElementById("setFontButton");

chrome.storage.sync.get("fontFamily", ({ fontFamily }) => {
  input_fontFamily.value = fontFamily;
});

chrome.storage.sync.get("fontWeight", ({ fontWeight }) => {
  select_fontWeight.value = fontWeight;
});

setFontButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.storage.sync.set({ fontFamily: input_fontFamily.value });
  chrome.storage.sync.set({ fontWeight: select_fontWeight.value });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setFont,
  });
});

function setFont() {
  chrome.storage.sync.get(
    ["fontFamily", "fontWeight"],
    ({ fontFamily, fontWeight }) => {
      console.log(`fontFamily: ${fontFamily}`);
      console.log(`fontWeight: ${fontWeight}`);
      document.querySelectorAll("*").forEach((e) => {
        e.style.fontFamily = fontFamily;
        e.style.fontWeight = fontWeight;
      });
    }
  );
}
