const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

function buildEnquiryMailto(form, recipient) {
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const email = String(data.get("email") || "").trim();
  const projectType = String(data.get("projectType") || "").trim();
  const message = String(data.get("message") || "").trim();
  const subject = `Website enquiry from ${name || "Chatham Limited website"}`;
  const body = [
    "New website enquiry for Chatham Limited",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Project type: ${projectType}`,
    "",
    "Message:",
    message
  ].join("\n");

  return `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

document.querySelectorAll("[data-enquiry-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const recipient = form.dataset.enquiryEmail || "info@chathamlimited.co.uk";
    const status = form.querySelector("[data-enquiry-status]");

    if (status) {
      status.textContent = "Opening your email app with the enquiry ready to send.";
    }

    window.location.href = buildEnquiryMailto(form, recipient);
  });
});

window.ChathamContact = { buildEnquiryMailto };
