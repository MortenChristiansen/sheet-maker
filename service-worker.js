if(!self.define){let e,r={};const n=(n,l)=>(n=new URL(n+".js",l).href,r[n]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=r,document.head.appendChild(e)}else e=n,importScripts(n),r()})).then((()=>{let e=r[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(l,i)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(r[s])return;let t={};const u=e=>n(e,s),o={module:{uri:s},exports:t,require:u};r[s]=Promise.all(l.map((e=>o[e]||u(e)))).then((e=>(i(...e),t)))}}define(["./workbox-ad8011fb"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/sheet-maker/2b9f9a8912419b0f4b69.png",revision:null},{url:"/sheet-maker/33cbb501e4e522021025.png",revision:null},{url:"/sheet-maker/3747d62d05f8f09fb741.png",revision:null},{url:"/sheet-maker/4a319709cc0699c694dc.png",revision:null},{url:"/sheet-maker/5bd76dab3a9d835f39f2.png",revision:null},{url:"/sheet-maker/5c3d1b2ce7bb3793be6e.png",revision:null},{url:"/sheet-maker/60e08010af0453fec957.png",revision:null},{url:"/sheet-maker/8a70e34efeda3124235b.png",revision:null},{url:"/sheet-maker/92bd8516e50642f8233a.png",revision:null},{url:"/sheet-maker/b037ca7f505f5c048bae.png",revision:null},{url:"/sheet-maker/c945e6443b532c587958.png",revision:null},{url:"/sheet-maker/dd674023209c7164b31e.png",revision:null},{url:"/sheet-maker/ec6a054a75f35ddbe8db.png",revision:null},{url:"/sheet-maker/entry.181dfc41f1c0a7b921bb.bundle.js",revision:null},{url:"/sheet-maker/entry.181dfc41f1c0a7b921bb.bundle.js.LICENSE.txt",revision:"783f14fa45b10e088e68f98251448010"},{url:"/sheet-maker/favicon.ico",revision:"a9ad774622378b274413cfdd9f832e01"},{url:"/sheet-maker/fe3a2cf273f4367e50c9.png",revision:null},{url:"/sheet-maker/index.html",revision:"357a19b0c5dfb208354218cfb3726a11"}],{})}));
