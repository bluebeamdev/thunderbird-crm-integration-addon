Customer Lookup Integration (Thunderbird Add-on)
================================================

A Thunderbird extension that lets you quickly open customer records from your scheduling system.

When you right-click on an email and select **"Lookup Customer in Scheduling System"**, Thunderbird will open a browser tab with a URL containing the sender's email address.\
This URL can be received by your software listener to load the correct customer information.

* * * * *

✨ Features
----------

-   Adds a context menu option in the **message list**.

-   Extracts the sender's email address automatically.

-   Opens a customizable URL (host, port, path) with the `?email=` parameter.

-   Settings page with live **preview of the final URL**.

-   Defaults to: https://localhost:8583/handle?email=user@example.com

⚙️ Installation (Private Distribution)
--------------------------------------

Since this add-on is not published on Thunderbird Add-ons (ATN), you install it manually:

1.  Download or clone this repository.

2.  Create an `.xpi` file:

cd customer-lookup
zip -r ../customer-lookup.xpi *

(On Windows: select all files, right-click → **Send to → Compressed (zipped) folder**, then rename `.zip` → `.xpi`).

 -   Open Thunderbird → **Add-ons Manager** (`Ctrl+Shift+A`).

-   Click the ⚙️ gear icon → **Install Add-on From File...**

-   Select `customer-lookup.xpi` and confirm installation.

🔧 Configuration
----------------

1.  In Thunderbird, open **Add-ons → Extensions → Customer Lookup Integration → Preferences**.

2.  Enter:

    -   **Host** (default: `https://localhost`)

    -   **Port** (default: `8583`)

    -   **Handle path** (default: `/handle`)

3.  As you type, the **Preview URL** will update in real time.

📂 Project Structure
--------------------

customer-lookup/
 ├─ manifest.json      # Add-on manifest
 ├─ background.js      # Main extension logic
 ├─ options.html       # Options (settings) page UI
 └─ options.js         # Settings save/load logic

🚀 Usage
--------

1.  Open Thunderbird.

2.  Right-click any email in the message list.

3.  Select **Lookup Customer in Scheduling System**.

4.  Your default browser will open the configured URL, e.g.:

https://localhost:8583/handle?email=test@example.com

5.  Your software listener can catch this request and load the customer record.
