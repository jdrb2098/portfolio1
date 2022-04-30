/*=============== FILTERS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tc =>{
            tc.classList.remove('filters__active')
        })
        target.classList.add('filters__active')

        tabs.forEach(t => {
            t.classList.remove('fillter-tab-active')
        })
        tab.classList.add('fillter-tab-active')
    })
})

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== Terminal ===============*/
let userInput, terminalOutput;
let projAsk = false;
let lastCommands = [];

console.log("Welcome to my website!");

const COMMANDS = {
  rd: "Whoa!!! You found the secret command!!! To get access to the beta for my apps, go <a href = 'https://blackholegames.gq/beta' target = '_blank' style = 'color:#000;'> here </a> <br>The beta code is A3T4M",
  n: "OK",
  no: "OK",
  isa: 'im sorry, would u forgive this stupid?',
  about:
    "Hey There! My name is Juan David Rondon i am a web developer on my way to becoming a senior developer. in the meantime, i like to play the guitar and play beach volleyball in my spare time, Feel free to visit my <a href ='https://github.com/jdrb2098' target='_blank' style='color:#000;'> Github",
  ls:
    "usr&nbsp;&nbsp;&nbsp;&nbsp;home&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;&nbsp;&nbsp;&nbsp;root",
  cd: "changed directory to root..",
  "cd ..": "cd: no such file or directory",
  "cd var": "var aliased to ../",
  "cd root": "access denied",
  "cd usr": "no users found",

  "cd home": "home was aliased to .",
  sudo: "user not in the sudoers file.  This incident will be reported.",
  help:
    'Supported commands: <span class="code">about</span>, <span class="code">contact</span>, <span class="code">projects</span>, <span class="code">github</span><br>System commands: <span class="code">clear</span>, <span class="code">history</span>, <span class="code">cd</span>, <span class="code">ls</span><br>Tip: Use Up / Down arrow to go through recent commands',
  contact:
    "Email (juan.rondon.bonilla@gmail.com): <a class='link' href='https://mail.google.com/'>Gmail</a><br>Form: <a href='/contact' class='link'> Anon Message</a><br>",
};

const app = () => {
  userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  document.getElementById("dummyKeyboard").focus();
  console.log("Application loaded");
};

const execute = function executeCommand(input) {
  input = input.toLowerCase();
  lastCommands.push(input);
  let output;
  if (input.length === 0) {
    return;
  }
  if (input.indexOf("sudo") >= 0) {
    input = "sudo";
  }

  if (input == "projects") {
    open("index.html#projects");
  } else if (input === "clear" || input === "cls") {
    clearScreen();
  } else if (input === "history") {
    showHist();
  } else if (input === "github") {
    open("https://github.com/jdrb2098");
  } else {
    output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
    if (!COMMANDS.hasOwnProperty(input)) {
      output += `<div class="terminal-line">command not found: ${input}</div>`;
    } else {
      output += COMMANDS[input];
    }

    terminalOutput.innerHTML = `${terminalOutput.innerHTML}<br><div class="terminal-line">${output}<br></div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
};

const key = (e) => {
  const input = userInput.innerHTML;

  if (e.key === "Enter") {
    execute(input);
    userInput.innerHTML = "";
    return;
  }

  userInput.innerHTML = input + e.key;
};

const backspace = (e) => {
  if (e.keyCode !== 8 && e.keyCode !== 46) {
    return;
  }
  userInput.innerHTML = userInput.innerHTML.slice(
    0,
    userInput.innerHTML.length - 1
  );
};

function showHist() {
  terminalOutput.innerHTML = `${
    terminalOutput.innerHTML
  }<div class="terminal-line">${lastCommands.join(", ")}</div>`;
}

let iter = 0;
const up = (e) => {
  if (e.key === "ArrowUp") {
    if (lastCommands.length > 0 && iter < lastCommands.length) {
      iter += 1;
      userInput.innerHTML = lastCommands[lastCommands.length - iter];
    }
  }

  if (e.key === "ArrowDown") {
    if (lastCommands.length > 0 && iter > 1) {
      iter -= 1;
      userInput.innerHTML = lastCommands[lastCommands.length - iter];
    }
  }
};

function clearScreen() {
  location.reload();
}
document.addEventListener("keydown", up);

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);
/*=============== SCROLL REVEAL ANIMATION ===============*/