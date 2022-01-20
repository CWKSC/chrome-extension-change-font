let fontFamily = "Microsoft JhengHei";
let fontWeight = "normal";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ fontFamily: fontFamily });
  chrome.storage.sync.set({ fontWeight: fontWeight });

  console.log(`Default fontFamily set to: ${fontFamily}`);
  console.log(`Default fontWeight set to: ${ifontWeightsBold}`);
});
