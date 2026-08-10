const projectForm = document.querySelector("#project-form");
const formStatus = document.querySelector("#form-status");

if (projectForm && formStatus) {
  const submitButton = projectForm.querySelector('button[type="submit"]');
  const startedAt = projectForm.elements.namedItem("form_started_at");
  const statusIcon = document.querySelector("#form-status-icon");
  const statusTitle = document.querySelector("#form-status-title");
  const statusMessage = document.querySelector("#form-status-message");
  const emailFallback = document.querySelector("#form-email-fallback");
  const originalButton = submitButton.innerHTML;

  const resetTimer = () => {
    startedAt.value = String(Date.now());
  };
  resetTimer();

  const showStatus = ({ state, icon, title, message, fallback = false }) => {
    formStatus.dataset.state = state;
    formStatus.hidden = false;
    statusIcon.textContent = icon;
    statusTitle.textContent = title;
    statusMessage.textContent = message;
    emailFallback.hidden = !fallback;
  };

  projectForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!projectForm.reportValidity()) return;

    const data = new FormData(projectForm);
    const payload = Object.fromEntries(data.entries());
    submitButton.disabled = true;
    submitButton.innerHTML = "Sending securely… <span>↗</span>";
    showStatus({
      state: "sending",
      icon: "···",
      title: "Sending your request",
      message: "Please keep this page open for a moment.",
    });

    try {
      const response = await fetch("/api/project-requests", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "The request could not be sent.");

      projectForm.reset();
      resetTimer();
      showStatus({
        state: "success",
        icon: "✓",
        title: "Your request has been received.",
        message: result.reference
          ? `Your reference is ${result.reference}. We will contact you by email.`
          : "We will contact you by email.",
      });
    } catch (error) {
      showStatus({
        state: "error",
        icon: "!",
        title: "We could not send the request.",
        message: error.message || "Please try again or email our team directly.",
        fallback: true,
      });
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButton;
    }
  });
}
