Thunderbird Customer Lookup Add-on
==================================

This Thunderbird add-on lets you right-click on an email and instantly open a CRM search page for the sender's email address.\
It supports multiple CRM systems (Zendesk, SugarCRM, Salesforce, ServiceNow, Zoho) and also allows you to configure a custom URL.

* * * * *

Features
--------

-   Adds a right-click menu option: **Lookup Customer in Scheduling System**

-   Extracts the sender's email address automatically

-   Supports multiple CRM presets:

    -   **Zendesk**: `https://$domain.zendesk.com/agent/search/1?q=emailhere`

    -   **SugarCRM**: `https://$domain.sugarcrm.com/#search/emailhere`

    -   **Salesforce Lightning**: `https://$domain.lightning.force.com/one/one.app#emailhere`

    -   **Salesforce Classic**: `https://$domain.salesforce.com/_ui/search/ui/UnifiedSearchResults?searchType=2&str=emailhere`

    -   **ServiceNow**: `https://$domain.service-now.com/nav_to.do?uri=%2Fsys_user_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTO123TEXTQUERY321%253demailhere%26sysparm_query_encoded%3DGOTO123TEXTQUERY321%253d629510%26sysparm_view%3D`

    -   **Zoho CRM**: `https://crm.zoho.com/crm/$domain/search?searchword=emailhere`

-   **Custom URL** mode: define your own URL template using `emailhere` as the placeholder for the email

-   Live **Preview URL** in the options page

* * * * *

Installation
------------

1.  Clone or download this repository.

2.  Open Thunderbird → **Add-ons Manager** (`Tools > Add-ons and Themes`).

3.  Click the gear icon → **Debug Add-ons**.

4.  Click **Load Temporary Add-on** and select the `manifest.json` file in this project.

5.  The add-on will now appear in Thunderbird.

* * * * *

Configuration
-------------

1.  Open the add-on **Options** page.

2.  Select your CRM system from the dropdown:

    -   **Preset CRM (Zendesk, Salesforce, Zoho, etc.)**:\
        Enter your company **domain** in the domain field (e.g., `yourcompany`).\
        The add-on inserts it automatically into the template.

    -   **Custom**:\
        A **Custom URL** text box appears. Paste your full URL here and use `emailhere` where the sender's email should go.\
        Example: `https://localhost:8583/handle?email=emailhere`

3.  A **Preview URL** updates live as you type, so you can confirm it's correct.

4.  Click **Save** to apply your settings.

* * * * *

Usage
-----

1.  Right-click an email in Thunderbird's message list.

2.  Select **Lookup Customer in Scheduling System**.

3.  The add-on opens your CRM system (or custom URL) in a new browser tab, with the sender's email automatically inserted.

* * * * *

Examples
--------

**Preset (Zendesk)**

-   Domain: `mycompany`

-   Sender email: `test@example.com`

-   Resulting URL:\
    `https://mycompany.zendesk.com/agent/search/1?q=test@example.com`

**Custom URL**

-   Custom template: `https://localhost:8583/handle?email=emailhere`

-   Sender email: `test@example.com`

-   Resulting URL:\
    `https://localhost:8583/handle?email=test@example.com`

* * * * *

Development
-----------

-   Modify CRM templates in `background.js` or `options.js`.

-   Reload the add-on in Thunderbird via **Load Temporary Add-on** after making changes.

-   Use the console (`Ctrl+Shift+J`) to see debug logs.

* * * * *

License
-------

MIT License -- free to use and modify.
