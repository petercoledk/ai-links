function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
const chatId = generateUUID();
function pkChat(config = { container: "body" }) {
    const a = document.querySelector(config.container);
    const b = document.createElement("div");

    let showChat = false, windowMode = "mobile", darkMode = false; // Default state for chat visibility
    const c = window.innerWidth - a.getBoundingClientRect().width;
    document.documentElement.style.setProperty("--pk-offset", c < 10 ? "30px" : c + "px");
    const d = document.createElement("iframe");
    const f = document.createElement("div");
    // Set up the iframe
    d.src = config.url+"&showToggleButton=false&showChat=true"+"&id="+chatId;
    d.className = "pkChatWindow";
    d.id = "pcw"
    f.className="pkWindow";
    f.innerHTML=`
    <div class="pkWindowHeader"><button class="toggleMode"><svg xmlns="http://www.w3.org/2000/svg" class="pkMinimize" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minimize"><path d="M8 3v3a2 2 0 0 1-2 2H3"></path><path d="M21 8h-3a2 2 0 0 1-2-2V3"></path><path d="M3 16h3a2 2 0 0 1 2 2v3"></path><path d="M16 21v-3a2 2 0 0 1 2-2h3"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="pkMaximize" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-fullscreen"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><rect width="10" height="8" x="7" y="8" rx="1"></rect></svg></button><div class="flex gap-2 justify-end items-center flex-row"><button class="toggleDarkLight"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg></button><button title="Close chat" class="toggleWindow" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button></div></div>
    `;
    // Set up the chat container and button
    b.classList.add("pkChat", windowMode, darkMode ? "dark" : "light");
    b.innerHTML = `
        <button type="button" style="opacity: 1;" class="pkToggleButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
            </svg>
        </button>`;
    
    // Append elements to the DOM
    a.append(b);
    b.prepend(f)
    f.append(d);

    // Toggle button logic
    const e = b.querySelector(".pkToggleButton");
    const g = b.querySelector(".toggleWindow");
    const h = b.querySelector(".toggleMode");
    const i = b.querySelector(".toggleDarkLight");

    function toggleChat(){
        if (showChat) {
            // d.src = config.url+"&showToggleButton=false&showChat=true"+"&id="+chatId;
            showChat = false;
            f.classList.remove("showChat");
        } else {
            // d.src = config.url+"&showToggleButton=false&showChat=true"+"&id="+chatId;
            showChat = true;
            f.classList.add("showChat");
        }
    }

    e.addEventListener("click", () => {
        toggleChat();
    });
    h.addEventListener("click", ()=>{
        b.classList.remove(windowMode);
        windowMode = windowMode === "mobile" ? "full-screen" : "mobile";
        b.classList.add(windowMode);
    });
    g.addEventListener("click", ()=>{
        toggleChat();
    });
    i.addEventListener("click", ()=>{
        b.classList.remove("dark", "light");
        d.src = config.url+"&showToggleButton=false&showChat=true&mode="+(darkMode ? "light" : "dark") +"&id="+chatId;
        darkMode = !darkMode;
        b.classList.add(!darkMode ? "light" : "dark");
    });
}
// Expose function globally
window.pkChat = pkChat;
