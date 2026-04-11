(function () {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        nav.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
        var expanded = toggle.getAttribute("aria-expanded") === "true";
        setOpen(!expanded);
    });

    nav.querySelectorAll("a[href^='#']").forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.matchMedia("(max-width: 720px)").matches) {
                setOpen(false);
            }
        });
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 720) {
            setOpen(false);
        }
    });
})();
