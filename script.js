import {
  sidebar as sidebarData,
  users as usersData,
  blogs as blogsData,
  videos as videosData,
  messages as messagesData,
} from "./data/index.js";

const sidebarEl = document.querySelector("[data-sidebar]");
const pagesEl = document.querySelectorAll("[data-page]");
const blogsEl = document.querySelector("[data-blogs]");
const mostWatchedVideosEl = document.querySelector(
  "[data-most-watched-videos]"
);
const trendingVideoEl = document.querySelector("[data-video]");
const liveChatMessagesEl = document.querySelector("[data-live-chat-messages]");
const videoDetailsEl = document.querySelector("[data-video-details]");
const relatedVideosEl = document.querySelector("[data-related-videos]");

const sidebar = Array.from(sidebarData);
const users = Array.from(usersData);
const blogs = Array.from(blogsData);
const videos = Array.from(videosData);
const messages = Array.from(messagesData);

const workedOnPages = { discover: "", trending: "" };

let currentPage = "discover";
let currentVideo = "video";

function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function checkPage() {
  sidebarEl.querySelectorAll("li").forEach((item) => {
    item.classList.toggle(
      "active",
      item.getAttribute("data-link-to").toLowerCase() ==
        currentPage.toLowerCase()
    );
  });

  pagesEl.forEach((page) => {
    page.classList.toggle(
      "active",
      page.getAttribute("data-page").toLowerCase() == currentPage.toLowerCase()
    );
  });
}

function updateTrending() {
  trendingVideoEl.querySelector("video").src = currentVideo.video;
  let videoAuthor = users.find((user) => user.id == currentVideo.authorId);

  let relatedVideos = videos.filter(
    (video) => video != currentVideo && videos.indexOf(video) != 5
  );

  relatedVideosEl.innerHTML = "";
  videoDetailsEl.innerHTML = `
        <div class="video-details__video-author">
          <div>
            <img src="${videoAuthor.img}">
            <div>
              <h3>${videoAuthor.name}</h3>
              <span>${numberWithCommas(videoAuthor.subs)} subscribers</span>
            </div>
          </div>
          <div>
            <button>
              <i class="fa-solid fa-paper-plane"></i>
              Share
            </button>
            <button>
              <i class="fa-solid fa-heart"></i>
              Liked
            </button>
          </div>
        </div>
        <h2>${currentVideo.title}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus illum tempora consequuntur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis earum velit accusantium maiores qui sit quas, laborum voluptatibus vero quidem tempore facilis voluptate tempora deserunt!\n
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus laborum qui dolorum fugiat eius accusantium repellendus illum tempora consequuntur. Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      `;
  let videosToShow = relatedVideos.length <= 2 ? relatedVideos.length : 2;
  relatedVideos.forEach((video, index) => {
    if (index + 1 > videosToShow) return;
    let videoAuthor = users.find((user) => user.id == video.authorId);
    relatedVideosEl.innerHTML += `
          <div class="related__video"> 
            <img src="https://cdn.nohat.cc/thumb/f/720/3b55eddcfffa4e87897d.jpg">
            <div>
              <h3>${video.title}</h3>
              <span>${videoAuthor.name}</span>
            </div>
          </div>
        `;
  });
  if (relatedVideos.length > videosToShow) {
    relatedVideosEl.innerHTML += `
      <button>See All related videos (${
        relatedVideos.length - videosToShow
      })</button>
    `;
  }
}

function viewsFormatter(num) {
  let formattedNum = num;
  if (num > 999999999) {
    formattedNum = (num / 1000000000).toFixed(1) + "B";
  } else if (num > 999999) {
    formattedNum = (num / 1000000).toFixed(1) + "M";
  } else if (num > 999) {
    formattedNum = (num / 1000).toFixed(1) + "K";
  }

  return formattedNum;
}

function lengthFormatter(num) {
  let formattedNum = num + " sec";

  if (num >= 60) {
    formattedNum = num / 60 + " min";
  }

  return formattedNum;
}

sidebar.forEach((menu) => {
  const menuEl = document.createElement("ul");
  menuEl.classList.add("sidebar__menu");
  menuEl.innerHTML += `<span>${menu.title}</span>`;

  menu.items.forEach((item) => {
    menuEl.innerHTML += `
        <li data-link-to="${item.tag}">
            <i class="${item.icon}"></i>
            <span>${item.tag}</span>
        </li>
    `;
  });

  sidebarEl.appendChild(menuEl);
});

sidebarEl.querySelectorAll("li")[0].classList.add("active");
checkPage();

sidebarEl.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    currentPage =
      item.getAttribute("data-link-to").toLowerCase() in workedOnPages
        ? item.getAttribute("data-link-to")
        : currentPage;
    checkPage();
  });
});

blogs.forEach((blog, index) => {
  let blogAuthor = users.find((user) => user.id == blog.authorId);

  blogsEl.innerHTML += `
    <div class="blog ${index % 2 == 0 ? "span-2" : ""}" style="${
    blog.bg == null ? "" : `background-color: ${blog.bg}`
  }">
      <img src="${blog.img}">
      <div class="blog__content">
        <h1>${blog.title}</h1>
        <div class="blog__author">
          <img src="${blogAuthor.img}">
          <div>
            <h2>${blogAuthor.name}</h2>
            <div class="blog__info">
              <span>${viewsFormatter(blog.views)}</span>
              <span class="seperator"></span>
              <span>${moment(blog.createdAt).fromNow()}</span>
            </div>
          </div>
        </div>
      </div>
      <span>${lengthFormatter(blog.length)}</span>
    </div>
  `;
});

videos.forEach((video) => {
  let videoAuthor = users.find((user) => user.id == video.authorId);
  mostWatchedVideosEl.innerHTML += `
    <div class="most-watched__video">
      <video muted src="${video.video}"></video>
      <div class="video__info">
        <span>${videoAuthor?.name}</span>
        <h3>${video.title}</h3>
        <div>
          <span>${viewsFormatter(video.views)} views</span>
          <span class="seperator"></span>
          <span>${moment(video.createdAt).fromNow()}</span>
        </div>
      </div>
      <span>${lengthFormatter(video.length)}</span>
    </div>
  `;
});

Array.from(mostWatchedVideosEl.children).forEach((video) => {
  let videoEl = video.querySelector("video");

  video.addEventListener("mouseenter", () => {
    videoEl.play();
  });
  video.addEventListener("mouseleave", () => {
    videoEl.pause();
  });
  video.addEventListener("click", () => {
    currentPage = "trending";
    currentVideo = videos.find((video) => video.video == videoEl.src);
    checkPage();
    updateTrending();
  });
});

currentVideo = videos[0];
updateTrending();

trendingVideoEl.addEventListener("mouseenter", () => {
  let videoEl = trendingVideoEl.querySelector("video");

  if (videoEl.paused) {
    trendingVideoEl
      .querySelector("[data-play-video]")
      .querySelector("i").classList = "fa-solid fa-play";
  } else {
    trendingVideoEl
      .querySelector("[data-play-video]")
      .querySelector("i").classList = "fa-solid fa-pause";
  }

  trendingVideoEl.querySelector("[data-play-video]").classList.add("active");
});

trendingVideoEl.addEventListener("mouseleave", () => {
  trendingVideoEl.querySelector("[data-play-video]").classList.remove("active");
});

trendingVideoEl
  .querySelector("[data-play-video]")
  .addEventListener("click", () => playVideo());

trendingVideoEl
  .querySelector("[data-play-pause]")
  .addEventListener("click", () => playVideo());

// * Open fullscreen

trendingVideoEl
  .querySelector("[data-full-screen]")
  .addEventListener("click", () => {
    openFullscreen(trendingVideoEl.querySelector("[data-video-wrapper]"));
  });

// * Check fullscreen

document.addEventListener("fullscreenchange", () => {
  if (!window.screenTop && !window.screenY) {
    document.documentElement.style.setProperty(
      "--video-height",
      "calc(400px - 2.3rem)"
    );
  } else {
    document.documentElement.style.setProperty("--video-height", "100vh");
  }
});

// * Playback rates

Array.from(
  trendingVideoEl.querySelector("[data-playback-rates]").children
).forEach((btn) => {
  btn.addEventListener("click", () => {
    Array.from(
      trendingVideoEl.querySelector("[data-playback-rates]").children
    ).forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
    trendingVideoEl.querySelector("video").playbackRate = parseInt(
      btn.innerText.replace("x", "")
    );
  });
});

// * Play video

function playVideo() {
  let videoEl = trendingVideoEl.querySelector("video");
  if (videoEl.paused) {
    videoEl.play();
    trendingVideoEl.querySelector("[data-play-pause]").classList =
      "fa-solid fa-pause";
    trendingVideoEl
      .querySelector("[data-play-video]")
      .querySelector("i").classList = "fa-solid fa-pause";
  } else {
    videoEl.pause();
    trendingVideoEl.querySelector("[data-play-pause]").classList =
      "fa-solid fa-play";
    trendingVideoEl
      .querySelector("[data-play-video]")
      .querySelector("i").classList = "fa-solid fa-play";
  }
}

// * Full screen

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

// * Progress bar

setInterval(() => {
  let video = trendingVideoEl.querySelector("video");
  if (video.paused) return;

  let devideToParts =
    (trendingVideoEl.querySelector("[data-progress-bar]").clientWidth /
      video.duration) *
    trendingVideoEl.querySelector("video").playbackRate;

  document.documentElement.style.setProperty(
    "--video-progress-width",
    devideToParts * video.currentTime + devideToParts + "px"
  );
}, 1000 / trendingVideoEl.querySelector("video").playbackRate);

// * Change video current time

let cursorOnBar;
let devideToParts;
let amountOfSeconds;

trendingVideoEl
  .querySelector("[data-progress-bar]")
  .addEventListener("mousemove", (e) => {
    let controlBar = trendingVideoEl.querySelector("[data-video-control-bar]");
    let progressBar = trendingVideoEl.querySelector("[data-progress-bar]");
    let video = trendingVideoEl.querySelector("video");
    let moveTo = trendingVideoEl.querySelector("[data-move-to]");

    cursorOnBar = e.x - progressBar.getBoundingClientRect().x;
    devideToParts = progressBar.clientWidth / video.duration;
    amountOfSeconds = cursorOnBar / devideToParts;

    let minutes = Math.floor(amountOfSeconds / 60);
    minutes = minutes < 0 ? 0 : minutes;

    let seconds =
      minutes > 0
        ? Math.floor(amountOfSeconds / 60)
        : Math.floor(amountOfSeconds);
    seconds = seconds < 0 ? 0 : seconds;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    document.documentElement.style.setProperty(
      "--video-timeline-x",
      `${
        cursorOnBar +
        (progressBar.getBoundingClientRect().x -
          controlBar.getBoundingClientRect().x) -
        20
      }px`
    );
    moveTo.innerText = `${minutes}:${seconds}`;
  });

trendingVideoEl
  .querySelector("[data-progress-bar]")
  .addEventListener("click", () => {
    let video = trendingVideoEl.querySelector("video");

    video.currentTime = amountOfSeconds;
    document.documentElement.style.setProperty(
      "--video-progress-width",
      devideToParts * video.currentTime + "px"
    );
  });

trendingVideoEl
  .querySelector("[data-progress-bar]")
  .addEventListener("mouseenter", () => {
    trendingVideoEl.querySelector("[data-move-to]").classList.add("active");
  });

trendingVideoEl
  .querySelector("[data-progress-bar]")
  .addEventListener("mouseleave", () => {
    trendingVideoEl.querySelector("[data-move-to]").classList.remove("active");
  });

messages.forEach((message) => {
  let messageAuthor = users.find((user) => user.id == message.authorId);
  liveChatMessagesEl.innerHTML += `
    <div class="message">
      <img src="${messageAuthor.img}">
      <div>
        <span>${messageAuthor.name}</span>
        <p>${message.content}</p>
      </div>
    </div>
  `;
});
