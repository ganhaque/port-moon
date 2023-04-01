const themeMap = {
  light: "solar",
  solar: "dark",
  dark: "light",
};

const theme = localStorage.getItem('theme')
  || (tmp = Object.keys(themeMap)[0],
      localStorage.setItem('theme', tmp),
      tmp);
const bodyClass = document.body.classList;
console.log("starting theme is", theme);
bodyClass.add(theme);

function toggleTheme() {
  const current = localStorage.getItem('theme');
  const next = themeMap[current];

  bodyClass.replace(current, next);
  localStorage.setItem('theme', next);

  console.log("changing to", next);
}

document.getElementById('themeButton').onclick = toggleTheme;