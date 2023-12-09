function Project(title, desc, tags, image, link) {
  this.title = title;
  this.desc = desc;
  this.tags = tags;
  this.image = image;
  this.link = link;
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
  new Project(
    "Branch Industrial",
    "A firm specializes in fostering connections within the industrial real estate sector to aid leaders in funding and executing projects, acquiring properties, and broadening their operational scope.",
    ["Web Development"],
    "assets/branch.png"
  ),
];

function renderProjects(projects) {
  const grid = document.querySelector(".project-grid");
  projects.forEach((project) => {
    let temp = document.querySelector(".project-template");
    let clone = temp.content.cloneNode(true);

    let title = clone.querySelector("[data-project-title]");
    title.textContent = project.title;

    let desc = clone.querySelector("[data-project-desc]");
    desc.textContent = project.desc;

    let image = clone.querySelector("[data-project-image]");
    image.src = project.image;
    image.alt = project.title;

    let tagsContainer = clone.querySelector("[data-project-tags]");
    tagsContainer.innerHTML = "";
    project.tags.forEach((tag) => {
      let tagDiv = document.createElement("div");
      tagDiv.classList.add("project-tag");
      tagDiv.textContent = tag;
      tagsContainer.appendChild(tagDiv);
    });

    grid.appendChild(clone);
  });
}

renderProjects(projects);

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
    }, 25);
  });

  button.addEventListener("mouseout", (event) => {
    const button = event.target;
    clearInterval(intervals[button]);
    button.innerText = initialTexts[button];
  });
});
