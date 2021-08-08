//Function to copy case code
//it expects an ancesto of the pre element as a param 
let copyPreCode =
  "" +
  function copyPre(caller) {
    let pre = caller.parentElement.parentElement.querySelector("pre.cfed");
    let oldCase = pre.innerHTML;
    let newCase = oldCase.replace("\n\n", "\n");
    navigator.clipboard.writeText(newCase);
  };
//script element to add copyPre function to the page
let script = document.createElement("script");
script.textContent = copyPreCode;
(document.head || document.documentElement).appendChild(script);
script.remove();

//copy button style
let stylesCode = `
.input-output-copier:hover {
    background-color: #def;
}
.input-output-copier {
    font-weight: bold;
    font-size: 1.2rem;
    float: right;
    color: #888 !important;
    cursor: pointer;
    border: 1px solid rgb(185, 185, 185);
    padding: 3px;
    line-height: 1.1rem;
    text-transform: none;
    float: right;
    margin-bottom: 1px;
}
`;
let styles = document.createElement("style");
styles.textContent = stylesCode;
document.head.appendChild(styles);

//Callback that will be called each time body element is updated, and it will add the button above pres that don't have "cfed" class
const observerCallback = function x() {
  let inputs = document.querySelectorAll("pre.input:not(.cfed)");
  for (const i of inputs) {
    i.classList.add("cfed");
    const prv =
      i.previousElementSibling === null
        ? i.parentElement.previousElementSibling
        : i.previousElementSibling;
    if (
      prv.tagName === "DIV" &&
      prv.classList.length <= 1 &&
      prv.innerHTML.trim() === "Input"
    ) {
      prv.innerHTML += `<div class="input-output-copier" onclick="copyPre(this)">Copy</div>
      <div style='clear:both;'><!--clear--></div> 
      `;
      prv.classList.add("input-label-div");
    }
  }
};
let observer = new MutationObserver(observerCallback);
const observerConfig = {
  subtree: true,
  childList: true,
  attributes: true,
  characterData: true,
};
observer.observe(document.body, observerConfig);
