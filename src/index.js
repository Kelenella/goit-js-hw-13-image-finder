import { getPictures } from "./services/apiService";
import cardTmp from "./templates/cardTmp.hbs";
import * as basicLightbox from "basiclightbox";
// ==========
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

// ==============

const refs = {
  form: document.querySelector("#search-form"),
  gallery: document.querySelector(".gallery"),
  loadMore: document.querySelector("#load-more"),
  back2Top: document.querySelector(".back2Top"),
};

const state = { page: 1, value: "" };
refs.loadMore.style.visibility = "hidden";

refs.form.addEventListener("submit", onSearch);
refs.loadMore.addEventListener("click", onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  refs.loadMore.style.visibility = "hidden";
  if (!e.currentTarget.elements.query.value.trim()) {
    return;
  }
  try {
    state.value = e.currentTarget.elements.query.value;
    const pictures = await getPictures(state.value, state.page);
    refs.gallery.innerHTML = cardTmp(pictures);
    if (pictures.length > 11) {
      refs.loadMore.style.visibility = "visible";
    }
    if (!pictures.length) {
      console.log("Nothing find😒");
    }
  } catch (error) {
    console.log(error.message);
  }
}

// ==Load More Button==

async function onLoadMore() {
  state.page += 1;
  const pictures = await getPictures(state.value, state.page);
  refs.gallery.insertAdjacentHTML("beforeend", cardTmp(pictures));
  if (state.page === 2) {
    const observer = new IntersectionObserver(onLoadMore, options);
    observer.observe(refs.loadMore);
  }
  //   refs.gallery.scrollIntoView({
  //     behavior: "smooth",
  //     block: "end",
  //   });
}

// =====Light BOx

refs.gallery.addEventListener("click", onOpenGallery);

function onOpenGallery(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }

  basicLightbox
    .create(
      `
    <img src="${e.target.dataset.source}" width="800" height="600">
`
    )
    .show();
}
// scroll up
window.addEventListener('scroll', trackScroll);
refs.back2Top.addEventListener('click', back2Top);

function trackScroll() {
  var scrolled = window.pageYOffset;
  var coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    refs.back2Top.classList.add('back_to_top-show');
  }
  if (scrolled < coords) {
    refs.back2Top.classList.remove('back_to_top-show');
  }
}
function back2Top() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(back2Top, 0);
  }
}