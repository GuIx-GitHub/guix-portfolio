document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);

    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const cursor = document.querySelector('.cursor');
    const viewWorkButton = document.querySelector('.cta-button[href="#plugins"]');
    const learnMoreButtons = document.querySelectorAll('.learn-more-button');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupContent = document.querySelector('.popup-content');
    const popupClose = document.querySelector('.popup-close');
    const videos = document.querySelectorAll('.plugin-video video');

    // Add hover and click sounds
    const hoverSound = new Audio('assets/sound/general/actions/mo_1.mp3');
    const clickSound = new Audio('assets/sound/general/actions/sw_1.mp3');

    // Set volume (0.0 to 1.0)
    hoverSound.volume = 0.2; // 50% volume
    clickSound.volume = 0.2; // 50% volume

    document.querySelectorAll('a').forEach(button => {
        button.addEventListener('mouseover', () => {
            hoverSound.play();
        });

        button.addEventListener('click', () => {
            clickSound.play();
        });
    });

    videos.forEach(video => {
        video.disablePictureInPicture = true;
        video.controlsList = "nodownload noremoteplayback";
    });

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const plugin = button.getAttribute('data-plugin');
            showPopup(plugin);
        });
    });

    popupClose.addEventListener('click', () => {
        hidePopup();
    });

    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            hidePopup();
        }
    });

    function showPopup(plugin) {
        const pluginInfo = getPluginInfo(plugin);
        popupContent.querySelector('h3').textContent = pluginInfo.title;
        popupContent.querySelector('p').innerHTML = pluginInfo.description;

        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hidePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function getPluginInfo(plugin) {
        const plugins = {
            'cooking': {
                title: 'Project Genesis Launcher',
                description: `
                <p>A simple Minecraft modded launcher based on Helios Launcher</p>
                <ul>
                    <li>Background system</li>
                    <li>Background Sound system</li>
                </ul>
                `
            },
        };
        return plugins[plugin] || { title: 'Unknown Plugin', description: 'No information available.' };
    }

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    function switchSection(targetId) {
        navLinks.forEach(link => {
            if (link.getAttribute('href').substring(1) === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active');
                window.scrollTo(0, 0);
            } else {
                section.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            switchSection(targetId);
        });
    });

    if (viewWorkButton) {
        viewWorkButton.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection('plugins');
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
    }
    updateTheme();

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        updateTheme();
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });

    function updateTheme() {
        const isDarkMode = body.classList.contains('dark-mode');
        const root = document.documentElement;

        if (isDarkMode) {
            root.style.setProperty('--bg-color', '#1a1a1a');
            root.style.setProperty('--text-color', '#ffffff');
            root.style.setProperty('--nav-bg-color', '#2c2c2c');
            root.style.setProperty('--nav-text-color', '#ffffff');
            root.style.setProperty('--accent-color', '#4a90e2');
            root.style.setProperty('--accent-hover', '#3a7bc8');
            root.style.setProperty('--secondary-color', '#5cb85c');
            root.style.setProperty('--secondary-hover', '#4cae4c');
            root.style.setProperty('--cursor-color', '#ffffff');
            themeToggle.querySelector('.fa-sun').classList.remove('active');
            themeToggle.querySelector('.fa-moon').classList.add('active');
        } else {
            root.style.setProperty('--bg-color', '#ffffff');
            root.style.setProperty('--text-color', '#333333');
            root.style.setProperty('--nav-bg-color', '#f0f0f0');
            root.style.setProperty('--nav-text-color', '#333333');
            root.style.setProperty('--accent-color', '#4a90e2');
            root.style.setProperty('--accent-hover', '#3a7bc8');
            root.style.setProperty('--secondary-color', '#5cb85c');
            root.style.setProperty('--secondary-hover', '#4cae4c');
            root.style.setProperty('--cursor-color', '#333333');
            themeToggle.querySelector('.fa-sun').classList.add('active');
            themeToggle.querySelector('.fa-moon').classList.remove('active');
        }
    }

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });

    updateTheme();
});

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});