function Project(title, desc, tags, imageUrl) {
  this.title = title;
  this.desc = desc;
  this.tags = tags;
  this.imageUrl = imageUrl;
}

const projects = [
  new Project(
    "Arya Management",
    "A New York based firm dedicated to providing building owners with reliable property management services, emphasizing consistent communication and meticulous care for client properties.",
    ["Web Design", "Web Development"],
    "assets/arya.jpg"
  ),
  new Project(
    "Newtech Energy",
    "Enabling property owners to upgrade their properties and boost revenue through the installation of electric vehicle (EV) chargers. Providing a full-service package from planning to maintenance, and helps with securing applicable incentives.",
    ["Web Development"],
    "assets/newtech.png"
  ),
];

function renderProjects() {
  const grid = document.querySelector(".project-grid");
  projects.forEach((project) => {
    const projectHTML = `
      <div class="project">
        <div class="flex flex-col items-start">
          <div class="flex gap-2 mb-5">
            ${project.tags
              .map((tag) => `<div class="project-tag">${tag}</div>`)
              .join("")}
          </div>
          <h2 class="text-4xl mb-5" animated-heading="">${project.title}</h2>
          <p class="text-zinc-400 mb-5">${project.desc}</p>
          <button class="btn btn-outline" hacker-text="">View project</button>
        </div>
        <img src="${
          project.imageUrl
        }" alt="" class="aspect-[5/4] bg-zinc-800 rounded-md object-cover" />
      </div>`;
    grid.innerHTML += projectHTML;
  });
}

renderProjects();

const animatedHeadings = document.querySelectorAll("[animated-heading]");

animatedHeadings.forEach((heading) => {
  const myText = new SplitType(heading);
  gsap.set(myText.words, { opacity: 0, y: "100%" });

  const animation = gsap.to(myText.words, {
    duration: 0.5,
    y: "0%",
    opacity: 1,
    stagger: 0.1,
    paused: true,
  });

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animation.play();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.8 } // Adjust this threshold value as needed
  );

  observer.observe(heading);
});

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let intervals = {};
let initialTexts = {};

const animatedButtons = document.querySelectorAll("[hacker-text]");

animatedButtons.forEach((button) => {
  button.addEventListener("mouseover", (event) => {
    const button = event.target;
    initialTexts[button] = button.innerText;
    let iteration = 0;

    clearInterval(intervals[button]);

    intervals[button] = setInterval(() => {
      button.innerText = initialTexts[button]
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return initialTexts[button][index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= initialTexts[button].length) {
        clearInterval(intervals[button]);
      }

      iteration += 1 / 3;
    }, 30);
  });

  button.addEventListener("mouseout", (event) => {
    const button = event.target;
    clearInterval(intervals[button]);
    button.innerText = initialTexts[button];
  });
});
