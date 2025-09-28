// Script de debug pour tester l'affichage des détails
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script de debug chargé');
    
    // Trouver toutes les cartes de projet
    const projectCards = document.querySelectorAll('.showreel-projects .project-card');
    console.log('Nombre de cartes trouvées:', projectCards.length);
    
    projectCards.forEach((card, index) => {
        console.log(`Carte ${index + 1}:`);
        
        // Vérifier si les détails existent
        const details = card.querySelector('.project-details');
        console.log('  - Détails trouvés:', !!details);
        
        if (details) {
            console.log('  - Contenu des détails:', details.innerHTML.substring(0, 100) + '...');
            
            // Forcer l'affichage des détails pour test
            details.style.opacity = '1';
            details.style.visibility = 'visible';
            details.style.background = 'rgba(0, 0, 0, 0.9)';
            details.style.zIndex = '100';
            details.style.color = 'white';
        }
        
        // Vérifier les sections de détail
        const sections = card.querySelectorAll('.detail-section');
        console.log('  - Nombre de sections:', sections.length);
        
        sections.forEach((section, sIndex) => {
            const h4 = section.querySelector('h4');
            const paragraphs = section.querySelectorAll('p');
            console.log(`    Section ${sIndex + 1}: ${h4 ? h4.textContent : 'pas de titre'}, ${paragraphs.length} paragraphes`);
        });
    });
});