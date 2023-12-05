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
