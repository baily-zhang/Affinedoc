import '@affine/core/bootstrap/browser';
import '@affine/core/bootstrap/cleanup';
import '@affine/component/theme';

import '@affine/core/components/heroui/dashboard-styles.css';

const tailwindLink = document.createElement('link');
tailwindLink.rel = 'stylesheet';
tailwindLink.href = 'https://cdn.tailwindcss.com';
document.head.appendChild(tailwindLink);
