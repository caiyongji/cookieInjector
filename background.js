// Service worker for Cookie Injector
chrome.runtime.onInstalled.addListener(() => {
  // Initialize any necessary state
  console.log('Cookie Injector service worker installed');
});

// Handle declarativeNetRequest rules
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(
  (info) => {
    console.log('Rule matched:', info);
  }
);

// Export rules for declarativeNetRequest
export const rules = [
  {
    id: 1,
    priority: 1,
    action: {
      type: 'modifyHeaders',
      responseHeaders: [
        {
          header: 'Set-Cookie',
          operation: 'append'
        }
      ]
    },
    condition: {
      urlFilter: '*',
      resourceTypes: ['xmlhttprequest', 'sub_frame', 'main_frame']
    }
  }
]; 