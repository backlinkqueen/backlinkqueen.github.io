import './style.css';

const p = document.createElement('p');
p.className = 'muted';
p.textContent = 'Build lúc: ' + new Date(__BUILD_TIME__).toLocaleString('vi-VN');
document.querySelector('#app').append(p);
