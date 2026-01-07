document.addEventListener('DOMContentLoaded', function() {
    const btnStart = document.querySelector('a[href="#open-site"]');
    const heroCurtain = document.querySelector('.hero-curtain');
    const navTop = document.querySelector('.nav-top');
    
    // Si on est sur une page sans hero-curtain (comme about), afficher la nav directement
    if (!heroCurtain && navTop) {
        navTop.classList.add('nav-visible');
    }
    
    // Animation pour la page d'accueil uniquement
    if (btnStart && heroCurtain) {
        btnStart.addEventListener('click', function(e) {
            e.preventDefault();
            
            heroCurtain.classList.add('curtain-up');
            
            setTimeout(function() {
                if (navTop) {
                    navTop.classList.add('nav-visible');
                }
            }, 500);
        });
    }
});
