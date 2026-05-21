import{E as r}from"./chartEditStore-65929419.js";import{cp as m}from"./index-01c6845e.js";const c={},u={echarts:m},f=n=>{if(!n.events)return{};const e={};for(const t in n.events.baseEvent){const o=n.events.baseEvent[t];o&&(e[t]=a(o))}const s=n.events.advancedEvents||{},E={[r.VNODE_BEFORE_MOUNT](t){c[n.id]=t.component;const o=(s[r.VNODE_BEFORE_MOUNT]||"").trim();i(o,t)},[r.VNODE_MOUNTED](t){const o=(s[r.VNODE_MOUNTED]||"").trim();i(o,t)}};return{...e,...E}};function a(n){try{return new Function(`
      return (
        async function(components,mouseEvent){
          ${n}
        }
      )`)().bind(void 0,c)}catch(e){console.error(e)}}function i(n,e){try{Function(`
      "use strict";
      return (
        async function(e, components, node_modules){
          const {${Object.keys(u).join()}} = node_modules;
          ${n}
        }
      )`)().bind(e?.component)(e,c,u)}catch(s){console.error(s)}}export{u as n,f as u};
