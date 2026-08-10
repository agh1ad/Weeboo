const projectForm = document.querySelector("#project-form");
const formStatus = document.querySelector("#form-status");

if (projectForm && formStatus) {
  const arabic = document.documentElement.lang === "ar";
  const copy = arabic
    ? {
        sendingButton: "جارٍ الإرسال بأمان… <span>↗</span>",
        sendingTitle: "جارٍ إرسال طلبك",
        sendingMessage: "يرجى إبقاء هذه الصفحة مفتوحة للحظات.",
        successTitle: "تم استلام طلبك.",
        reference: (reference) => `رقم طلبك هو ${reference}. سنتواصل معك عبر البريد الإلكتروني.`,
        successMessage: "سنتواصل معك عبر البريد الإلكتروني.",
        errorTitle: "تعذر إرسال الطلب.",
        errorMessage: "يرجى المحاولة مجدداً أو مراسلة فريقنا مباشرة.",
      }
    : {
        sendingButton: "Sending securely… <span>↗</span>",
        sendingTitle: "Sending your request",
        sendingMessage: "Please keep this page open for a moment.",
        successTitle: "Your request has been received.",
        reference: (reference) => `Your reference is ${reference}. We will contact you by email.`,
        successMessage: "We will contact you by email.",
        errorTitle: "We could not send the request.",
        errorMessage: "Please try again or email our team directly.",
      };
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
    submitButton.innerHTML = copy.sendingButton;
    showStatus({
      state: "sending",
      icon: "···",
      title: copy.sendingTitle,
      message: copy.sendingMessage,
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
        title: copy.successTitle,
        message: result.reference
          ? copy.reference(result.reference)
          : copy.successMessage,
      });
    } catch (error) {
      showStatus({
        state: "error",
        icon: "!",
        title: copy.errorTitle,
        message: arabic ? copy.errorMessage : error.message || copy.errorMessage,
        fallback: true,
      });
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButton;
    }
  });
}
