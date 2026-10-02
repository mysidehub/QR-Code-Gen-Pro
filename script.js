/* =========================================================
   GLOBAL VARIABLES
========================================================= */

const $ = (id) => document.getElementById(id);

let qr = null;
let qrData = "";
let logoData = "";
let toastTimer = null;


/* =========================================================
   QR DESIGN PRESETS
========================================================= */

const presets = {

    classic: {
        dots: "square",
        corner: "square",
        color: "#111827",
        bg: "#ffffff"
    },

    rounded: {
        dots: "rounded",
        corner: "extra-rounded",
        color: "#263248",
        bg: "#ffffff"
    },

    dots: {
        dots: "dots",
        corner: "dot",
        color: "#111827",
        bg: "#ffffff"
    },

    classy: {
        dots: "classy",
        corner: "square",
        color: "#172033",
        bg: "#ffffff"
    },

    classyRounded: {
        dots: "classy-rounded",
        corner: "extra-rounded",
        color: "#24304a",
        bg: "#ffffff"
    },

    ocean: {
        dots: "rounded",
        corner: "extra-rounded",
        color: "#087eaa",
        bg: "#f0fcff",
        gradient: ["#087eaa", "#23c6bd"]
    },

    sunset: {
        dots: "classy-rounded",
        corner: "extra-rounded",
        color: "#e34d73",
        bg: "#fff7f3",
        gradient: ["#f97316", "#db2777"]
    },

    purple: {
        dots: "dots",
        corner: "dot",
        color: "#6d28d9",
        bg: "#faf5ff",
        gradient: ["#7c3aed", "#db2777"]
    },

    forest: {
        dots: "classy",
        corner: "extra-rounded",
        color: "#166534",
        bg: "#f0fdf4",
        gradient: ["#166534", "#65a30d"]
    },

    ruby: {
        dots: "square",
        corner: "square",
        color: "#be123c",
        bg: "#fff1f2"
    },

    midnight: {
        dots: "rounded",
        corner: "extra-rounded",
        color: "#dbeafe",
        bg: "#111827"
    },

    neon: {
        dots: "dots",
        corner: "dot",
        color: "#39ff14",
        bg: "#101820"
    },

    gold: {
        dots: "classy",
        corner: "extra-rounded",
        color: "#9a6b12",
        bg: "#fffbea",
        gradient: ["#b7791f", "#f5d77a"]
    },

    rose: {
        dots: "rounded",
        corner: "dot",
        color: "#be185d",
        bg: "#fff1f7"
    },

    sky: {
        dots: "square",
        corner: "extra-rounded",
        color: "#0369a1",
        bg: "#f0f9ff"
    },

    minimal: {
        dots: "square",
        corner: "square",
        color: "#475569",
        bg: "#ffffff"
    },

    coffee: {
        dots: "classy",
        corner: "square",
        color: "#78350f",
        bg: "#fffbeb"
    },

    candy: {
        dots: "dots",
        corner: "dot",
        color: "#9333ea",
        bg: "#fff1fb",
        gradient: ["#ec4899", "#8b5cf6"]
    },

    mono: {
        dots: "classy-rounded",
        corner: "extra-rounded",
        color: "#000000",
        bg: "#ffffff"
    },

    brand: {
        dots: "rounded",
        corner: "extra-rounded",
        color: "#4f46e5",
        bg: "#ffffff",
        gradient: ["#4f46e5", "#06b6d4"]
    }
};


/* =========================================================
   QR TEMPLATE FIELDS
========================================================= */

const templateFields = {

    url: [
        ["url", "Website URL", "url", "https://example.com", "full"]
    ],

    text: [
        ["text", "Your text", "textarea", "Write something...", "full"]
    ],

    phone: [
        ["phone", "Phone number", "tel", "+919876543210", "full"]
    ],

    sms: [
        ["phone", "Phone number", "tel", "+919876543210"],
        ["message", "SMS message", "textarea", "Your message", "full"]
    ],

    email: [
        ["email", "Email address", "email", "hello@example.com"],
        ["subject", "Subject", "text", "Hello"],
        ["message", "Email message", "textarea", "Write your message", "full"]
    ],

    wifi: [
        ["ssid", "Network name (SSID)", "text", "My Wi-Fi"],
        ["password", "Wi-Fi password", "text", "Password"],
        ["security", "Security", "select", "WPA", ["WPA", "WEP", "nopass"]],
        ["hidden", "Hidden network?", "select", "false", ["false", "true"]]
    ],

    vcard: [
        ["name", "Full name", "text", "Alex Morgan"],
        ["phone", "Phone", "tel", "+919876543210"],
        ["email", "Email", "email", "alex@example.com"],
        ["company", "Company", "text", "Company name"],
        ["title", "Job title", "text", "Designer"],
        ["website", "Website", "url", "https://example.com"],
        ["address", "Address", "text", "City, Country", "full"]
    ],

    location: [
        ["lat", "Latitude", "text", "28.6139"],
        ["lng", "Longitude", "text", "77.2090"],
        ["label", "Place name (optional)", "text", "New Delhi", "full"]
    ],

    whatsapp: [
        [
            "phone",
            "WhatsApp number with country code",
            "tel",
            "919876543210",
            "full"
        ]
    ],

    whatsappmsg: [
        [
            "phone",
            "WhatsApp number with country code",
            "tel",
            "919876543210"
        ],
        [
            "message",
            "Pre-filled message",
            "textarea",
            "Hello!",
            "full"
        ]
    ],

    telegram: [
        [
            "username",
            "Telegram username or link",
            "text",
            "username or https://t.me/username",
            "full"
        ]
    ],

    instagram: [
        [
            "username",
            "Instagram username or profile URL",
            "text",
            "username",
            "full"
        ]
    ],

    facebook: [
        [
            "url",
            "Facebook profile/page URL",
            "url",
            "https://facebook.com/yourpage",
            "full"
        ]
    ],

    linkedin: [
        [
            "url",
            "LinkedIn profile URL",
            "url",
            "https://linkedin.com/in/yourname",
            "full"
        ]
    ],

    x: [
        [
            "username",
            "X username or profile URL",
            "text",
            "username",
            "full"
        ]
    ],

    tiktok: [
        [
            "username",
            "TikTok username or profile URL",
            "text",
            "username",
            "full"
        ]
    ],

    youtube: [
        [
            "url",
            "YouTube channel/video URL",
            "url",
            "https://youtube.com/@channel",
            "full"
        ]
    ],

    spotify: [
        [
            "url",
            "Spotify profile/track/playlist URL",
            "url",
            "https://open.spotify.com/...",
            "full"
        ]
    ],

    github: [
        [
            "url",
            "GitHub profile/repository URL",
            "url",
            "https://github.com/username",
            "full"
        ]
    ],

    pinterest: [
        [
            "url",
            "Pinterest profile/board URL",
            "url",
            "https://pinterest.com/username",
            "full"
        ]
    ],

    snapchat: [
        [
            "username",
            "Snapchat username or profile URL",
            "text",
            "username",
            "full"
        ]
    ],

    threads: [
        [
            "username",
            "Threads username or profile URL",
            "text",
            "username",
            "full"
        ]
    ],

    discord: [
        [
            "url",
            "Discord invite URL",
            "url",
            "https://discord.gg/invite",
            "full"
        ]
    ],

    skype: [
        [
            "skype",
            "Skype name or link",
            "text",
            "live:username",
            "full"
        ]
    ],

    messenger: [
        [
            "url",
            "Messenger profile/chat URL",
            "url",
            "https://m.me/username",
            "full"
        ]
    ],

    reddit: [
        [
            "url",
            "Reddit profile/community URL",
            "url",
            "https://reddit.com/r/community",
            "full"
        ]
    ],

    twitch: [
        [
            "url",
            "Twitch channel URL",
            "url",
            "https://twitch.tv/username",
            "full"
        ]
    ],

    upi: [
        ["vpa", "UPI ID / VPA", "text", "name@upi"],
        ["name", "Payee name", "text", "Your name"],
        ["amount", "Amount (optional)", "number", "100"],
        ["note", "Payment note", "text", "Payment"]
    ],

    bitcoin: [
        [
            "address",
            "Bitcoin address",
            "text",
            "Bitcoin wallet address",
            "full"
        ],
        ["amount", "Amount (optional)", "number", "0"]
    ],

    ethereum: [
        [
            "address",
            "Ethereum address",
            "text",
            "0x...",
            "full"
        ]
    ],

    crypto: [
        ["currency", "Currency / coin", "text", "coin"],
        [
            "address",
            "Wallet address",
            "text",
            "Wallet address",
            "full"
        ]
    ],

    review: [
        [
            "url",
            "Google review link",
            "url",
            "https://g.page/r/.../review",
            "full"
        ]
    ],

    menu: [
        [
            "url",
            "Restaurant menu URL",
            "url",
            "https://example.com/menu",
            "full"
        ]
    ],

    product: [
        [
            "url",
            "Product page URL",
            "url",
            "https://example.com/product",
            "full"
        ],
        [
            "name",
            "Product name (optional)",
            "text",
            "Product name"
        ]
    ],

    coupon: [
        ["code", "Coupon code", "text", "SAVE20"],
        [
            "url",
            "Offer URL (optional)",
            "url",
            "https://example.com/offer"
        ],
        [
            "details",
            "Offer details",
            "textarea",
            "20% off",
            "full"
        ]
    ],

    business: [
        ["name", "Business name", "text", "Business name"],
        ["phone", "Phone", "tel", "+919876543210"],
        ["email", "Email", "email", "hello@example.com"],
        ["url", "Website", "url", "https://example.com"],
        [
            "address",
            "Address",
            "textarea",
            "Street, City",
            "full"
        ]
    ],

    profile: [
        ["name", "Full name", "text", "Your name"],
        ["role", "Profession", "text", "Your profession"],
        ["url", "Portfolio URL", "url", "https://example.com"],
        ["email", "Email", "email", "hello@example.com"],
        ["phone", "Phone", "tel", "+919876543210"]
    ],

    multilink: [
        ["title", "Page title", "text", "My links"],
        ["url1", "Link 1", "url", "https://example.com"],
        ["url2", "Link 2", "url", "https://instagram.com/"],
        ["url3", "Link 3", "url", "https://youtube.com/"],
        [
            "url4",
            "Link 4 (optional)",
            "url",
            "https://linkedin.com/",
            "full"
        ]
    ],

    app: [
        [
            "url",
            "App download / landing page URL",
            "url",
            "https://example.com/app",
            "full"
        ]
    ],

    appstore: [
        [
            "url",
            "Apple App Store URL",
            "url",
            "https://apps.apple.com/app/id...",
            "full"
        ]
    ],

    playstore: [
        [
            "url",
            "Google Play Store URL",
            "url",
            "https://play.google.com/store/apps/details?id=...",
            "full"
        ]
    ],

    pdf: [
        [
            "url",
            "Public PDF/document URL",
            "url",
            "https://example.com/file.pdf",
            "full"
        ]
    ],

    image: [
        [
            "url",
            "Public image URL",
            "url",
            "https://example.com/image.jpg",
            "full"
        ]
    ],

    websiteSocial: [
        [
            "website",
            "Website URL",
            "url",
            "https://example.com"
        ],
        [
            "instagram",
            "Instagram URL",
            "url",
            "https://instagram.com/username"
        ],
        [
            "youtube",
            "YouTube URL",
            "url",
            "https://youtube.com/@channel"
        ],
        [
            "facebook",
            "Facebook URL",
            "url",
            "https://facebook.com/page",
            "full"
        ]
    ],

    event: [
        ["title", "Event name", "text", "My Event"],
        ["start", "Start date/time", "text", "20261015T100000"],
        ["end", "End date/time", "text", "20261015T120000"],
        ["location", "Location", "text", "New Delhi"],
        [
            "details",
            "Description",
            "textarea",
            "Event details",
            "full"
        ]
    ],

    calendar: [
        ["title", "Event title", "text", "Meeting"],
        [
            "start",
            "Start date/time (YYYYMMDDTHHMMSS)",
            "text",
            "20261015T100000"
        ],
        [
            "end",
            "End date/time (YYYYMMDDTHHMMSS)",
            "text",
            "20261015T110000"
        ],
        ["location", "Location", "text", "Office"],
        [
            "details",
            "Description",
            "textarea",
            "Details",
            "full"
        ]
    ],

    ticket: [
        [
            "url",
            "Ticket / booking URL",
            "url",
            "https://example.com/ticket",
            "full"
        ],
        [
            "reference",
            "Booking reference (optional)",
            "text",
            "ABC123"
        ]
    ],

    emergency: [
        [
            "name",
            "Contact name",
            "text",
            "Emergency contact"
        ],
        [
            "phone",
            "Emergency phone",
            "tel",
            "+919876543210"
        ],
        [
            "message",
            "Extra information",
            "textarea",
            "If found, please call this number",
            "full"
        ]
    ],

    education: [
        [
            "institution",
            "Institution",
            "text",
            "College / School"
        ],
        [
            "course",
            "Course / class",
            "text",
            "BCA"
        ],
        [
            "website",
            "Website",
            "url",
            "https://example.com"
        ],
        [
            "details",
            "Information",
            "textarea",
            "Additional information",
            "full"
        ]
    ],

    custom: [
        [
            "data",
            "Custom text or URL",
            "textarea",
            "Enter any data to encode...",
            "full"
        ]
    ]
};


/* =========================================================
   QR TYPE LABELS
========================================================= */

const labels = {

    url: "Website URL",
    text: "Plain text",
    phone: "Phone call",
    sms: "SMS",
    email: "Email",
    wifi: "Wi-Fi",
    vcard: "Contact / vCard",
    location: "Location",

    whatsapp: "WhatsApp",
    whatsappmsg: "WhatsApp message",
    telegram: "Telegram",
    instagram: "Instagram",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    x: "X / Twitter",
    tiktok: "TikTok",
    youtube: "YouTube",
    spotify: "Spotify",
    github: "GitHub",
    pinterest: "Pinterest",
    snapchat: "Snapchat",
    threads: "Threads",
    discord: "Discord",
    skype: "Skype",
    messenger: "Messenger",
    reddit: "Reddit",
    twitch: "Twitch",

    upi: "UPI payment",
    bitcoin: "Bitcoin",
    ethereum: "Ethereum",
    crypto: "Crypto address",

    review: "Google review",
    menu: "Restaurant menu",
    product: "Product",
    coupon: "Coupon",

    business: "Business information",
    profile: "Professional profile",
    multilink: "Multi-link",

    app: "App download",
    appstore: "App Store",
    playstore: "Google Play",

    pdf: "PDF/document",
    image: "Image",

    websiteSocial: "Website + social links",

    event: "Event",
    calendar: "Calendar event",
    ticket: "Ticket / booking",

    emergency: "Emergency contact",
    education: "Education",

    custom: "Custom data"
};


/* =========================================================
   TOAST
========================================================= */

function showToast(title, message) {

    $("toastTitle").textContent = title;
    $("toastMessage").textContent = message;

    $("toast").classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        $("toast").classList.remove("show");
    }, 3600);
}


$("toastClose").addEventListener("click", () => {
    $("toast").classList.remove("show");
});


/* =========================================================
   RENDER DYNAMIC FIELDS
========================================================= */

function renderFields() {

    const type = $("qrType").value;
    const fields = templateFields[type] || [];

    $("fields").innerHTML = fields
        .map(([id, label, kind, placeholder, extra]) => {

            const full = extra === "full" ? "full" : "";

            let control = "";

            if (kind === "textarea") {

                control = `
                    <textarea
                        id="f_${id}"
                        placeholder="${esc(placeholder)}"
                    ></textarea>
                `;

            } else if (kind === "select") {

                control = `
                    <select
                        id="f_${id}"
                        class="control"
                    >
                        ${extra
                            .map(
                                (v) => `
                                    <option value="${v}">
                                        ${
                                            v === "nopass"
                                                ? "No password"
                                                : v === "false"
                                                ? "No"
                                                : "Yes"
                                        }
                                    </option>
                                `
                            )
                            .join("")}
                    </select>
                `;

            } else {

                control = `
                    <input
                        id="f_${id}"
                        type="${kind}"
                        placeholder="${esc(placeholder)}"
                        ${
                            kind === "number"
                                ? 'min="0" step="any"'
                                : ""
                        }
                    >
                `;
            }

            return `
                <div class="field-wrap ${full}">
                    <label for="f_${id}">
                        ${esc(label)}
                    </label>

                    ${control}
                </div>
            `;
        })
        .join("");
}


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function esc(s) {

    return String(s).replace(
        /[&<>"']/g,
        (c) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[c]
    );
}


function val(id) {

    return ($("f_" + id)?.value || "").trim();
}


function required(value, label) {

    if (!value) {

        showToast(
            "Missing information",
            `Please enter ${label}.`
        );

        return false;
    }

    return true;
}


function normalizeUrl(s) {

    if (!s) {
        return "";
    }

    return /^https?:\/\//i.test(s)
        ? s
        : "https://" + s;
}


function encodeWifi(s) {

    return String(s)
        .replace(/\\/g, "\\\\")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,")
        .replace(/:/g, "\\:")
        .replace(/"/g, '\\"');
}


function vcardEscape(s) {

    return String(s || "")
        .replace(/\\/g, "\\\\")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,")
        .replace(/\n/g, "\\n");
}


/* =========================================================
   BUILD QR DATA
========================================================= */

function buildData() {

    const t = $("qrType").value;

    const need = (id, label) =>
        required(val(id), label);

    switch (t) {

        case "url":
        case "facebook":
        case "linkedin":
        case "youtube":
        case "spotify":
        case "github":
        case "discord":
        case "review":
        case "menu":
        case "app":
        case "appstore":
        case "playstore":
        case "pdf":
        case "image":
        case "ticket":
        case "product":
        case "websiteSocial":
        case "reddit":
        case "twitch":
        case "messenger":

            if (t === "websiteSocial") {

                if (!need("website", "a website URL")) {
                    return null;
                }

                return [
                    "Website: " + normalizeUrl(val("website")),
                    "Instagram: " + val("instagram"),
                    "YouTube: " + val("youtube"),
                    "Facebook: " + val("facebook")
                ]
                    .filter((x) => !x.endsWith(": "))
                    .join("\n");
            }

            if (!need("url", "a URL")) {
                return null;
            }

            return normalizeUrl(val("url"));


        case "text":
        case "custom":

            if (
                !need(
                    t === "text" ? "text" : "data",
                    "some text"
                )
            ) {
                return null;
            }

            return val(
                t === "text" ? "text" : "data"
            );


        case "phone":

            if (!need("phone", "a phone number")) {
                return null;
            }

            return "tel:" + val("phone");


        case "sms":

            if (!need("phone", "a phone number")) {
                return null;
            }

            return (
                "SMSTO:" +
                val("phone") +
                ":" +
                val("message")
            );


        case "email":

            if (!need("email", "an email address")) {
                return null;
            }

            return `mailto:${val("email")}?subject=${encodeURIComponent(
                val("subject")
            )}&body=${encodeURIComponent(
                val("message")
            )}`;


        case "wifi":

            if (!need("ssid", "a Wi-Fi network name")) {
                return null;
            }

            return `WIFI:T:${val(
                "security"
            )};S:${encodeWifi(
                val("ssid")
            )};P:${encodeWifi(
                val("password")
            )};H:${
                val("hidden") === "true"
                    ? "true"
                    : "false"
            };;`;


        case "vcard":

            if (!need("name", "a contact name")) {
                return null;
            }

            return [
                "BEGIN:VCARD",
                "VERSION:3.0",
                `FN:${vcardEscape(val("name"))}`,
                `ORG:${vcardEscape(val("company"))}`,
                `TITLE:${vcardEscape(val("title"))}`,
                `TEL:${vcardEscape(val("phone"))}`,
                `EMAIL:${vcardEscape(val("email"))}`,
                `URL:${vcardEscape(val("website"))}`,
                `ADR:;;${vcardEscape(
                    val("address")
                )};;;;`,
                "END:VCARD"
            ].join("\n");


        case "location":

            if (
                !need("lat", "latitude") ||
                !need("lng", "longitude")
            ) {
                return null;
            }

            return `https://www.google.com/maps?q=${encodeURIComponent(
                val("lat") + "," + val("lng")
            )}`;


        case "whatsapp":
        case "whatsappmsg":

            if (
                !need(
                    "phone",
                    "a WhatsApp phone number"
                )
            ) {
                return null;
            }

            return `https://wa.me/${val(
                "phone"
            ).replace(/\D/g, "")}${
                t === "whatsappmsg" &&
                val("message")
                    ? "?text=" +
                      encodeURIComponent(
                          val("message")
                      )
                    : ""
            }`;


        case "telegram":

            if (
                !need(
                    "username",
                    "a Telegram username or link"
                )
            ) {
                return null;
            }

            return val("username").startsWith("http")
                ? val("username")
                : "https://t.me/" +
                  val("username").replace(/^@/, "");


        case "instagram":
        case "x":
        case "tiktok":
        case "snapchat":
        case "threads":

            if (
                !need(
                    "username",
                    "a username or profile URL"
                )
            ) {
                return null;
            }

            {
                const domains = {
                    instagram: "instagram.com",
                    x: "x.com",
                    tiktok: "tiktok.com/@",
                    snapchat: "snapchat.com/add/",
                    threads: "threads.net/@"
                };

                const u = val("username");

                return u.startsWith("http")
                    ? u
                    : "https://" +
                      domains[t] +
                      u.replace(/^@/, "");
            }


        case "upi":

            if (!need("vpa", "a UPI ID")) {
                return null;
            }

            return `upi://pay?pa=${encodeURIComponent(
                val("vpa")
            )}&pn=${encodeURIComponent(
                val("name")
            )}${
                val("amount")
                    ? "&am=" +
                      encodeURIComponent(
                          val("amount")
                      )
                    : ""
            }&cu=INR&tn=${encodeURIComponent(
                val("note")
            )}`;


        case "bitcoin":

            if (!need("address", "a Bitcoin address")) {
                return null;
            }

            return (
                "bitcoin:" +
                val("address") +
                (val("amount")
                    ? "?amount=" +
                      encodeURIComponent(
                          val("amount")
                      )
                    : "")
            );


        case "ethereum":

            if (!need("address", "an Ethereum address")) {
                return null;
            }

            return "ethereum:" + val("address");


        case "crypto":

            if (!need("address", "a wallet address")) {
                return null;
            }

            return (
                val("currency") +
                ":" +
                val("address")
            );


        case "coupon":

            if (!need("code", "a coupon code")) {
                return null;
            }

            return `Coupon: ${val("code")}
${val("details")}
${val("url") ? normalizeUrl(val("url")) : ""}`.trim();


        case "business":

            if (!need("name", "a business name")) {
                return null;
            }

            return [
                "BEGIN:VCARD",
                "VERSION:3.0",
                `FN:${vcardEscape(val("name"))}`,
                `TEL:${val("phone")}`,
                `EMAIL:${val("email")}`,
                `URL:${val("url")}`,
                `ADR:;;${vcardEscape(
                    val("address")
                )};;;;`,
                "END:VCARD"
            ].join("\n");


        case "profile":

            if (!need("name", "a full name")) {
                return null;
            }

            return `
${val("name")}
${val("role")}
${val("url")}
${val("email")}
${val("phone")}
            `.trim();


        case "multilink":

            if (!need("url1", "at least one link")) {
                return null;
            }

            return [
                val("title"),
                val("url1"),
                val("url2"),
                val("url3"),
                val("url4")
            ]
                .filter(Boolean)
                .map((x, i) =>
                    i === 0
                        ? x
                        : normalizeUrl(x)
                )
                .join("\n");


        case "event":
        case "calendar":

            if (
                !need("title", "an event title") ||
                !need(
                    "start",
                    "a start date/time"
                ) ||
                !need(
                    "end",
                    "an end date/time"
                )
            ) {
                return null;
            }

            return [
                "BEGIN:VEVENT",
                `SUMMARY:${val("title")}`,
                `DTSTART:${val("start").replace(
                    /[-:]/g,
                    ""
                )}`,
                `DTEND:${val("end").replace(
                    /[-:]/g,
                    ""
                )}`,
                `LOCATION:${val("location")}`,
                `DESCRIPTION:${val("details")}`,
                "END:VEVENT"
            ].join("\n");


        case "emergency":

            if (!need("phone", "an emergency phone number")) {
                return null;
            }

            return `Emergency contact: ${val(
                "name"
            )}
Phone: ${val("phone")}
${val("message")}`;


        case "education":

            if (
                !need(
                    "institution",
                    "an institution name"
                )
            ) {
                return null;
            }

            return `Institution: ${val(
                "institution"
            )}
Course: ${val("course")}
Website: ${val("website")}
${val("details")}`;


        default:

            showToast(
                "Template unavailable",
                "Please choose another QR type."
            );

            return null;
    }
}


/* =========================================================
   CURRENT PRESET
========================================================= */

function currentPreset() {

    const p =
        presets[$("designPreset").value] ||
        presets.classic;

    const customDot = $("dotStyle").value;
    const customCorner = $("cornerStyle").value;

    const gradient =
        $("useGradient").checked;

    return {

        dots:
            customDot === "preset"
                ? p.dots
                : customDot,

        corner:
            customCorner === "preset"
                ? p.corner
                : customCorner,

        color: $("dotColor").value,

        bg: $("bgColor").value,

        gradient: gradient
            ? [
                $("gradient1").value,
                $("gradient2").value
            ]
            : null
    };
}


/* =========================================================
   QR OPTIONS
========================================================= */

function qrOptions(data) {

    const p = currentPreset();

    const size =
        Number($("qrSize").value);

    const margin =
        Number($("qrMargin").value);

    const dots = {
        color: p.color,
        type: p.dots
    };

    if (p.gradient) {

        dots.gradient = {
            type: "linear",
            rotation: 0,

            colorStops: [
                {
                    offset: 0,
                    color: p.gradient[0]
                },
                {
                    offset: 1,
                    color: p.gradient[1]
                }
            ]
        };
    }

    const logo =
        logoData &&
        !$("removeLogo").checked
            ? logoData
            : undefined;

    return {

        width: size,
        height: size,

        typeNumber: 0,

        data,

        margin,

        qrOptions: {
            errorCorrectionLevel:
                $("errorLevel").value
        },

        backgroundOptions: {
            color: p.bg
        },

        dotsOptions: dots,

        cornersSquareOptions: {
            type: p.corner,
            color: p.color
        },

        cornersDotOptions: {
            type:
                p.corner === "dot"
                    ? "dot"
                    : "square",

            color: p.color
        },

        image: logo,

        imageOptions: {
            hideBackgroundDots: true,
            imageSize:
                Number(
                    $("logoSize").value
                ) / 100,
            margin: 4,
            crossOrigin: "anonymous"
        }
    };
}


/* =========================================================
   FRAME
========================================================= */

function frameClass() {

    const v =
        $("frameStyle").value;

    return v === "none"
        ? ""
        : `frame-${v}`;
}


/* =========================================================
   CREATE QR PREVIEW
========================================================= */

function makePreview() {

    const stage = $("qrStage");

    stage.innerHTML = "";

    const wrap =
        document.createElement("div");

    wrap.className =
        `qr-output ${frameClass()}`;

    wrap.id = "qrOutput";


    const holder =
        document.createElement("div");

    holder.id = "qrCanvas";

    wrap.appendChild(holder);


    if (
        $("frameStyle").value !== "none"
    ) {

        const caption =
            document.createElement("div");

        caption.className =
            "frame-caption";

        caption.textContent =
            $("frameText").value.trim() ||
            "SCAN ME";

        wrap.appendChild(caption);
    }


    stage.appendChild(wrap);


    qr = new QRCodeStyling(
        qrOptions(qrData)
    );

    qr.append(holder);


    $("status").textContent =
        "Generated";

    $("status").style.color =
        "#059669";


    $("previewType").textContent =
        labels[$("qrType").value] ||
        "QR code";


    $("previewSize").textContent =
        `${$("qrSize").value} × ${
            $("qrSize").value
        }`;


    [
        "downloadBtn",
        "copyDataBtn",
        "copyImageBtn",
        "printBtn"
    ].forEach(
        (id) => {
            $(id).disabled = false;
        }
    );
}


/* =========================================================
   GENERATE QR
========================================================= */

function generate() {

    if (
        typeof QRCodeStyling ===
        "undefined"
    ) {

        showToast(
            "Library not loaded",
            "Please check your internet connection and refresh."
        );

        return;
    }


    const data = buildData();

    if (!data) {
        return;
    }


    qrData = data;


    try {

        makePreview();

        showToast(
            "QR code generated",
            "Your QR code is ready to download."
        );

    } catch (e) {

        console.error(e);

        showToast(
            "Could not generate QR",
            "Check your input or try a shorter value."
        );
    }
}


/* =========================================================
   GENERATE BUTTON
========================================================= */

$("generateBtn")
    .addEventListener(
        "click",
        generate
    );


/* =========================================================
   QR TYPE CHANGE
========================================================= */

$("qrType")
    .addEventListener(
        "change",
        () => {

            renderFields();
            clearQR();
        }
    );


/* =========================================================
   CLEAR QR
========================================================= */

function clearQR() {

    qr = null;
    qrData = "";

    $("qrStage").innerHTML = `
        <div class="placeholder">
            <i class="fa-solid fa-qrcode"></i>

            <p>
                Your QR preview will appear here
            </p>
        </div>
    `;

    $("status").textContent =
        "Waiting";

    $("previewType").textContent =
        "No QR generated";


    [
        "downloadBtn",
        "copyDataBtn",
        "copyImageBtn",
        "printBtn"
    ].forEach(
        (id) => {
            $(id).disabled = true;
        }
    );
}


/* =========================================================
   APPLY PRESET
========================================================= */

function applyPreset() {

    const p =
        presets[$("designPreset").value] ||
        presets.classic;


    $("dotColor").value =
        p.color;

    $("bgColor").value =
        p.bg;


    $("dotColorText").textContent =
        p.color;

    $("bgColorText").textContent =
        p.bg;


    $("dotStyle").value =
        "preset";

    $("cornerStyle").value =
        "preset";


    if (p.gradient) {

        $("useGradient").checked =
            true;

        $("gradient1").value =
            p.gradient[0];

        $("gradient2").value =
            p.gradient[1];

    } else {

        $("useGradient").checked =
            false;
    }


    $("gradientFields").hidden =
        !$("useGradient").checked;
}


/* =========================================================
   DESIGN SETTINGS
========================================================= */

$("designPreset")
    .addEventListener(
        "change",
        () => {

            applyPreset();

            if (qrData) {
                generateFromExisting();
            }
        }
    );


[
    "dotStyle",
    "cornerStyle",
    "dotColor",
    "bgColor",
    "useGradient",
    "gradient1",
    "gradient2",
    "qrSize",
    "qrMargin",
    "errorLevel",
    "logoSize",
    "frameStyle",
    "frameText",
    "removeLogo"
].forEach((id) => {

    $(id).addEventListener(
        "input",
        () => {

            if (id === "dotColor") {
                $("dotColorText").textContent =
                    $(id).value;
            }

            if (id === "bgColor") {
                $("bgColorText").textContent =
                    $(id).value;
            }

            if (id === "qrSize") {
                $("sizeText").textContent =
                    $(id).value + " px";
            }

            if (id === "qrMargin") {
                $("marginText").textContent =
                    $(id).value + " px";
            }

            if (id === "logoSize") {
                $("logoSizeText").textContent =
                    $(id).value + "%";
            }

            if (id === "useGradient") {
                $("gradientFields").hidden =
                    !$(id).checked;
            }

            if (qrData) {
                generateFromExisting();
            }
        }
    );


    $(id).addEventListener(
        "change",
        () => {

            if (qrData) {
                generateFromExisting();
            }
        }
    );
});


function generateFromExisting() {

    if (!qrData) {
        return;
    }

    try {

        makePreview();

    } catch (e) {

        console.error(e);
    }
}


/* =========================================================
   CUSTOM COLOR RESET
========================================================= */

$("dotColor")
    .addEventListener(
        "input",
        () => {
            $("designPreset").value =
                "classic";
        }
    );


$("bgColor")
    .addEventListener(
        "input",
        () => {
            $("designPreset").value =
                "classic";
        }
    );


/* =========================================================
   LOGO UPLOAD
========================================================= */

$("logoUpload")
    .addEventListener(
        "change",
        (e) => {

            const file =
                e.target.files[0];

            if (!file) {
                return;
            }


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                showToast(
                    "Invalid file",
                    "Please select an image file."
                );

                return;
            }


            if (
                file.size >
                2 * 1024 * 1024
            ) {

                showToast(
                    "Image too large",
                    "Please use a logo smaller than 2 MB."
                );

                e.target.value = "";

                return;
            }


            const reader =
                new FileReader();


            reader.onload = () => {

                logoData =
                    reader.result;


                if (qrData) {
                    generateFromExisting();
                }


                showToast(
                    "Logo loaded",
                    "Your logo has been added to the QR preview."
                );
            };


            reader.readAsDataURL(file);
        }
    );


/* =========================================================
   DOWNLOAD QR
========================================================= */

$("downloadBtn")
    .addEventListener(
        "click",
        async () => {

            if (!qr) {
                return;
            }

            try {

                await qr.download({
                    name: "qrgen-code",
                    extension:
                        $("fileFormat").value
                });


                showToast(
                    "Download started",
                    "Your QR file is being downloaded."
                );

            } catch (e) {

                console.error(e);

                showToast(
                    "Download failed",
                    "Try PNG or remove the logo and retry."
                );
            }
        }
    );


/* =========================================================
   COPY QR DATA
========================================================= */

$("copyDataBtn")
    .addEventListener(
        "click",
        async () => {

            if (!qrData) {
                return;
            }

            try {

                await navigator.clipboard
                    .writeText(qrData);

                showToast(
                    "Copied",
                    "QR content copied to clipboard."
                );

            } catch (e) {

                showToast(
                    "Copy blocked",
                    "Clipboard access needs a secure browser context."
                );
            }
        }
    );


/* =========================================================
   COPY QR IMAGE
========================================================= */

$("copyImageBtn")
    .addEventListener(
        "click",
        async () => {

            if (!qr) {
                return;
            }

            try {

                const blob =
                    await qr.getRawData(
                        "png"
                    );


                if (
                    !navigator.clipboard ||
                    !window.ClipboardItem
                ) {

                    throw new Error(
                        "Clipboard image unsupported"
                    );
                }


                await navigator.clipboard.write([
                    new ClipboardItem({
                        "image/png": blob
                    })
                ]);


                showToast(
                    "QR copied",
                    "QR image copied to clipboard."
                );

            } catch (e) {

                showToast(
                    "Image copy unavailable",
                    "Use Download PNG instead. Clipboard image support varies by browser."
                );
            }
        }
    );


/* =========================================================
   PRINT QR
========================================================= */

$("printBtn")
    .addEventListener(
        "click",
        async () => {

            if (!qr) {
                return;
            }

            try {

                const blob =
                    await qr.getRawData(
                        "png"
                    );

                const url =
                    URL.createObjectURL(
                        blob
                    );


                const w =
                    window.open(
                        "",
                        "_blank"
                    );


                if (!w) {

                    showToast(
                        "Pop-up blocked",
                        "Allow pop-ups to print the QR code."
                    );

                    URL.revokeObjectURL(
                        url
                    );

                    return;
                }


                w.document.write(`
                    <html>

                        <head>
                            <title>
                                Print QR Code
                            </title>

                            <style>

                                body {
                                    font-family: Arial;
                                    text-align: center;
                                    padding: 35px;
                                }

                                img {
                                    max-width: 80vw;
                                    max-height: 75vh;
                                }

                                h2 {
                                    font-size: 18px;
                                }

                            </style>
                        </head>

                        <body>

                            <h2>
                                ${
                                    esc(
                                        $("frameText")
                                            .value ||
                                        "QR Code"
                                    )
                                }
                            </h2>

                            <img
                                src="${url}"
                                onload="
                                    setTimeout(
                                        () => window.print(),
                                        300
                                    )
                                "
                            >

                        </body>

                    </html>
                `);


                w.document.close();


                setTimeout(
                    () => {
                        URL.revokeObjectURL(
                            url
                        );
                    },
                    60000
                );

            } catch (e) {

                showToast(
                    "Print failed",
                    "Please download the QR as PNG and print it."
                );
            }
        }
    );


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

$("themeBtn")
    .addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            const dark =
                document.body.classList.contains(
                    "dark"
                );


            localStorage.setItem(
                "qrgen-theme",
                dark
                    ? "dark"
                    : "light"
            );


            $("themeBtn").innerHTML =
                dark
                    ? '<i class="fa-solid fa-sun"></i>'
                    : '<i class="fa-solid fa-moon"></i>';
        }
    );


/* =========================================================
   LOAD SAVED THEME
========================================================= */

if (
    localStorage.getItem(
        "qrgen-theme"
    ) === "dark"
) {

    document.body.classList.add(
        "dark"
    );

    $("themeBtn").innerHTML =
        '<i class="fa-solid fa-sun"></i>';
}


/* =========================================================
   MOBILE MENU
========================================================= */

$("menuBtn")
    .addEventListener(
        "click",
        () => {

            $("mainNav").classList.toggle(
                "open"
            );


            $("menuBtn").innerHTML =
                $("mainNav").classList.contains(
                    "open"
                )
                    ? '<i class="fa-solid fa-xmark"></i>'
                    : '<i class="fa-solid fa-bars"></i>';
        }
    );


document
    .querySelectorAll(
        "#mainNav a"
    )
    .forEach(
        (a) =>
            a.addEventListener(
                "click",
                () =>
                    $("mainNav").classList.remove(
                        "open"
                    )
            )
    );


/* =========================================================
   DESIGN PRESET GALLERY
========================================================= */

function renderGallery() {

    const names =
        Object.keys(presets);


    /* ---------- Swatches ---------- */

    $("designSwatches").innerHTML =
        names
            .slice(0, 8)
            .map(
                (k) => {

                    const preset =
                        presets[k];

                    const background =
                        preset.gradient
                            ? `linear-gradient(
                                90deg,
                                ${preset.gradient.join(",")}
                              )`
                            : preset.color;

                    return `
                        <span
                            class="swatch"
                            title="${k}"
                            style="
                                background:${background};
                            "
                        ></span>
                    `;
                }
            )
            .join("");


    /* ---------- Preset Cards ---------- */

    $("presetGallery").innerHTML =
        names
            .map(
                (k, i) => {

                    const p =
                        presets[k];

                    const bg =
                        p.bg;

                    const fg =
                        p.gradient
                            ? `linear-gradient(
                                120deg,
                                ${p.gradient.join(",")}
                              )`
                            : p.color;


                    const title =
                        k === "classyRounded"
                            ? "Classy Rounded"
                            : k[0].toUpperCase() +
                              k.slice(1);


                    return `
                        <button
                            class="preset-card"
                            type="button"
                            data-preset="${k}"
                        >

                            <span
                                class="preset-sample"
                                style="
                                    background:${bg};
                                    color:${p.color};
                                "
                            >

                                <i
                                    class="fa-solid fa-qrcode"
                                    style="
                                        background:${fg};
                                        background-clip:text;
                                        -webkit-background-clip:text;
                                        color:transparent;
                                    "
                                ></i>

                            </span>


                            <b>
                                ${String(i + 1).padStart(2, "0")}
                                ·
                                ${title}
                            </b>


                            <small>
                                Click to apply preset
                            </small>

                        </button>
                    `;
                }
            )
            .join("");


    /* ---------- Preset Click ---------- */

    document
        .querySelectorAll(
            ".preset-card"
        )
        .forEach(
            (btn) => {

                btn.addEventListener(
                    "click",
                    () => {

                        $("designPreset").value =
                            btn.dataset.preset;


                        applyPreset();


                        document
                            .querySelector(
                                "#generator"
                            )
                            .scrollIntoView({
                                behavior: "smooth"
                            });


                        if (qrData) {
                            generateFromExisting();
                        }
                    }
                );
            }
        );
}


/* =========================================================
   INITIAL VALUES
========================================================= */

$("year").textContent =
    new Date().getFullYear();


$("qrSize")
    .addEventListener(
        "input",
        () => {

            $("sizeText").textContent =
                $("qrSize").value +
                " px";
        }
    );


$("qrMargin")
    .addEventListener(
        "input",
        () => {

            $("marginText").textContent =
                $("qrMargin").value +
                " px";
        }
    );


$("logoSize")
    .addEventListener(
        "input",
        () => {

            $("logoSizeText").textContent =
                $("logoSize").value +
                "%";
        }
    );


/* =========================================================
   INITIALIZE APPLICATION
========================================================= */

renderFields();
renderGallery();
applyPreset();