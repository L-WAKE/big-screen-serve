import{d as X,cO as oe,Z as ae,r as a,o as d,A as $,w as e,e as t,cu as ee,u as i,f as s,c as f,q as r,a3 as W,F as x,s as O,t as g,N as re,O as ie,aN as de,j as te,l as F,I as se}from"./index-01c6845e.js";import{a2 as J,a3 as ue}from"./index-afae734a.js";import{g as pe}from"./plugin-5bbeb6b7.js";import{i as ne}from"./icon-3d870780.js";import{h as ce,c as _e,E as R,B as I}from"./chartEditStore-65929419.js";import{n as me}from"./noData-9e194391.js";import{u as Z}from"./useTargetData.hook-28fd37bf.js";import{M as le}from"./EditorWorker-a1c13cb8.js";import"./editorWorker-259d4dbf.js";import{n as fe}from"./useLifeHandler.hook-2f3cbee2.js";import"./http-9bcf808b.js";const ve={key:0,class:"no-data go-flex-center"},ge=["src"],ye=X({__name:"index",setup(Q){const{CloseIcon:w,AddIcon:K,HelpOutlineIcon:j}=ne.ionicons5,{targetData:C,chartEditStore:D}=Z(),V=[oe.PARAMS,oe.HEADER],S=ae(()=>{const m=C.value.interactActions;return m?m.map(n=>({label:n.interactName,value:n.interactType})):[]}),N=ae(()=>C.value.option),k=(m,n)=>{if(!m)return{};const o=D.requestGlobalConfig.requestDataPond.find(E=>E.dataPondId===m)?.dataPondRequestConfig.requestParams;return o?o[n]:D.componentList[D.fetchTargetIndex(m)]?.request.requestParams[n]},T=m=>!m||!C.value.interactActions?[]:C.value.interactActions.find(o=>o.interactType===m)?.componentEmitEvents[N.value[ce]]||[],G=()=>{const m=p=>p.reduce((_,u)=>(!u.groupList&&u.request.requestDataType===de.AJAX&&u.request.requestUrl&&_.push(u),u.groupList&&u.groupList.length>0?[..._,...m(u.groupList)]:_),[]),o=m(D.componentList).filter(p=>{const _=p.id!==C.value.id,u=p.chartConfig.chartFrame!==_e.STATIC,v=!p.isGroup;return _&&u&&v}).map(p=>({id:p.id,title:p.chartConfig.title,disabled:!1,type:"componentList"})),b=D.requestGlobalConfig.requestDataPond.map(p=>({id:p.dataPondId,title:p.dataPondName,disabled:!1,type:"requestDataPond"})).concat(o);return C.value.events.interactEvents?.forEach(p=>{b.forEach(_=>{_.id===p.interactComponentId&&(_.disabled=!0)})}),b},q=()=>{C.value.events.interactEvents.push({interactOn:void 0,interactComponentId:void 0,interactFn:{}})},H=m=>{pe({message:"是否删除此关联交互模块?",onPositiveCallback:()=>{C.value.events.interactEvents.splice(m,1)}})};return(m,n)=>{const o=a("n-icon"),E=a("n-button"),b=a("n-text"),p=a("n-space"),_=a("n-divider"),u=a("n-tag"),v=a("n-select"),L=a("n-input-group"),M=a("n-tooltip"),z=a("n-table"),B=a("n-card"),P=a("n-collapse-item");return S.value.length?(d(),$(P,{key:0,title:"组件交互",name:"1"},{"header-extra":e(()=>[t(E,{type:"primary",tertiary:"",size:"small",onClick:ee(q,["stop"])},{icon:e(()=>[t(o,null,{default:e(()=>[t(i(K))]),_:1})]),default:e(()=>[n[0]||(n[0]=s(" 新增 "))]),_:1,__:[0]})]),default:e(()=>[i(C).events.interactEvents.length?W("",!0):(d(),f("div",ve,[r("img",{src:i(me),alt:"暂无数据"},null,8,ge),t(b,{depth:3},{default:e(()=>n[1]||(n[1]=[s("暂无内容")])),_:1,__:[1]})])),(d(!0),f(x,null,O(i(C).events.interactEvents,(h,A)=>(d(),$(B,{key:A,class:"n-card-shallow",size:"small"},{default:e(()=>[t(p,{justify:"space-between"},{default:e(()=>[t(b,null,{default:e(()=>[s("关联组件 - "+g(A+1),1)]),_:2},1024),t(E,{type:"error",text:"",size:"small",onClick:y=>H(A)},{icon:e(()=>[t(o,null,{default:e(()=>[t(i(w))]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),t(_,{style:{margin:"10px 0"}}),t(u,{bordered:!1,type:"primary"},{default:e(()=>n[2]||(n[2]=[s(" 选择目标组件 ")])),_:1,__:[2]}),t(i(J),{name:"触发事件",alone:!0},{default:e(()=>[S.value?(d(),$(L,{key:0},{default:e(()=>[t(v,{class:"select-type-options",value:h.interactOn,"onUpdate:value":y=>h.interactOn=y,size:"tiny",options:S.value},null,8,["value","onUpdate:value","options"])]),_:2},1024)):W("",!0)]),_:2},1024),t(i(J),{alone:!0},{name:e(()=>[t(b,null,{default:e(()=>n[3]||(n[3]=[s("绑定")])),_:1,__:[3]}),t(M,{trigger:"hover"},{trigger:e(()=>[t(o,{size:"21",depth:3},{default:e(()=>[t(i(j))]),_:1})]),default:e(()=>[t(b,null,{default:e(()=>n[4]||(n[4]=[s("不支持「静态组件」支持「组件」「公共APi」")])),_:1,__:[4]})]),_:1})]),default:e(()=>[t(v,{class:"select-type-options","value-field":"id","label-field":"title",size:"tiny",filterable:"",placeholder:"仅展示符合条件的组件",value:h.interactComponentId,"onUpdate:value":y=>h.interactComponentId=y,options:G()},null,8,["value","onUpdate:value","options"])]),_:2},1024),T(h.interactOn).length?(d(),$(i(J),{key:0,name:"查询结果",alone:!0},{default:e(()=>[t(z,{size:"small",striped:""},{default:e(()=>[r("thead",null,[r("tr",null,[(d(),f(x,null,O(["参数","说明"],y=>r("th",{key:y},g(y),1)),64))])]),r("tbody",null,[(d(!0),f(x,null,O(T(h.interactOn),(y,c)=>(d(),f("tr",{key:c},[r("td",null,g(y.value),1),r("td",null,g(y.label),1)]))),128))])]),_:2},1024)]),_:2},1024)):W("",!0),t(u,{bordered:!1,type:"primary"},{default:e(()=>n[5]||(n[5]=[s(" 关联目标请求参数 ")])),_:1,__:[5]}),(d(),f(x,null,O(V,y=>t(i(J),{name:y,key:y},{default:e(()=>[(d(!0),f(x,null,O(k(h.interactComponentId,y),(c,l,U)=>(d(),$(i(ue),{key:U,name:`${l}`},{default:e(()=>[t(v,{size:"tiny",value:h.interactFn[l],"onUpdate:value":Y=>h.interactFn[l]=Y,options:T(h.interactOn),clearable:""},null,8,["value","onUpdate:value","options"])]),_:2},1032,["name"]))),128)),re(t(b,{class:"go-pt-1",depth:"3"},{default:e(()=>n[6]||(n[6]=[s(" 暂无数据 ")])),_:2,__:[6]},1536),[[ie,JSON.stringify(k(h.interactComponentId,y))==="{}"]])]),_:2},1032,["name"])),64))]),_:2},1024))),128))]),_:1})):W("",!0)}}});const be=te(ye,[["__scopeId","data-v-35304eef"]]),xe=`
console.log(e)
`,Ee=`
console.log(echarts)
`,he=`
console.log(components)
`,we=`
console.log(node_modules)
`,Ce=`
// 在渲染之后才能获取 dom 实例
e.el.addEventListener('click', () => {
  alert('我触发拉~');
}, false)
`,Oe=`
await import('https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/lodash.js/4.17.21/lodash.js')

// lodash 默认赋值给 "_"
console.log('isEqual', _.isEqual(['1'], ['1']))
`,ke=`
// 获取echart实例
const chart = this.refs.vChartRef.chart

// 图表设置tooltip
chart.setOption({
  tooltip: {
    trigger: 'axis', //item
    enterable: true, 
    formatter (params) {
      return\`
        <div>
          <img src="https://portrait.gitee.com/uploads/avatars/user/1654/4964818_MTrun_1653229420.png!avatar30">
          <b><a href="https://gitee.com/dromara/go-view">《这是一个自定义的tooltip》</a></b>
        <div>
        <div style='border-radius:35px;color:#666'>
        \${Object.entries(params[0].value).map(kv => \`<div>\${kv[0]}:\${kv[1]}</div>\`).join('')}
        </div>
      \`;
    },
  }
})
`,Te=`
// 组件样式作用域标识
const scoped = this.subTree.scopeId
function loadStyleString(css){
	let style = document.createElement('style')
	style.type = 'text/css'
	style.appendChild(document.createTextNode(css))
	let head = document.getElementsByTagName('head')[0]
	head.appendChild(style)
}
loadStyleString(\`
.dv-scroll-board[\${scoped}] {
  position: relative;
  overflow: hidden;
}
.dv-scroll-board[\${scoped}]::before {
  content: '';
  display: block;
  position: absolute;
  top: -20%;
  left: -100%;
  width: 550px;
  height: 60px;
  transform: rotate(-45deg);
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0));
  animation: cross 2s infinite;
}
@keyframes cross{
  to{
    top: 80%;
    left: 100%;
    transform: rotate(-45deg);
  }
}
\`)
`,De=`
const chart = this.refs.vChartRef.chart
// 定义地图原点大小 同理可自定义标签等等内容
this.props.chartConfig.option.series[0].symbolSize = (val) => {
  return Math.sqrt(val[2]) / 3;
}
this.setupState.vEchartsSetOption();
let i = 0; // 当前轮播索引
const len = 3; // 轮播部分提示
(function showTips() {
  const action = (type, dataIndex) => {
    chart.dispatchAction({
      type,
      dataIndex,
      seriesIndex: 0,
    });
  }
  setInterval(() => {
    action("downplay", i);
    action("hideTip", i);
    if (i === len) i = 0;
    i++;
    action("highlight", i);
    action("showTip", i);
  }, 2000);
})()
`,Se=[{description:"获取当前组件实例",code:xe},{description:"获取全局 echarts 实例",code:Ee},{description:"获取组件图表集合",code:he},{description:"获取 nodeModules 实例",code:we},{description:"获取远程 CDN 库",code:Oe},{description:"设置文字组件点击事件",code:Ce},{description:"修改图表 tooltip",code:ke},{description:"添加【轮播列表】样式",code:Te},{description:"修改【地图】圆点，新增提示自动轮播",code:De}],Ie={class:"func-annotate"},Ne={class:"func-keyword"},$e={class:"go-ml-4"},Le={class:"go-pl-3"},Me={class:"func-keyNameWord"},Ae={class:"go-flex-items-center"},Ue=X({__name:"index",setup(Q){const{targetData:w,chartEditStore:K}=Z(),{DocumentTextIcon:j,ChevronDownIcon:C,PencilIcon:D}=ne.ionicons5,V={[R.VNODE_BEFORE_MOUNT]:"渲染之前",[R.VNODE_MOUNTED]:"渲染之后"},S={[R.VNODE_BEFORE_MOUNT]:"此时组件 DOM 还未存在",[R.VNODE_MOUNTED]:"此时组件 DOM 已经存在"},N=F(!1),k=F(R.VNODE_MOUNTED);let T=F({...w.value.events.advancedEvents});const G=F(!1),q=()=>{let n="",o="",E="";return G.value=Object.entries(T.value).every(([b,p])=>{try{const _=Object.getPrototypeOf(async function(){}).constructor;return new _(p),!0}catch(_){return o=_.message,E=_.name,n=b,!1}}),{errorFn:n,message:o,name:E}},H=()=>{N.value=!1},m=()=>{if(q().errorFn){window.$message.error("事件函数错误，无法进行保存");return}Object.values(T.value).join("").trim()===""?w.value.events.advancedEvents={vnodeBeforeMount:void 0,vnodeMounted:void 0}:w.value.events.advancedEvents={...T.value},H()};return se(()=>N.value,n=>{n&&(T.value={...w.value.events.advancedEvents})}),(n,o)=>{const E=a("n-icon"),b=a("n-button"),p=a("n-code"),_=a("n-card"),u=a("n-collapse-item"),v=a("n-text"),L=a("n-space"),M=a("n-tab-pane"),z=a("n-tabs"),B=a("n-layout"),P=a("n-collapse"),h=a("n-scrollbar"),A=a("n-tag"),y=a("n-layout-sider"),c=a("n-modal");return d(),f(x,null,[t(u,{title:"高级事件配置",name:"3"},{"header-extra":e(()=>[t(b,{type:"primary",tertiary:"",size:"small",onClick:o[0]||(o[0]=ee(l=>N.value=!0,["stop"]))},{icon:e(()=>[t(E,null,{default:e(()=>[t(i(D))]),_:1})]),default:e(()=>[o[3]||(o[3]=s(" 编辑 "))]),_:1,__:[3]})]),default:e(()=>[t(_,{class:"collapse-show-box"},{default:e(()=>[(d(!0),f(x,null,O(i(R),l=>(d(),f("div",{key:l},[r("p",null,[r("span",Ie,"// "+g(V[l]),1),o[4]||(o[4]=r("br",null,null,-1)),r("span",Ne,"async "+g(l),1),o[5]||(o[5]=s(" (e, components, echarts, node_modules) { "))]),r("p",$e,[t(p,{code:(i(w).events.advancedEvents||{})[l]||"",language:"typescript"},null,8,["code"])]),o[6]||(o[6]=r("p",null,[s("}"),r("span",null,",")],-1))]))),128))]),_:1})]),_:1}),t(c,{class:"go-chart-data-monaco-editor",show:N.value,"onUpdate:show":o[2]||(o[2]=l=>N.value=l),"mask-closable":!1},{default:e(()=>[t(_,{bordered:!1,role:"dialog",size:"small","aria-modal":"true",style:{width:"1200px",height:"700px"}},{header:e(()=>[t(L,null,{default:e(()=>[t(v,null,{default:e(()=>o[7]||(o[7]=[s("高级事件编辑器（配合源码使用）")])),_:1,__:[7]})]),_:1})]),"header-extra":e(()=>o[8]||(o[8]=[])),action:e(()=>[t(L,{justify:"space-between"},{default:e(()=>[r("div",Ae,[t(A,{bordered:!1,type:"primary"},{icon:e(()=>[t(E,{component:i(j)},null,8,["component"])]),default:e(()=>[o[17]||(o[17]=s(" 说明 "))]),_:1,__:[17]}),t(v,{class:"go-ml-2",depth:"2"},{default:e(()=>o[18]||(o[18]=[s("通过提供的参数可为图表增加定制化的tooltip、交互事件等等")])),_:1,__:[18]})]),t(L,null,{default:e(()=>[t(b,{size:"medium",onClick:H},{default:e(()=>o[19]||(o[19]=[s("取消")])),_:1,__:[19]}),t(b,{size:"medium",type:"primary",onClick:m},{default:e(()=>o[20]||(o[20]=[s("保存")])),_:1,__:[20]})]),_:1})]),_:1})]),default:e(()=>[t(B,{"has-sider":"","sider-placement":"right"},{default:e(()=>[t(B,{style:{height:"580px","padding-right":"20px"}},{default:e(()=>[t(z,{value:k.value,"onUpdate:value":o[1]||(o[1]=l=>k.value=l),type:"card","tab-style":"min-width: 100px;"},{suffix:e(()=>[t(v,{class:"tab-tip",type:"warning"},{default:e(()=>[s("提示: "+g(S[k.value]),1)]),_:1})]),default:e(()=>[(d(!0),f(x,null,O(i(R),(l,U)=>(d(),$(M,{key:U,tab:`${V[l]}-${l}`,name:l},{default:e(()=>[r("p",Le,[o[9]||(o[9]=r("span",{class:"func-keyword"},"async function   ",-1)),r("span",Me,g(l)+"(e, components, echarts, node_modules)  {",1)]),t(i(le),{modelValue:i(T)[l],"onUpdate:modelValue":Y=>i(T)[l]=Y,height:"480px",language:"javascript"},null,8,["modelValue","onUpdate:modelValue"]),o[10]||(o[10]=r("p",{class:"go-pl-3 func-keyNameWord"},"}",-1))]),_:2,__:[10]},1032,["tab","name"]))),128))]),_:1},8,["value"])]),_:1}),t(y,{"collapsed-width":14,width:340,"show-trigger":"bar","collapse-mode":"transform","content-style":"padding: 12px 12px 0px 12px;margin-left: 3px;"},{default:e(()=>[t(z,{"default-value":"1","justify-content":"space-evenly",type:"segment"},{default:e(()=>[t(M,{tab:"验证结果",name:"1",size:"small"},{default:e(()=>[t(h,{trigger:"none",style:{"max-height":"505px"}},{default:e(()=>[t(P,{class:"go-px-3","arrow-placement":"right","default-expanded-names":[1,2,3]},{default:e(()=>[(d(!0),f(x,null,O([q()],l=>(d(),f(x,{key:l},[t(u,{title:"错误函数",name:1},{default:e(()=>[t(v,{depth:"3"},{default:e(()=>[s(g(l.errorFn||"暂无"),1)]),_:2},1024)]),_:2},1024),t(u,{title:"错误信息",name:2},{default:e(()=>[t(v,{depth:"3"},{default:e(()=>[s(g(l.name||"暂无"),1)]),_:2},1024)]),_:2},1024),t(u,{title:"堆栈信息",name:3},{default:e(()=>[t(v,{depth:"3"},{default:e(()=>[s(g(l.message||"暂无"),1)]),_:2},1024)]),_:2},1024)],64))),128))]),_:1})]),_:1})]),_:1}),t(M,{tab:"变量说明",name:"2"},{default:e(()=>[t(h,{trigger:"none",style:{"max-height":"505px"}},{default:e(()=>[t(P,{class:"go-px-3","arrow-placement":"right","default-expanded-names":[1,2,3,4]},{default:e(()=>[t(u,{title:"e",name:1},{default:e(()=>[t(v,{depth:"3"},{default:e(()=>o[11]||(o[11]=[s("触发对应生命周期事件时接收的参数")])),_:1,__:[11]})]),_:1}),t(u,{title:"this",name:2},{default:e(()=>[t(v,{depth:"3"},{default:e(()=>o[12]||(o[12]=[s("图表组件实例")])),_:1,__:[12]}),o[13]||(o[13]=r("br",null,null,-1)),(d(),f(x,null,O(["refs","setupState","ctx","props","..."],l=>t(A,{class:"go-m-1",key:l},{default:e(()=>[s(g(l),1)]),_:2},1024)),64))]),_:1,__:[13]}),t(u,{title:"components",name:3},{default:e(()=>[t(v,{depth:"3"},{default:e(()=>o[14]||(o[14]=[s("当前大屏内所有组件的集合id 图表组件中的配置id，可以获取其他图表组件进行控制")])),_:1,__:[14]}),t(p,{code:`{
  [id]: component
}`,language:"typescript"})]),_:1}),t(u,{title:"node_modules",name:4},{default:e(()=>[t(v,{depth:"3"},{default:e(()=>o[15]||(o[15]=[s("以下是内置在代码环境中可用的包变量")])),_:1,__:[15]}),o[16]||(o[16]=r("br",null,null,-1)),(d(!0),f(x,null,O(Object.keys(i(fe)||{}),l=>(d(),$(A,{class:"go-m-1",key:l},{default:e(()=>[s(g(l),1)]),_:2},1024))),128))]),_:1,__:[16]})]),_:1})]),_:1})]),_:1}),t(M,{tab:"介绍案例",name:"3"},{default:e(()=>[t(h,{trigger:"none",style:{"max-height":"505px"}},{default:e(()=>[t(P,{"arrow-placement":"right"},{default:e(()=>[(d(!0),f(x,null,O(i(Se),(l,U)=>(d(),$(u,{key:U,title:`案例${U+1}：${l.description}`,name:U},{default:e(()=>[t(p,{code:l.code,language:"typescript"},null,8,["code"])]),_:2},1032,["title","name"]))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["show"])],64)}}});const Fe=te(Ue,[["__scopeId","data-v-53d5d409"]]),je={class:"func-annotate"},Pe={class:"func-keyword"},Ve={class:"go-ml-4"},qe={class:"go-pl-3"},ze={class:"func-keyNameWord"},Be={class:"go-flex-items-center"},Re=X({__name:"index",setup(Q){const{targetData:w,chartEditStore:K}=Z(),{DocumentTextIcon:j,ChevronDownIcon:C,PencilIcon:D}=ne.ionicons5,V={[I.ON_CLICK]:"单击",[I.ON_DBL_CLICK]:"双击",[I.ON_MOUSE_ENTER]:"鼠标进入",[I.ON_MOUSE_LEAVE]:"鼠标移出"},S=F(!1),N=F(I.ON_CLICK);let k=F({...w.value.events.baseEvent});const T=F(!1),G=()=>{let m="",n="",o="";return T.value=Object.entries(k.value).every(([E,b])=>{try{const p=Object.getPrototypeOf(async function(){}).constructor;return new p(b),!0}catch(p){return n=p.message,o=p.name,m=E,!1}}),{errorFn:m,message:n,name:o}},q=()=>{S.value=!1},H=()=>{if(G().errorFn){window.$message.error("事件函数错误，无法进行保存");return}Object.values(k.value).join("").trim()===""?w.value.events.baseEvent={[I.ON_CLICK]:void 0,[I.ON_DBL_CLICK]:void 0,[I.ON_MOUSE_ENTER]:void 0,[I.ON_MOUSE_LEAVE]:void 0}:w.value.events.baseEvent={...k.value},q()};return se(()=>S.value,m=>{m&&(k.value={...w.value.events.baseEvent})}),(m,n)=>{const o=a("n-icon"),E=a("n-button"),b=a("n-code"),p=a("n-card"),_=a("n-collapse-item"),u=a("n-text"),v=a("n-space"),L=a("n-tab-pane"),M=a("n-tabs"),z=a("n-layout"),B=a("n-collapse"),P=a("n-scrollbar"),h=a("n-layout-sider"),A=a("n-tag"),y=a("n-modal");return d(),f(x,null,[t(_,{title:"基础事件配置",name:"2"},{"header-extra":e(()=>[t(E,{type:"primary",tertiary:"",size:"small",onClick:n[0]||(n[0]=ee(c=>S.value=!0,["stop"]))},{icon:e(()=>[t(o,null,{default:e(()=>[t(i(D))]),_:1})]),default:e(()=>[n[3]||(n[3]=s(" 编辑 "))]),_:1,__:[3]})]),default:e(()=>[t(p,{class:"collapse-show-box"},{default:e(()=>[(d(!0),f(x,null,O(i(I),c=>(d(),f("div",{key:c},[r("p",null,[r("span",je,"// "+g(V[c]),1),n[4]||(n[4]=r("br",null,null,-1)),r("span",Pe,"async "+g(c),1),n[5]||(n[5]=s(" (mouseEvent,components) { "))]),r("p",Ve,[t(b,{code:(i(w).events.baseEvent||{})[c]||"",language:"typescript"},null,8,["code"])]),n[6]||(n[6]=r("p",null,[s("}"),r("span",null,",")],-1))]))),128))]),_:1})]),_:1}),t(y,{class:"go-chart-data-monaco-editor",show:S.value,"onUpdate:show":n[2]||(n[2]=c=>S.value=c),"mask-closable":!1},{default:e(()=>[t(p,{bordered:!1,role:"dialog",size:"small","aria-modal":"true",style:{width:"1200px",height:"700px"}},{header:e(()=>[t(v,null,{default:e(()=>[t(u,null,{default:e(()=>n[7]||(n[7]=[s("基础事件编辑器")])),_:1,__:[7]})]),_:1})]),"header-extra":e(()=>n[8]||(n[8]=[])),action:e(()=>[t(v,{justify:"space-between"},{default:e(()=>[r("div",Be,[t(A,{bordered:!1,type:"primary"},{icon:e(()=>[t(o,{component:i(j)},null,8,["component"])]),default:e(()=>[n[13]||(n[13]=s(" 说明 "))]),_:1,__:[13]}),t(u,{class:"go-ml-2",depth:"2"},{default:e(()=>n[14]||(n[14]=[s("编写方式同正常 JavaScript 写法")])),_:1,__:[14]})]),t(v,null,{default:e(()=>[t(E,{size:"medium",onClick:q},{default:e(()=>n[15]||(n[15]=[s("取消")])),_:1,__:[15]}),t(E,{size:"medium",type:"primary",onClick:H},{default:e(()=>n[16]||(n[16]=[s("保存")])),_:1,__:[16]})]),_:1})]),_:1})]),default:e(()=>[t(z,{"has-sider":"","sider-placement":"right"},{default:e(()=>[t(z,{style:{height:"580px","padding-right":"20px"}},{default:e(()=>[t(M,{value:N.value,"onUpdate:value":n[1]||(n[1]=c=>N.value=c),type:"card","tab-style":"min-width: 100px;"},{suffix:e(()=>[t(u,{class:"tab-tip",type:"warning"},{default:e(()=>n[9]||(n[9]=[s("提示: ECharts 组件会拦截鼠标事件")])),_:1,__:[9]})]),default:e(()=>[(d(!0),f(x,null,O(i(I),(c,l)=>(d(),$(L,{key:l,tab:`${V[c]}-${c}`,name:c},{default:e(()=>[r("p",qe,[n[10]||(n[10]=r("span",{class:"func-keyword"},"async function   ",-1)),r("span",ze,g(c)+"(mouseEvent,components)  {",1)]),t(i(le),{modelValue:i(k)[c],"onUpdate:modelValue":U=>i(k)[c]=U,height:"480px",language:"javascript"},null,8,["modelValue","onUpdate:modelValue"]),n[11]||(n[11]=r("p",{class:"go-pl-3 func-keyNameWord"},"}",-1))]),_:2,__:[11]},1032,["tab","name"]))),128))]),_:1},8,["value"])]),_:1}),t(h,{"collapsed-width":14,width:340,"show-trigger":"bar","collapse-mode":"transform","content-style":"padding: 12px 12px 0px 12px;margin-left: 3px;"},{default:e(()=>[t(M,{"default-value":"1","justify-content":"space-evenly",type:"segment"},{default:e(()=>[t(L,{tab:"验证结果",name:"1",size:"small"},{default:e(()=>[t(P,{trigger:"none",style:{"max-height":"505px"}},{default:e(()=>[t(B,{class:"go-px-3","arrow-placement":"right","default-expanded-names":[1,2,3]},{default:e(()=>[(d(!0),f(x,null,O([G()],c=>(d(),f(x,{key:c},[t(_,{title:"错误函数",name:1},{default:e(()=>[t(u,{depth:"3"},{default:e(()=>[s(g(c.errorFn||"暂无"),1)]),_:2},1024)]),_:2},1024),t(_,{title:"错误信息",name:2},{default:e(()=>[t(u,{depth:"3"},{default:e(()=>[s(g(c.name||"暂无"),1)]),_:2},1024)]),_:2},1024),t(_,{title:"堆栈信息",name:3},{default:e(()=>[t(u,{depth:"3"},{default:e(()=>[s(g(c.message||"暂无"),1)]),_:2},1024)]),_:2},1024)],64))),128))]),_:1})]),_:1})]),_:1}),t(L,{tab:"变量说明",name:"2"},{default:e(()=>[t(P,{trigger:"none",style:{"max-height":"505px"}},{default:e(()=>[t(B,{class:"go-px-3","arrow-placement":"right","default-expanded-names":[1,2]},{default:e(()=>[t(_,{title:"mouseEvent",name:1},{default:e(()=>[t(u,{depth:"3"},{default:e(()=>n[12]||(n[12]=[s("鼠标事件对象")])),_:1,__:[12]})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["show"])],64)}}});const Ge=te(Re,[["__scopeId","data-v-8e33f3b1"]]),ot=X({__name:"index",setup(Q){const{targetData:w}=Z();return F(!1),(K,j)=>{const C=a("n-text"),D=a("n-collapse");return d(),$(D,{class:"go-mt-3","arrow-placement":"right","default-expanded-names":["1","2"]},{default:e(()=>[t(C,{depth:"3"},{default:e(()=>[j[0]||(j[0]=s(" 组件 id： ")),t(C,null,{default:e(()=>[s(g(i(w).id),1)]),_:1})]),_:1,__:[0]}),t(i(be)),t(i(Ge)),t(i(Fe))]),_:1})}}});export{ot as default};
