const nav = document.getElementById("nav");

document.getElementById("hamburger")?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(a => {
  a.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

const bookingModal = document.getElementById("bookingModal");
const infoModal = document.getElementById("infoModal");
const infoContent = document.getElementById("infoContent");
const toast = document.getElementById("toast");


/* =====================================
   MODAL
===================================== */

function openModal(m) {
  if (!m) return;

  m.classList.add("open");
  m.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(m) {
  if (!m) return;

  m.classList.remove("open");
  m.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}


document.querySelectorAll("[data-open-booking]").forEach(button => {
  button.addEventListener("click", () => {
    openModal(bookingModal);
  });
});


document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => {
    closeModal(bookingModal);
    closeModal(infoModal);
  });
});


[bookingModal, infoModal].forEach(modal => {

  modal?.addEventListener("click", event => {

    if (event.target === modal) {
      closeModal(bookingModal);
      closeModal(infoModal);
    }

  });

});


document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeModal(bookingModal);
    closeModal(infoModal);
  }

});


/* =====================================
   ZALLAR
===================================== */

const hallInfo = {

  "Asosiy zal":
    "1500 kishigacha mo‘ljallangan katta premium zal. Katta to‘ylar va tantanali marosimlar uchun mos.",

  "VIP zal":
    "500 kishigacha mo‘ljallangan nafis zal. Alohida va premium tadbirlar uchun qulay.",

  "Oila zali":
    "250 kishigacha mo‘ljallangan shinam zal. Oila davrasidagi marosimlar uchun mos.",

  "Kichik zal":
    "150 kishigacha mo‘ljallangan ixcham zal. Kichik tadbirlar va ziyofatlar uchun qulay."

};


document.querySelectorAll("[data-hall]").forEach(button => {

  button.addEventListener("click", () => {

    const hall = button.dataset.hall;

    infoContent.innerHTML = `

      <p class="eyebrow">
        ZAL HAQIDA
      </p>

      <h2>
        ${hall}
      </h2>

      <p style="color:#b8b2a6;line-height:1.8">
        ${hallInfo[hall] || "Premium zal."}
      </p>

      <button
        class="btn btn-gold"
        id="hallBook"
      >
        Shu zalni bron qilish
      </button>

    `;

    openModal(infoModal);


    document.getElementById("hallBook").onclick = () => {

      closeModal(infoModal);

      openModal(bookingModal);

      const hallInput =
        document.querySelector('[name="hall"]');

      if (hallInput) {
        hallInput.value = hall;
      }

    };

  });

});


/* =====================================
   MENYU
===================================== */

document.getElementById("menuBtn")?.addEventListener("click", () => {

  infoContent.innerHTML = `

    <p class="eyebrow">
      HAVAS PREMIUM
    </p>

    <h2>
      Menyu
    </h2>

    <div style="
      display:grid;
      gap:14px;
      color:#ddd;
    ">

      <div>
        <b style="color:#f1c65b">
          🥗 Salatlar
        </b>
        <br>
        Milliy va zamonaviy salatlar
      </div>

      <div>
        <b style="color:#f1c65b">
          🍲 Issiq taomlar
        </b>
        <br>
        Osh, go‘shtli taomlar va maxsus taomlar
      </div>

      <div>
        <b style="color:#f1c65b">
          🍰 Shirinliklar
        </b>
        <br>
        Turli desert va shirinliklar
      </div>

      <div>
        <b style="color:#f1c65b">
          🥤 Ichimliklar
        </b>
        <br>
        Mehmonlar uchun turli ichimliklar
      </div>

    </div>

  `;

  openModal(infoModal);

});


/* =====================================
   GALEREYA
===================================== */

document.getElementById("galleryBtn")?.addEventListener("click", () => {

  infoContent.innerHTML = `

    <p class="eyebrow">
      GALEREYA
    </p>

    <h2>
      Havas Premium
    </h2>

    <p style="
      color:#b8b2a6;
      line-height:1.8;
    ">
      Havas Premium to‘yxonasining
      zamonaviy va hashamatli muhiti.
    </p>

  `;

  openModal(infoModal);

});


/* =====================================
   XARITA
===================================== */

document.getElementById("mapBtn")?.addEventListener("click", () => {

  window.open(
    "https://www.google.com/maps/search/?api=1&query=Buxoro+Havas+Premium",
    "_blank"
  );

});


/* =====================================
   BRON STATUS XABARI
   5 SONIYA KO‘RINADI
===================================== */

function showBookingStatus(text, type = "pending") {

  let box =
    document.getElementById("bookingStatus");


  if (!box) {

    box =
      document.createElement("div");

    box.id =
      "bookingStatus";


    box.style.position =
      "fixed";

    box.style.left =
      "50%";

    box.style.top =
      "25px";

    box.style.transform =
      "translateX(-50%)";

    box.style.zIndex =
      "99999";


    box.style.padding =
      "18px 28px";

    box.style.borderRadius =
      "12px";


    box.style.fontSize =
      "16px";

    box.style.fontWeight =
      "700";

    box.style.textAlign =
      "center";


    box.style.boxShadow =
      "0 15px 50px rgba(0,0,0,.5)";


    box.style.minWidth =
      "320px";

    box.style.maxWidth =
      "90%";


    box.style.lineHeight =
      "1.5";


    box.style.transition =
      "opacity .5s, transform .5s";


    document.body.appendChild(box);

  }


  /* KUTILMOQDA */

  if (type === "pending") {

    box.style.background =
      "#3c3012";

    box.style.border =
      "1px solid #f1c65b";

    box.style.color =
      "#f1c65b";

  }


  /* TASDIQLANDI */

  else if (type === "approved") {

    box.style.background =
      "#123d20";

    box.style.border =
      "1px solid #2ecc71";

    box.style.color =
      "#7dffab";

  }


  /* RAD ETILDI */

  else if (type === "rejected") {

    box.style.background =
      "#421515";

    box.style.border =
      "1px solid #ff4d4d";

    box.style.color =
      "#ff8585";

  }


  box.textContent =
    text;


  box.style.opacity =
    "1";

  box.style.transform =
    "translateX(-50%)";


  clearTimeout(
    box.hideTimer
  );


  /* =================================
     5 SONIYADAN KEYIN YO‘QOLADI
  ================================= */

  box.hideTimer =
    setTimeout(() => {

      box.style.opacity =
        "0";

      box.style.transform =
        "translateX(-50%) translateY(-20px)";


      setTimeout(() => {

        if (
          box &&
          box.parentNode
        ) {

          box.remove();

        }

      }, 500);


    }, 5000);

}


/* =====================================
   BRON STATUSINI TEKSHIRISH
===================================== */

let statusTimer = null;


async function checkBookingStatus(bookingId) {

  if (!bookingId) return;


  try {

    const response =
      await fetch(
        `/api/booking/${bookingId}/status`,
        {
          cache: "no-store"
        }
      );


    if (!response.ok) {
      return;
    }


    const data =
      await response.json();


    /* =================================
       TASDIQLANDI
    ================================= */

    if (
      data.status === "approved"
    ) {


      /* Faqat 1 marta ko‘rsatish */

      if (
        localStorage.getItem(
          "status_shown"
        ) === "yes"
      ) {

        clearInterval(
          statusTimer
        );

        return;

      }


      showBookingStatus(

        "📞 Rahmat! So‘rovingiz qabul qilindi. Sizga o‘zimiz telefon qilib, broningiz haqida ma’lumot beramiz.",

        "approved"

      );


      localStorage.setItem(
        "status_shown",
        "yes"
      );


      clearInterval(
        statusTimer
      );


      return;

    }


    /* =================================
       RAD ETILDI
    ================================= */

    if (
      data.status === "rejected"
    ) {


      /* Faqat 1 marta ko‘rsatish */

      if (
        localStorage.getItem(
          "status_shown"
        ) === "yes"
      ) {

        clearInterval(
          statusTimer
        );

        return;

      }


      showBookingStatus(

        "❌ Afsuski, tanlangan vaqtda joy mavjud emas. Sizga o‘zimiz telefon qilib, boshqa vaqt taklif qilamiz.",

        "rejected"

      );


      localStorage.setItem(
        "status_shown",
        "yes"
      );


      clearInterval(
        statusTimer
      );


      return;

    }


    /* =================================
       KUTILMOQDA
    ================================= */

    if (
      data.status === "pending"
    ) {

    }


  } catch (error) {

    console.log(
      "Bron statusini tekshirishda xato:",
      error
    );

  }

}


/* =====================================
   BRON FORMASI
===================================== */

document
  .getElementById("bookingForm")
  ?.addEventListener(
    "submit",
    async e => {

      e.preventDefault();


      const form =
        e.target;


      const data =
        Object.fromEntries(
          new FormData(
            form
          ).entries()
        );


      /* TELEFONNI TEKSHIRISH */

      if (
        !data.phone ||
        data.phone
          .replace(/\D/g, "")
          .length < 7
      ) {

        showToast(
          "Telefon raqamingizni tekshiring."
        );

        return;

      }


      const button =
        form.querySelector(
          "button[type=submit]"
        );


      button.disabled =
        true;


      button.textContent =
        "Yuborilmoqda...";


      try {

        const response =
          await fetch(
            "/api/booking",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify(data)
            }
          );


        const result =
          await response.json();


        if (!response.ok) {

          throw new Error(
            result.message ||
            "Server xatosi"
          );

        }


        /* =================================
           YANGI BRON
           ESKI STATUSNI TOZALAYDI
        ================================= */

        localStorage.removeItem(
          "status_shown"
        );


        localStorage.setItem(
          "booking_id",
          result.booking_id
        );


        /* MODALNI YOPISH */

        closeModal(
          bookingModal
        );


        /* FORMNI TOZALASH */

        form.reset();


        /* KUTILAYOTGAN XABAR */

        showBookingStatus(

          "pending"

        );


        clearInterval(
          statusTimer
        );


        /* =================================
           HAR 2 SONIYADA TEKSHIRADI
        ================================= */

        statusTimer =
          setInterval(
            () => {

              checkBookingStatus(
                result.booking_id
              );

            },
            2000
          );


      } catch (error) {

        console.error(
          error
        );


        showToast(
          "Server ishlamayapti yoki ulanishda xato."
        );


      } finally {

        button.disabled =
          false;


        button.textContent =
          "So‘rov yuborish";

      }

    }
  );


/* =====================================
   OLDINGI BRONNI TEKSHIRISH
===================================== */

const oldBookingId =
  localStorage.getItem(
    "booking_id"
  );


if (oldBookingId) {

  checkBookingStatus(
    oldBookingId
  );


  clearInterval(
    statusTimer
  );


  statusTimer =
    setInterval(
      () => {

        checkBookingStatus(
          oldBookingId
        );

      },
      1000
    );

}


/* =====================================
   TOAST
===================================== */

function showToast(text) {

  if (!toast) return;


  toast.textContent =
    text;


  toast.classList.add(
    "show"
  );


  setTimeout(() => {

    toast.classList.remove(
      "show"
    );

  }, 3500);

}


/* =====================================
   NAVIGATION
===================================== */

const sections = [
  ...document.querySelectorAll(
    "main section[id]"
  )
];


const links = [
  ...document.querySelectorAll(
    ".nav a"
  )
];


window.addEventListener(
  "scroll",
  () => {

    let current =
      "home";


    sections.forEach(
      section => {

        if (
          scrollY >=
          section.offsetTop - 130
        ) {

          current =
            section.id;

        }

      }
    );


    links.forEach(
      link => {

        link.classList.toggle(

          "active",

          link.getAttribute(
            "href"
          ) ===
          "#" + current

        );

      }
    );

  }
);