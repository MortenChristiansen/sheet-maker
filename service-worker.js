if(!self.define){let e,r={};const n=(n,l)=>(n=new URL(n+".js",l).href,r[n]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=r,document.head.appendChild(e)}else e=n,importScripts(n),r()})).then((()=>{let e=r[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(l,i)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(r[s])return;let u={};const a=e=>n(e,s),t={module:{uri:s},exports:u,require:a};r[s]=Promise.all(l.map((e=>t[e]||a(e)))).then((e=>(i(...e),u)))}}define(["./workbox-ad8011fb"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/sheet-maker/08d49720c6fb4a0489a6.png",revision:null},{url:"/sheet-maker/15fc2188c91a64ee7eec.png",revision:null},{url:"/sheet-maker/23490230891f2ec2ff67.png",revision:null},{url:"/sheet-maker/2b9f9a8912419b0f4b69.png",revision:null},{url:"/sheet-maker/33cbb501e4e522021025.png",revision:null},{url:"/sheet-maker/3747d62d05f8f09fb741.png",revision:null},{url:"/sheet-maker/3c63a168bc70cd2daa99.png",revision:null},{url:"/sheet-maker/3e5030eb950dc72517ee.png",revision:null},{url:"/sheet-maker/5bd76dab3a9d835f39f2.png",revision:null},{url:"/sheet-maker/5c3d1b2ce7bb3793be6e.png",revision:null},{url:"/sheet-maker/60e08010af0453fec957.png",revision:null},{url:"/sheet-maker/60e9cbcdcaf1332fd7e6.png",revision:null},{url:"/sheet-maker/655dfafec0c29f96b457.png",revision:null},{url:"/sheet-maker/6b7b936e3906da3a44fa.png",revision:null},{url:"/sheet-maker/700215e7aecd99dc76fa.png",revision:null},{url:"/sheet-maker/8a70e34efeda3124235b.png",revision:null},{url:"/sheet-maker/92bd8516e50642f8233a.png",revision:null},{url:"/sheet-maker/9a4458cec57a5f2e20be.png",revision:null},{url:"/sheet-maker/b005e768cef6d6b3f86a.png",revision:null},{url:"/sheet-maker/b037ca7f505f5c048bae.png",revision:null},{url:"/sheet-maker/b10651e4e1c12543ab81.png",revision:null},{url:"/sheet-maker/bfee95e80e68772d2294.png",revision:null},{url:"/sheet-maker/c803e3dc1beea0f5f1bd.png",revision:null},{url:"/sheet-maker/c945e6443b532c587958.png",revision:null},{url:"/sheet-maker/cc53e7b9ee2a3fde6dfa.png",revision:null},{url:"/sheet-maker/dd674023209c7164b31e.png",revision:null},{url:"/sheet-maker/ec23475cb092652acfea.png",revision:null},{url:"/sheet-maker/entry.e358e2a35ed71bdcbda9.bundle.js",revision:null},{url:"/sheet-maker/entry.e358e2a35ed71bdcbda9.bundle.js.LICENSE.txt",revision:"783f14fa45b10e088e68f98251448010"},{url:"/sheet-maker/favicon.ico",revision:"a9ad774622378b274413cfdd9f832e01"},{url:"/sheet-maker/fe3a2cf273f4367e50c9.png",revision:null},{url:"/sheet-maker/index.html",revision:"d7fde043e1a311c6a3f71f96fdeb6931"}],{})}));
