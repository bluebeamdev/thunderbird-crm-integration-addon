const templates = {
  zendesk: "https://$domain.zendesk.com/agent/search/1?q=emailhere",
  sugarcrm: "https://$domain.sugarcrm.com/#search/emailhere",
  salesforce_lightning: "https://$domain.lightning.force.com/one/one.app#emailhere",
  salesforce_classic: "https://$domain.salesforce.com/_ui/search/ui/UnifiedSearchResults?searchType=2&str=emailhere",
  servicenow: "https://$domain.service-now.com/nav_to.do?uri=%2Fsys_user_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTO123TEXTQUERY321%253demailhere%26sysparm_query_encoded%3DGOTO123TEXTQUERY321%253d629510%26sysparm_view%3D",
  zoho: "https://crm.zoho.com/crm/$domain/search?searchword=emailhere"
};

// Create context menu item for emails
browser.menus.create({
  id: "lookup-customer",
  title: "Lookup Customer in Scheduling System",
  contexts: ["message_list"]
});

// Handle context menu clicks
browser.menus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "lookup-customer") {
    await lookupCustomer(tab);
  }
});

// Handle message header button clicks
browser.messageDisplayAction.onClicked.addListener(async (tab) => {
  await lookupCustomer(tab);
});

// Shared function for both menu and button (based on your working code)
async function lookupCustomer(tab) {
  try {
    const messageList = await browser.mailTabs.getSelectedMessages(tab.id);
    if (!messageList.messages?.length) return;
    
    const message = messageList.messages[0];
    const email = extractEmail(message.author);
    if (!email) {
      console.error("Could not extract email from:", message.author);
      return;
    }

    console.log("Extracted email:", email);

    // Load user settings
    const { crmSystem, domain, customTemplate } = await browser.storage.local.get({
      crmSystem: "zendesk",
      domain: "",
      customTemplate: ""
    });

    console.log("Settings - CRM:", crmSystem, "Domain:", domain, "CustomTemplate:", customTemplate);

    // Determine template
    let template;
    if (crmSystem === "custom") {
      template = customTemplate;
      if (!template) {
        console.error("Custom URL template is empty!");
        return;
      }
    } else {
      template = templates[crmSystem];
      if (!template) {
        console.error("No template found for CRM:", crmSystem);
        return;
      }
    }

    // Replace placeholders (same as your working code)
    let url = template.replace(/\$domain/g, domain || "yourcompany")
                      .replace(/emailhere/g, encodeURIComponent(email));
    
    console.log("Opening URL:", url);
    browser.tabs.create({ url });

  } catch (error) {
    console.error("Error handling lookup:", error);
  }
}

function extractEmail(authorString) {
  if (!authorString) return null;
  // Check for <email@example.com>
  let match = authorString.match(/<([^>]+@[^>]+)>/);
  if (match) return match[1].trim();
  // Otherwise look for simple email pattern
  if (authorString.includes("@")) {
    const emailMatch = authorString.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    if (emailMatch) return emailMatch[0];
  }
  return null;
}