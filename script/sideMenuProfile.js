document.getElementById('aProfile').addEventListener('click', profileMenu);
document.getElementById('aPerformance').addEventListener('click', performanceMenu);

function profileMenu() {
    const performanceContent = document.getElementById('performanceContent');
    performanceContent.setAttribute('style', 'display: none;');

    const profileContent = document.getElementById('profileContent');
    profileContent.setAttribute('style', 'display: block;');   
}

function performanceMenu() {
    const performanceContent = document.getElementById('performanceContent');
    performanceContent.setAttribute('style', 'display: block;');

    const profileContent = document.getElementById('profileContent');
    profileContent.setAttribute('style', 'display: none;');
}