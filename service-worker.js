if(!self.define){let e,r={};const s=(s,n)=>(s=new URL(s+".js",n).href,r[s]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=r,document.head.appendChild(e)}else e=s,importScripts(s),r()})).then((()=>{let e=r[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,t)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(r[l])return;let i={};const a=e=>s(e,l),u={module:{uri:l},exports:i,require:a};r[l]=Promise.all(n.map((e=>u[e]||a(e)))).then((e=>(t(...e),i)))}}define(["./workbox-ad8011fb"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"sheet-maker//sheet-maker/2b9f9a8912419b0f4b69.png",revision:null},{url:"sheet-maker//sheet-maker/33cbb501e4e522021025.png",revision:null},{url:"sheet-maker//sheet-maker/3747d62d05f8f09fb741.png",revision:null},{url:"sheet-maker//sheet-maker/4a319709cc0699c694dc.png",revision:null},{url:"sheet-maker//sheet-maker/5bd76dab3a9d835f39f2.png",revision:null},{url:"sheet-maker//sheet-maker/5c3d1b2ce7bb3793be6e.png",revision:null},{url:"sheet-maker//sheet-maker/60e08010af0453fec957.png",revision:null},{url:"sheet-maker//sheet-maker/8a70e34efeda3124235b.png",revision:null},{url:"sheet-maker//sheet-maker/92bd8516e50642f8233a.png",revision:null},{url:"sheet-maker//sheet-maker/b037ca7f505f5c048bae.png",revision:null},{url:"sheet-maker//sheet-maker/c945e6443b532c587958.png",revision:null},{url:"sheet-maker//sheet-maker/dd674023209c7164b31e.png",revision:null},{url:"sheet-maker//sheet-maker/ec6a054a75f35ddbe8db.png",revision:null},{url:"sheet-maker//sheet-maker/entry.832189a32b04dbb996b8.bundle.js",revision:null},{url:"sheet-maker//sheet-maker/entry.832189a32b04dbb996b8.bundle.js.LICENSE.txt",revision:"783f14fa45b10e088e68f98251448010"},{url:"sheet-maker//sheet-maker/favicon.ico",revision:"a9ad774622378b274413cfdd9f832e01"},{url:"sheet-maker//sheet-maker/fe3a2cf273f4367e50c9.png",revision:null},{url:"sheet-maker//sheet-maker/index.html",revision:"695a9f28cb5cd10d11e751fefd08c5cd"}],{})}));
