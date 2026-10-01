const S=[...document.querySelectorAll('.s')],st=document.getElementById('st');let i=0;
function go(k){i=Math.max(0,Math.min(S.length-1,k));S.forEach((s,j)=>s.classList.toggle('on',j==i));document.body.classList.toggle('last-slide',i===S.length-1);document.getElementById('n').textContent=(i+1)+' / '+S.length}
function fit(){const sc=Math.min(innerWidth/1280,(innerHeight-52)/720);st.style.transform='scale('+sc+')';st.style.margin=((720*sc-720)/2)+'px '+((1280*sc-1280)/2)+'px'}
pv.onclick=()=>go(i-1);nx.onclick=()=>go(i+1);
addEventListener('keydown',e=>{if(['ArrowRight',' ','PageDown'].includes(e.key))go(i+1);if(['ArrowLeft','PageUp'].includes(e.key))go(i-1)});
addEventListener('resize',fit);fit();go(0);
