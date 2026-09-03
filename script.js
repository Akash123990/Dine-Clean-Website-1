(() => {
  document.documentElement.classList.add("js");

  const whatsappNumber = "918470004450";
  const products = {
    "Dish Wash": {
      id: "dish-wash",
      category: "Kitchen care",
      image: "assets/dineclean-product-collection.png",
      description: "A practical daily-use choice for plates, cookware, utensils, and the kitchen moments that keep everything moving.",
      bestFor: "Dishes, cookware, and everyday kitchen cleanup",
      position: "47% 52%"
    },
    Phenyl: {
      id: "phenyl",
      category: "Floor care",
      image: "assets/dineclean-product-collection.png",
      description: "A straightforward floor-care option for regular cleaning routines and a fresh, clean-feeling finish.",
      bestFor: "Routine floor cleaning in everyday spaces",
      position: "26% 49%"
    },
    "Neem Rose Jasmine Phenyl": {
      id: "neem-rose-jasmine-phenyl",
      category: "Floor care",
      image: "assets/neem-jasmine-rose-front.png",
      description: "A signature 3 x 1 litre combo of Neem, Rose, and Jasmine perfumed floor cleaners. Designed to disinfect, clean, deodorise, and leave a long-lasting fragrance across everyday home surfaces.",
      bestFor: "Floors, bathrooms, kitchens, and toilets",
      position: "center"
    },
    "Floor Cleaner": {
      id: "floor-cleaner",
      category: "Floor care",
      image: "assets/dineclean-product-collection.png",
      description: "For tiled, marble, and commonly used household floor surfaces that benefit from regular attention.",
      bestFor: "Tile, marble, and common floor surfaces",
      position: "16% 64%"
    },
    "Glass Cleaner": {
      id: "glass-cleaner",
      category: "Surface care",
      image: "assets/dineclean-product-collection.png",
      description: "For windows, mirrors, glass tables, and the clear details that help a room feel brighter and more cared for.",
      bestFor: "Mirrors, windows, and glass surfaces",
      position: "73% 43%"
    },
    Freshener: {
      id: "freshener",
      category: "Fresh spaces",
      image: "assets/dineclean-room-freshener.png",
      description: "Shree Ram Darbaar air freshener sprays for frequently used rooms and shared spaces that benefit from a pleasant, welcoming feel.",
      bestFor: "Frequently used home and workplace spaces",
      position: "center"
    },
    "Room Freshener": {
      id: "room-freshener",
      category: "Fresh spaces",
      image: "assets/dineclean-room-freshener.png",
      description: "A 3-in-1 room freshener combo pack for bedrooms, halls, offices, washrooms, reception areas, and fresh first impressions.",
      bestFor: "Rooms, halls, offices, and reception areas",
      position: "center"
    },
    "Tissue Combo": {
      id: "tissue-combo",
      category: "Home essentials",
      image: "assets/dineclean-tissue-combo.png",
      description: "A DineClean 7-in-1 tissue combo pack with tissue boxes, napkins, kitchen roll, and toilet rolls for everyday home and office needs.",
      bestFor: "Homes, offices, washrooms, dining spaces, and everyday use",
      position: "center"
    }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const renderIcons = () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  renderIcons();

  const header = $("#site-header");
  const scrollProgress = $(".scroll-progress span");
  const backToTop = $("[data-back-to-top]");

  const updateScrollState = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;

    header?.classList.toggle("is-scrolled", scrollTop > 12);
    if (scrollProgress) {
      scrollProgress.style.transform = `scaleX(${progress})`;
    }
    backToTop?.classList.toggle("is-visible", scrollTop > 700);
  };

  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState, { passive: true });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const navToggle = $(".nav-toggle");
  const nav = $("#site-nav");

  const setMenu = (isOpen) => {
    nav?.classList.toggle("is-open", isOpen);
    navToggle?.classList.toggle("is-open", isOpen);
    navToggle?.setAttribute("aria-expanded", String(isOpen));
    navToggle?.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  };

  navToggle?.addEventListener("click", () => {
    setMenu(!nav?.classList.contains("is-open"));
  });

  $$(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("click", (event) => {
    if (!nav?.classList.contains("is-open")) return;
    const clickedNav = nav.contains(event.target);
    const clickedToggle = navToggle?.contains(event.target);
    if (!clickedNav && !clickedToggle) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav?.classList.contains("is-open")) {
      setMenu(false);
      navToggle?.focus();
    }
  });

  const navLinks = $$("[data-nav-link]");
  const navSections = navLinks
    .map((link) => $(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && navSections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!active) return;

        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${active.target.id}`);
        });
      },
      { rootMargin: "-36% 0px -56% 0px", threshold: [0.05, 0.2, 0.45] }
    );
    navSections.forEach((section) => navObserver.observe(section));
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = $$('[data-reveal]');
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const countItems = $$("[data-count-to]");
  const animateCount = (item) => {
    const target = Number(item.dataset.countTo || "0");
    if (!target) return;
    if (reducedMotion) {
      item.textContent = String(target);
      return;
    }
    const start = performance.now();
    const duration = 900;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      item.textContent = String(Math.round(target * eased));
      if (progress < 1) window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    countItems.forEach(animateCount);
  } else {
    const countObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    countItems.forEach((item) => countObserver.observe(item));
  }

  const toast = $(".toast");
  let toastTimer;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
  };

  const safeReadList = (key) => {
    try {
      const value = JSON.parse(window.localStorage.getItem(key) || "[]");
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  };

  const safeStoreList = (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // The page remains usable when browser storage is unavailable.
    }
  };

  let savedProducts = safeReadList("dineclean-wishlist").filter((name) => products[name]);
  let enquiryProducts = safeReadList("dineclean-enquiry").filter((name) => products[name]);
  const productCards = $$("[data-product-card]");

  $$("[data-product-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.productFilter || "all";
      $$("[data-product-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
      productCards.forEach((card) => {
        const isMatch = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-filtered-out", !isMatch);
      });
      const visibleCount = productCards.filter((card) => !card.classList.contains("is-filtered-out")).length;
      showToast(filter === "all" ? "Showing all DineClean products." : `Showing ${visibleCount} ${filter} product${visibleCount === 1 ? "" : "s"}.`);
    });
  });

  const productDialog = $("#product-dialog");
  const searchDialog = $("#search-dialog");
  const enquiryDialog = $("#enquiry-dialog");

  const openDialog = (dialog) => {
    if (!dialog?.open) dialog?.showModal();
  };

  const closeDialog = (dialog) => {
    if (dialog?.open) dialog.close();
  };

  $$('[data-close-dialog]').forEach((button) => {
    button.addEventListener("click", () => closeDialog(button.closest("dialog")));
  });

  $$('[data-explore-products]').forEach((button) => {
    button.addEventListener("click", () => {
      window.setTimeout(() => $("#products")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
    });
  });

  $$('dialog').forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog(dialog);
    });
  });

  const updateWishlistButtons = () => {
    $$('[data-wishlist]').forEach((button) => {
      const productName = button.dataset.wishlist;
      const saved = savedProducts.includes(productName);
      button.classList.toggle("is-saved", saved);
      button.setAttribute("aria-pressed", String(saved));
      button.setAttribute("aria-label", `${saved ? "Remove" : "Save"} ${productName}`);
      button.setAttribute("title", `${saved ? "Remove" : "Save"} ${productName}`);
    });
  };

  updateWishlistButtons();

  $$('[data-wishlist]').forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.dataset.wishlist;
      if (!productName) return;
      if (savedProducts.includes(productName)) {
        savedProducts = savedProducts.filter((name) => name !== productName);
        showToast(`${productName} removed from saved products.`);
      } else {
        savedProducts = [...savedProducts, productName];
        showToast(`${productName} saved for later.`);
      }
      safeStoreList("dineclean-wishlist", savedProducts);
      updateWishlistButtons();
    });
  });

  const dialogProductImage = $("#dialog-product-image");
  const dialogProductTitle = $("#product-dialog-title");
  const dialogProductCategory = $("#dialog-category");
  const dialogProductDescription = $("#dialog-product-description");
  const dialogProductUse = $("#dialog-product-use");
  const dialogAddButton = $("#dialog-add-button");
  let selectedDialogProduct = "";

  const showProductDetails = (productName) => {
    const product = products[productName];
    if (!product || !productDialog) return;
    selectedDialogProduct = productName;
    dialogProductTitle.textContent = productName;
    dialogProductCategory.innerHTML = '<span></span>' + product.category;
    dialogProductDescription.textContent = product.description;
    dialogProductUse.textContent = product.bestFor;
    dialogProductImage.alt = `${productName} product presentation`;
    dialogProductImage.src = product.image || "assets/dineclean-product-collection.png";
    dialogProductImage.style.objectPosition = product.position;
    dialogProductImage.classList.toggle("is-contain", product.position === "center");
    openDialog(productDialog);
  };

  $$('[data-quick-view]').forEach((button) => {
    button.addEventListener("click", () => showProductDetails(button.dataset.quickView));
  });

  const enquiryItems = $("#enquiry-items");
  const enquiryEmpty = $("#enquiry-empty");
  const enquiryFooter = $("#enquiry-footer");
  const enquiryCounts = $$('[data-enquiry-count]');

  const renderEnquiry = () => {
    const hasProducts = enquiryProducts.length > 0;
    enquiryCounts.forEach((count) => {
      count.textContent = String(enquiryProducts.length);
      count.hidden = !hasProducts;
    });

    if (enquiryItems) {
      enquiryItems.innerHTML = enquiryProducts
        .map((productName) => {
          const product = products[productName];
          return `<div class="enquiry-item"><div><strong>${productName}</strong><span>${product.category}</span></div><button class="remove-enquiry" type="button" data-remove-enquiry="${productName}" aria-label="Remove ${productName}"><i data-lucide="trash-2" aria-hidden="true"></i> Remove</button></div>`;
        })
        .join("");
    }

    if (enquiryEmpty) enquiryEmpty.hidden = hasProducts;
    if (enquiryFooter) enquiryFooter.hidden = !hasProducts;
    renderIcons();
  };

  const addToEnquiry = (productName, { open = false } = {}) => {
    if (!products[productName]) return;
    if (enquiryProducts.includes(productName)) {
      showToast(`${productName} is already in your enquiry list.`);
    } else {
      enquiryProducts = [...enquiryProducts, productName];
      safeStoreList("dineclean-enquiry", enquiryProducts);
      renderEnquiry();
      showToast(`${productName} added to your enquiry list.`);
    }
    if (open) openDialog(enquiryDialog);
  };

  renderEnquiry();

  $$('[data-add-enquiry]').forEach((button) => {
    button.addEventListener("click", () => addToEnquiry(button.dataset.addEnquiry));
  });

  dialogAddButton?.addEventListener("click", () => {
    if (!selectedDialogProduct) return;
    addToEnquiry(selectedDialogProduct, { open: true });
    closeDialog(productDialog);
  });

  enquiryItems?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-enquiry]");
    if (!button) return;
    const productName = button.dataset.removeEnquiry;
    enquiryProducts = enquiryProducts.filter((name) => name !== productName);
    safeStoreList("dineclean-enquiry", enquiryProducts);
    renderEnquiry();
    showToast(`${productName} removed from your enquiry list.`);
  });

  $$('[data-open-enquiry]').forEach((button) => {
    button.addEventListener("click", () => openDialog(enquiryDialog));
  });

  const sendEnquiry = () => {
    if (!enquiryProducts.length) {
      showToast("Add one or more products before sending your enquiry.");
      return;
    }
    const names = enquiryProducts.map((name) => `- ${name}`).join("\n");
    const message = `Hello DineClean,\n\nI would like to enquire about:\n${names}\n\nPlease share the latest pack options, availability, and price information.\n\nThank you.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  };

  $('[data-send-enquiry]')?.addEventListener("click", sendEnquiry);

  const searchInput = $("#product-search");
  const searchResults = $("#search-results");

  const renderSearch = (term = "") => {
    if (!searchResults) return;
    const normalizedTerm = term.trim().toLowerCase();
    const matches = Object.entries(products).filter(([name, product]) => {
      const text = `${name} ${product.category} ${product.description}`.toLowerCase();
      return !normalizedTerm || text.includes(normalizedTerm);
    });

    if (!matches.length) {
      searchResults.innerHTML = '<p class="search-empty">No matching product found. Try kitchen, floor, glass, or freshener.</p>';
      return;
    }

    searchResults.innerHTML = matches
      .map(([name, product]) => `<button class="search-result" type="button" data-search-result="${name}"><span><strong>${name}</strong>${product.category}</span><i data-lucide="arrow-up-right" aria-hidden="true"></i></button>`)
      .join("");
    renderIcons();
  };

  const openSearch = () => {
    renderSearch();
    openDialog(searchDialog);
    window.setTimeout(() => searchInput?.focus(), 0);
  };

  $$('[data-open-search]').forEach((button) => button.addEventListener("click", openSearch));

  searchInput?.addEventListener("input", () => renderSearch(searchInput.value));

  searchResults?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-search-result]");
    if (!button) return;
    const product = products[button.dataset.searchResult];
    const productCard = product ? $(`#${product.id}`) : null;
    closeDialog(searchDialog);
    productCard?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => productCard?.querySelector("[data-quick-view]")?.focus({ preventScroll: true }), 600);
  });

  const faqItems = $$(".faq-list details");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) otherItem.open = false;
      });
    });
  });

  const contactForm = $("#contact-form");
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const requiredFields = ["name", "phone", "product"];
    let hasError = false;

    requiredFields.forEach((fieldName) => {
      const field = contactForm.elements.namedItem(fieldName);
      const invalid = !String(formData.get(fieldName) || "").trim();
      field?.setAttribute("aria-invalid", String(invalid));
      if (invalid) hasError = true;
    });

    if (hasError) {
      showToast("Please complete your name, phone number, and product choice.");
      return;
    }

    const name = String(formData.get("name")).trim();
    const phone = String(formData.get("phone")).trim();
    const product = String(formData.get("product")).trim();
    const details = String(formData.get("message") || "").trim();
    const message = `Hello DineClean,\n\nMy name is ${name}.\nPhone: ${phone}\nI am interested in: ${product}${details ? `\nDetails: ${details}` : ""}\n\nPlease share the latest information. Thank you.`;
    const submitButton = $(".form-submit", contactForm);
    const originalContent = submitButton?.innerHTML;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Opening WhatsApp...";
    }

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    window.setTimeout(() => {
      if (!submitButton) return;
      submitButton.disabled = false;
      submitButton.innerHTML = originalContent;
      renderIcons();
    }, 700);
  });

  $$('input, select, textarea', contactForm || document).forEach((field) => {
    field.addEventListener("input", () => field.removeAttribute("aria-invalid"));
    field.addEventListener("change", () => field.removeAttribute("aria-invalid"));
  });

  const newsletterForm = $("#newsletter-form");
  newsletterForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailInput = $("input[type='email']", newsletterForm);
    if (!emailInput?.value.trim() || !emailInput.checkValidity()) {
      emailInput?.focus();
      return;
    }
    const subject = "DineClean updates";
    const body = `Hello DineClean,\n\nPlease keep me informed about product information and updates.\n\nMy email: ${emailInput.value.trim()}`;
    window.location.href = `mailto:apenterprisescontact@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showToast("Opening your email app to contact DineClean.");
  });

  const year = $("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
