import 'reflect-metadata';
import './style.css';

import Stats from 'stats.js';

import App from './ui/App.svelte';
import { game } from './game';
import { mount } from 'svelte';

const stats = new Stats();
document.body.appendChild(stats.dom);

game.events.on(Phaser.Core.Events.PRE_STEP, () => {
  stats.begin();
});

game.events.on(Phaser.Core.Events.POST_RENDER, () => {
  stats.end();
});

mount(App, {
  target: document.getElementById('ui')!,
});
