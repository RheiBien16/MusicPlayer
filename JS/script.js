/* Side Nav */
document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById("toggleBtn");
    const sidebar = document.getElementById("sidebar");

    toggleBtn.addEventListener("click", function() {
        sidebar.classList.toggle("collapsed");
    });
});

/* Account dropdown */
const accountBtn = document.getElementById("accountBtn");

accountBtn.addEventListener("click", function(e){
    e.stopPropagation();
    this.classList.toggle("active");
});

document.addEventListener("click", function(){
    accountBtn.classList.remove("active");
});