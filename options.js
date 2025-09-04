const templates = {
  zendesk: "https://$domain.zendesk.com/agent/search/1?q=emailhere",
  sugarcrm: "https://$domain.sugarcrm.com/#search/emailhere",
  salesforce_lightning: "https://$domain.lightning.force.com/one/one.app#emailhere",
  salesforce_classic: "https://$domain.salesforce.com/_ui/search/ui/UnifiedSearchResults?searchType=2&str=emailhere",
  servicenow: "https://$domain.service-now.com/nav_to.do?uri=%2Fsys_user_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTO123TEXTQUERY321%253demailhere%26sysparm_query_encoded%3DGOTO123TEXTQUERY321%253d629510%26sysparm_view%3D",
  zoho: "https://crm.zoho.com/crm/$domain/search?searchword=emailhere"
};

async function loadSettings() {
  let { crmSystem, domain, customTemplate } = await browser.storage.local.get({
    crmSystem: "zendesk",
    domain: "",
    customTemplate: ""
  });

  document.getElementById("crmSystem").value = crmSystem;
  document.getElementById("domain").value = domain;
  document.getElementById("customTemplate").value = customTemplate;

  toggleFields(crmSystem);
  updatePreview();
}

function toggleFields(system) {
  if (system === "custom") {
    document.getElementById("domainContainer").style.display = "none";
    document.getElementById("customContainer").style.display = "block";
  } else {
    document.getElementById("domainContainer").style.display = "block";
    document.getElementById("customContainer").style.display = "none";
  }
}

function updatePreview() {
  const crmSystem = document.getElementById("crmSystem").value;
  const domain = document.getElementById("domain").value.trim();
  const custom = document.getElementById("customTemplate").value.trim();

  let template = crmSystem === "custom" ? custom || "https://example.com/search?user=emailhere" : templates[crmSystem];
  let url = template.replace("$domain", domain || "yourcompany").replace("emailhere", "user@example.com");

  document.getElementById("preview").textContent = url;
}

document.addEventListener("DOMContentLoaded", () => {
  loadSettings();

  document.getElementById("crmSystem").addEventListener("change", (e) => {
    toggleFields(e.target.value);
    updatePreview();
  });

  document.getElementById("domain").addEventListener("input", updatePreview);
  document.getElementById("customTemplate").addEventListener("input", updatePreview);

  document.getElementById("save").addEventListener("click", async () => {
    await browser.storage.local.set({
      crmSystem: document.getElementById("crmSystem").value,
      domain: document.getElementById("domain").value,
      customTemplate: document.getElementById("customTemplate").value
    });
    alert("Settings saved!");
  });
});
