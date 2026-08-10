const motionState = {
  initialized: false,
  cleanup: [],
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function addScrollReveals() {
  const selectors = [
    "main > section",
    ".internal-paths-grid > a",
    ".svc-option",
    ".abt-responsibility-grid article",
    ".hiw-steps article",
    ".con-help-grid article",
    ".wrk-system-grid article",
    ".legal-section",
    ".legal-data-grid article",
  ];
  const firstMainSection = document.querySelector("main > section");
  const items = [
    ...new Set(document.querySelectorAll(selectors.join(","))),
  ].filter((item) => item !== firstMainSection);
  items.forEach((item, index) => {
    item.classList.add("motion-reveal");
    item.style.setProperty("--reveal-delay", `${(index % 4) * 55}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        window.setTimeout(() => {
          entry.target.style.willChange = "auto";
        }, 950);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 },
  );
  items.forEach((item) => observer.observe(item));
  motionState.cleanup.push(() => observer.disconnect());
}

function addPointerDepth() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  const targets = document.querySelectorAll(
    ".visual, .hero-art, .abt-hero-art, .svc-hero-art, .hiw-hero-art, .con-intro-art, .wrk-hero-art, .case-summary, .legal-hero-art",
  );

  targets.forEach((target) => {
    target.classList.add("motion-depth");
    const layers = target.querySelectorAll(":scope > .motion-layer");
    const move = (event) => {
      const box = target.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      target.style.setProperty("--depth-x", x.toFixed(3));
      target.style.setProperty("--depth-y", y.toFixed(3));
      target.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(1)}%`);
      target.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(1)}%`);
      layers.forEach((layer, index) => {
        const distance = 4 + index * 2.4;
        layer.style.setProperty("--layer-x", `${(x * distance).toFixed(2)}px`);
        layer.style.setProperty("--layer-y", `${(y * distance).toFixed(2)}px`);
      });
    };
    const reset = () => {
      target.style.setProperty("--depth-x", 0);
      target.style.setProperty("--depth-y", 0);
      target.style.setProperty("--glow-x", "50%");
      target.style.setProperty("--glow-y", "50%");
      layers.forEach((layer) => {
        layer.style.setProperty("--layer-x", "0px");
        layer.style.setProperty("--layer-y", "0px");
      });
    };
    target.addEventListener("pointermove", move, { passive: true });
    target.addEventListener("pointerleave", reset, { passive: true });
    motionState.cleanup.push(() => {
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerleave", reset);
    });
  });
}

function addLivingArtwork() {
  const artworks = document.querySelectorAll(
    ".visual, .abt-hero-art, .svc-hero-art, .hiw-hero-art, .con-intro-art, .wrk-hero-art, .case-summary, .legal-hero-art",
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) =>
        entry.target.classList.toggle("artwork-live", entry.isIntersecting),
      );
    },
    { threshold: 0.08 },
  );

  artworks.forEach((artwork) => {
    [...artwork.children].forEach((layer, index) => {
      if (layer.classList.contains("weeboo-motion-canvas")) return;
      layer.classList.add("motion-layer");
      layer.style.setProperty("--layer-float", `${3 + (index % 4) * 1.6}px`);
      layer.style.setProperty(
        "--layer-duration",
        `${4.2 + (index % 5) * 0.65}s`,
      );
      layer.style.setProperty("--layer-delay", `${index * -0.47}s`);
    });
    observer.observe(artwork);
  });
  motionState.cleanup.push(() => observer.disconnect());
}

function animateArtworkContents() {
  const artworks = document.querySelectorAll(
    ".visual, .abt-hero-art, .svc-hero-art, .hiw-hero-art, .con-intro-art, .wrk-hero-art, .case-summary, .legal-hero-art",
  );

  const contentSelectors = [
    ".process-item",
    ".browser-main h2",
    ".browser-main p",
    ".browser-main button",
    ".abt-brief-card > *",
    ".abt-discipline",
    ".abt-result-card section > *",
    ".svc-idea-note > *",
    ".svc-site-card > div > *",
    ".hiw-flow-card > *",
    ".hiw-mini-site > *",
    ".con-message > *",
    ".wrk-archive-card > *",
    ".wrk-code-card > *",
    ".legal-doc > p",
    ".legal-doc > strong",
    ".case-summary dl > div",
  ];

  artworks.forEach((artwork) => {
    const content = artwork.querySelectorAll(contentSelectors.join(","));
    content.forEach((item, index) => {
      item.classList.add("motion-ui-item");
      item.style.setProperty("--ui-delay", `${(index % 8) * 0.18}s`);
    });

    artwork
      .querySelectorAll(
        "pre, .con-code, .privacy-code, .wrk-code-card, .legal-doc strong",
      )
      .forEach((code, index) => {
        code.classList.add("motion-ui-code");
        code.style.setProperty("--code-delay", `${index * 0.45}s`);
      });

    artwork.querySelectorAll("header > i").forEach((light, index) => {
      light.classList.add("motion-ui-light");
      light.style.setProperty("--light-delay", `${index * 0.28}s`);
    });

    artwork
      .querySelectorAll(
        ".browser-main button, .abt-result-card section > b, .svc-site-card > div > b, .hiw-mini-site > b",
      )
      .forEach((action) => action.classList.add("motion-ui-action"));

    artwork
      .querySelectorAll(".editor pre > b, .svc-code-card pre > b")
      .forEach((line, index) => {
        line.classList.add("motion-code-line");
        line.style.setProperty("--line-delay", `${index * 0.24}s`);
      });
  });

  document
    .querySelectorAll(
      ".visual .browser, .abt-result-card, .svc-site-card, .hiw-mini-site",
    )
    .forEach((screen, index) => {
      if (screen.querySelector(":scope > .motion-ui-cursor")) return;
      const cursor = document.createElement("span");
      cursor.className = "motion-ui-cursor";
      cursor.setAttribute("aria-hidden", "true");
      cursor.style.setProperty("--cursor-delay", `${index * -1.15}s`);
      screen.append(cursor);
    });
}

function addInteractiveCards() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  const cards = document.querySelectorAll(
    ".internal-paths-grid > a, .svc-option, .wrk-gallery-card, .legal-data-grid article",
  );
  cards.forEach((card) => {
    card.classList.add("motion-card");
    const move = (event) => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      card.style.setProperty("--card-rx", `${(-y * 4.5).toFixed(2)}deg`);
      card.style.setProperty("--card-ry", `${(x * 4.5).toFixed(2)}deg`);
      card.style.setProperty(
        "--card-shine-x",
        `${((x + 0.5) * 100).toFixed(1)}%`,
      );
      card.style.setProperty(
        "--card-shine-y",
        `${((y + 0.5) * 100).toFixed(1)}%`,
      );
    };
    const reset = () => {
      card.style.setProperty("--card-rx", "0deg");
      card.style.setProperty("--card-ry", "0deg");
    };
    card.addEventListener("pointermove", move, { passive: true });
    card.addEventListener("pointerleave", reset, { passive: true });
    motionState.cleanup.push(() => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", reset);
    });
  });
}

function addCodeActivity() {
  document
    .querySelectorAll(
      ".con-code, .legal-doc strong, .wrk-final-code, .case-code, .tech-editor",
    )
    .forEach((item) => item.classList.add("motion-code"));
}

function createHeroCanvas() {
  const surface = document.querySelector("main > section");
  if (!surface || surface.querySelector(".weeboo-motion-canvas")) return;

  const saveData = navigator.connection?.saveData;
  if (saveData) {
    document.documentElement.classList.add("motion-lite");
    return;
  }

  surface.classList.add("motion-surface");
  const canvas = document.createElement("canvas");
  canvas.className = "weeboo-motion-canvas";
  canvas.setAttribute("aria-hidden", "true");
  surface.prepend(canvas);

  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;
  const darkSurface =
    surface.classList.contains("legal-hero") ||
    getComputedStyle(surface).color === "rgb(255, 255, 255)";
  let width = 0;
  let height = 0;
  let frame = 0;
  let running = false;
  let visible = true;
  let lastDraw = 0;
  let pointer = { x: -1000, y: -1000, active: false };
  let nodes = [];
  const lowPower =
    window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 720;
  const frameInterval = lowPower ? 1000 / 30 : 0;

  const resize = () => {
    const box = surface.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.25);
    width = Math.max(1, box.width);
    height = Math.max(1, box.height);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = lowPower
      ? Math.max(10, Math.min(14, Math.round(width / 54)))
      : Math.max(14, Math.min(26, Math.round(width / 56)));
    nodes = Array.from({ length: count }, (_, index) => ({
      x: (width / count) * index + Math.random() * 45,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      size: 1 + Math.random() * 1.6,
    }));
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    const lineColor = darkSurface ? "86, 202, 255" : "24, 151, 218";
    const nodeColor = darkSurface ? "121, 220, 255" : "17, 137, 211";

    nodes.forEach((node) => {
      if (pointer.active) {
        const dx = node.x - pointer.x;
        const dy = node.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 120 && distance > 0) {
          node.x += (dx / distance) * 0.45;
          node.y += (dy / distance) * 0.45;
        }
      }
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < -5) node.x = width + 5;
      if (node.x > width + 5) node.x = -5;
      if (node.y < -5) node.y = height + 5;
      if (node.y > height + 5) node.y = -5;
    });

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const distance = Math.hypot(
          nodes[i].x - nodes[j].x,
          nodes[i].y - nodes[j].y,
        );
        if (distance > 132) continue;
        context.strokeStyle = `rgba(${lineColor}, ${(1 - distance / 132) * 0.16})`;
        context.lineWidth = 0.7;
        context.beginPath();
        context.moveTo(nodes[i].x, nodes[i].y);
        context.lineTo(nodes[j].x, nodes[j].y);
        context.stroke();
      }
    }

    nodes.forEach((node) => {
      context.fillStyle = `rgba(${nodeColor}, 0.34)`;
      context.beginPath();
      context.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      context.fill();
    });
  };

  const animate = (time) => {
    if (!running) return;
    if (!frameInterval || time - lastDraw >= frameInterval) {
      draw();
      lastDraw = time;
    }
    frame = requestAnimationFrame(animate);
  };
  const stop = () => {
    if (!running) return;
    running = false;
    cancelAnimationFrame(frame);
  };
  const syncAnimation = () => {
    if (!visible || document.hidden) {
      stop();
      return;
    }
    if (running) return;
    running = true;
    lastDraw = 0;
    frame = requestAnimationFrame(animate);
  };
  const pointerMove = (event) => {
    const box = canvas.getBoundingClientRect();
    pointer = {
      x: event.clientX - box.left,
      y: event.clientY - box.top,
      active: true,
    };
  };
  const pointerLeave = () => {
    pointer.active = false;
  };
  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    },
    { threshold: 0 },
  );
  const resizeObserver = new ResizeObserver(resize);

  resize();
  visibilityObserver.observe(surface);
  resizeObserver.observe(surface);
  document.addEventListener("visibilitychange", syncAnimation);
  surface.addEventListener("pointermove", pointerMove, { passive: true });
  surface.addEventListener("pointerleave", pointerLeave, { passive: true });
  syncAnimation();

  motionState.cleanup.push(() => {
    stop();
    visibilityObserver.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener("visibilitychange", syncAnimation);
    surface.removeEventListener("pointermove", pointerMove);
    surface.removeEventListener("pointerleave", pointerLeave);
    canvas.remove();
  });
}

export function initMotion() {
  if (motionState.initialized) return;
  motionState.initialized = true;
  document.documentElement.classList.add("motion-ready");

  if (prefersReducedMotion()) {
    document.documentElement.classList.add("motion-reduced");
    return;
  }

  addScrollReveals();
  addLivingArtwork();
  animateArtworkContents();
  addPointerDepth();
  addInteractiveCards();
  addCodeActivity();
  createHeroCanvas();
}

const startMotion = () => {
  if (document.getElementById("root")) return;
  initMotion();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startMotion, { once: true });
} else {
  startMotion();
}
