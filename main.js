// Contact email shown on the page.
const CONTACT_EMAIL = "saiteja.dalli@myemail.indwes.edu";

(function () {
  document.getElementById("year").textContent = new Date().getFullYear();
  const b = document.getElementById("emailBtn");
  if (CONTACT_EMAIL && b) b.href = "mailto:" + CONTACT_EMAIL;

})();
